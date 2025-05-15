from fastapi import APIRouter, HTTPException, Depends
from typing import List
from bson import ObjectId
from ..models.event_registration_model import EventRegistration,EventRegistrationUpdate
from ..services.event_registration_services import (
    create_registration,
    get_registration,
    get_registration_by_event_and_user,
    get_registrations_by_event,
    update_registration,
    delete_registration
)
from ..services.event_service import get_event_by_id
from ..models.event_model import Event
import logging

router = APIRouter(prefix="/event_registrations", tags=["event_registrations"])
logger = logging.getLogger(__name__)

async def validate_event(event_id: str) -> Event:
    """Validate that the event_id is a valid ObjectId and the event exists."""
    if not ObjectId.is_valid(event_id):
        logger.error(f"Invalid event ID: {event_id}")
        raise HTTPException(status_code=400, detail="Invalid event ID")
    event = await get_event_by_id(event_id)
    if not event:
        logger.error(f"Event not found for ID: {event_id}")
        raise HTTPException(status_code=404, detail="Event not found")
    return Event.parse_obj(event)

@router.post("/", response_model=EventRegistration)
async def create_event_registration(registration: EventRegistration):
    """Create a new event registration with validated answers."""
    logger.info(f"Received registration request: {registration.dict()}")
    
    # Validate event exists
    try:
        event = await validate_event(registration.event_id)
    except HTTPException as e:
        logger.error(f"Event validation failed: {str(e)}")
        raise e
    except Exception as e:
        logger.error(f"Unexpected error during event validation: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error validating event: {str(e)}")
    
    # Validate answers against event's customQuestions
    custom_questions = event.customQuestions or []
    logger.info(f"Event has {len(custom_questions)} custom questions")
    for answer in registration.answers or []:
        if answer.index >= len(custom_questions):
            logger.error(f"Invalid question index: {answer.index} (max index: {len(custom_questions)-1})")
            raise HTTPException(status_code=400, detail=f"Invalid question index: {answer.index}")
        question = custom_questions[answer.index]
        logger.debug(f"Validating answer for question {answer.index}: {question.question}")
        if question.type == "MCQ" and answer.answer not in question.options:
            logger.error(f"Invalid MCQ answer for question {answer.index}: {answer.answer} not in {question.options}")
            raise HTTPException(status_code=400, detail=f"Invalid answer for MCQ question {answer.index}: {answer.answer}")
        if question.type == "Yes/No" and answer.answer not in ["Yes", "No"]:
            logger.error(f"Invalid Yes/No answer for question {answer.index}: {answer.answer}")
            raise HTTPException(status_code=400, detail=f"Invalid answer for Yes/No question {answer.index}: {answer.answer}")
        if question.type == "Question/Answer" and question.answerType == "Integer":
            try:
                int(answer.answer)
            except ValueError:
                logger.error(f"Invalid integer answer for question {answer.index}: {answer.answer}")
                raise HTTPException(status_code=400, detail=f"Answer for question {answer.index} must be an integer")

    # Create registration
    try:
        registration_data = registration.dict()
        registration_id = await create_registration(registration_data)
        logger.info(f"Registration created with ID: {registration_id}")
        created_registration = await get_registration(registration_id)
        if not created_registration:
            logger.error(f"Created registration not found: {registration_id}")
            raise HTTPException(status_code=404, detail="Created registration not found")
        logger.info(f"Successfully created registration: {created_registration}")
        return EventRegistration.parse_obj(created_registration)
    except HTTPException as e:
        logger.error(f"HTTP error during registration creation: {str(e)}")
        raise e
    except Exception as e:
        logger.error(f"Unexpected error during registration creation: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error creating registration: {str(e)}")

@router.get("/{event_id}/{user_id}", response_model=EventRegistration)
async def get_event_registration(event_id: str, user_id: str):
    """Retrieve a specific registration by event_id and user_id."""
    await validate_event(event_id)
    registration = await get_registration_by_event_and_user(event_id, user_id)
    if not registration:
        raise HTTPException(status_code=404, detail="Registration not found")
    return EventRegistration.parse_obj(registration)

@router.get("/event/{event_id}", response_model=List[EventRegistration])
async def get_event_registrations(event_id: str):
    """Retrieve all registrations for a specific event."""
    await validate_event(event_id)
    registrations = await get_registrations_by_event(event_id)
    return [EventRegistration.parse_obj(reg) for reg in registrations]

@router.patch("/{event_id}/{user_id}", response_model=EventRegistration)
async def update_event_registration(event_id: str, user_id: str, update_data: EventRegistrationUpdate):
    """Update answers for an existing registration."""
    await validate_event(event_id)
    
    event = Event.parse_obj(await get_event_by_id(event_id))
    custom_questions = event.customQuestions or []

    if update_data.answers:
        for answer in update_data.answers:
            if answer.index >= len(custom_questions):
                raise HTTPException(status_code=400, detail=f"Invalid question index: {answer.index}")
            question = custom_questions[answer.index]
            if question.type == "MCQ" and answer.answer not in question.options:
                raise HTTPException(status_code=400, detail=f"Invalid answer for MCQ question {answer.index}: {answer.answer}")
            if question.type == "Yes/No" and answer.answer not in ["Yes", "No"]:
                raise HTTPException(status_code=400, detail=f"Invalid answer for Yes/No question {answer.index}: {answer.answer}")
            if question.type == "Question/Answer" and question.answerType == "Integer":
                try:
                    int(answer.answer)
                except ValueError:
                    raise HTTPException(status_code=400, detail=f"Answer for question {answer.index} must be an integer")

    update_dict = update_data.dict(exclude_unset=True)
    result = await update_registration(event_id, user_id, update_dict)
    if not result or result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Registration not found or no fields updated")

    updated_registration = await get_registration_by_event_and_user(event_id, user_id)
    if not updated_registration:
        raise HTTPException(status_code=404, detail="Updated registration not found")

    return EventRegistration.parse_obj(updated_registration)

@router.delete("/{event_id}/{user_id}")
async def delete_event_registration(event_id: str, user_id: str):
    """Delete a specific registration by event_id and user_id."""
    await validate_event(event_id)
    result = await delete_registration(event_id, user_id)
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Registration not found")
    return {"message": "Registration deleted"}