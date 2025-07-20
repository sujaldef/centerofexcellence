from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Depends
from app.services.event_service import create_event, get_event_by_id, get_event_by_name, delete_event, modify_event, get_all_events
from app.services.notification_services import post_notification
from app.models.event_model import Event, EventUpdate
from app.models.notification_model import Notification
from bson.objectid import ObjectId
from pydantic import BaseModel, Json
import json
import logging
from typing import List, Dict
from pathlib import Path
from fastapi import Form
from app.models.user_model import User
from app.services.user_service import get_user_by_id, update_user
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/events", tags=["events"])

class DeleteResponse(BaseModel):
    message: str

class ExtendDeadlineRequest(BaseModel):
    newDate: str  # Expected format: YYYY-MM-DD
    reason: str | None = None

@router.get("/", response_model=List[Event])
async def get_all_events_route():
    try:
        events = await get_all_events()
        return [Event.parse_obj(event) for event in events]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving events: {str(e)}")

@router.post("/", response_model=Event)
async def create_new_event(event: Event):
    try:
        event_data = event.dict(exclude_unset=True)
        created_event_id = await create_event(event_data)
        created_event_data = await get_event_by_id(created_event_id)
        if not created_event_data:
            raise HTTPException(status_code=404, detail="Created event not found")
        created_event_data["_id"] = created_event_id
        return Event.parse_obj(created_event_data)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating event: {str(e)}")

@router.get("/{event_id}", response_model=Event)
async def get_event(event_id: str):
    try:
        if not ObjectId.is_valid(event_id):
            raise HTTPException(status_code=400, detail="Invalid event ID")
        event = await get_event_by_id(event_id)
        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")
        event["_id"] = event_id
        return Event.parse_obj(event)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving event: {str(e)}")

@router.get("/name/{event_name}", response_model=Event)
async def get_event_by_eventname(event_name: str):
    try:
        event = await get_event_by_name(event_name)
        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")
        event_id = event["_id"]
        event["_id"] = event_id
        return Event.parse_obj(event)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving event: {str(e)}")

@router.delete("/{event_id}", response_model=DeleteResponse)
async def delete_event_route(event_id: str):
    try:
        if not ObjectId.is_valid(event_id):
            raise HTTPException(status_code=400, detail="Invalid event ID")
        event = await get_event_by_id(event_id)
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        result = await delete_event(event_id)
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Event not found")
        # Post cancellation notification
        notification_data = Notification(
            event_id=event_id,
            type="cancellation",
            message=f"The event {event['eventName']} has been canceled due to unforeseen circumstances.",
            poster_url=None,
            extended_days=0,
            extended_months=0,
            reason=None,
            created_at=datetime.utcnow()
        )
        await post_notification(notification_data.dict())
        return {"message": "Event deleted and cancellation notification posted"}
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Error deleting event: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error deleting event: {str(e)}")

@router.patch("/{event_id}", response_model=Event)
async def modify_event_route(event_id: str, update_data: EventUpdate):
    try:
        if not ObjectId.is_valid(event_id):
            raise HTTPException(status_code=400, detail="Invalid event ID")
        update_dict = update_data.dict(exclude_unset=True)
        result = await modify_event(event_id, update_dict)
        if not result or result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Event not found or no fields updated")
        updated_event = await get_event_by_id(event_id)
        if not updated_event:
            raise HTTPException(status_code=404, detail="Updated event not found")
        updated_event["_id"] = event_id
        return Event.parse_obj(updated_event)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating event: {str(e)}")

@router.post("/multipart/", response_model=Event)
async def create_event_multipart(
    eventName: str = Form(...),
    tagline: str = Form(None),
    category: str = Form(...),
    tags: str = Form(None),
    date: str = Form(...),
    month: str = Form(...),
    year: str = Form(...),
    location: str = Form(...),
    capacity: int = Form(None),
    eventMode: str = Form(...),
    bannerImage: UploadFile = File(None),
    thumbnailImage: UploadFile = File(None),
    description: str = Form(...),
    highlights: str = Form(None),
    faqs: str = Form(None),
    sponsors: str = Form(None),
    organizer: str = Form(...),
    eventContact: str = Form(...),
    whoAreWe: str = Form(None),
    status: str = Form(...),
    requireResume: bool = Form(False),
    allowedFileTypes: str = Form(None),
    requiredBasicInfo: bool = Form(False),
    requireWebLink: bool = Form(False),
    requiredWebLinks: str = Form(None),
    requireCoverLetter: bool = Form(False),
    requirePortfolio: bool = Form(False),
    customQuestions: str = Form(None),
    instructions: str = Form(None),
    sponsor_logo_0: UploadFile = File(None),
    sponsor_logo_1: UploadFile = File(None),
    sponsor_logo_2: UploadFile = File(None),
    sponsor_logo_3: UploadFile = File(None),
    sponsor_logo_4: UploadFile = File(None),
    highlight_image_0: UploadFile = File(None),
    highlight_image_1: UploadFile = File(None),
    highlight_image_2: UploadFile = File(None),
    highlight_image_3: UploadFile = File(None),
    highlight_image_4: UploadFile = File(None),
):
    try:
        tags_list = json.loads(tags) if tags else []
        highlights_list = json.loads(highlights) if highlights else []
        faqs_list = json.loads(faqs) if faqs else []
        sponsors_list = json.loads(sponsors) if sponsors else []
        event_contact = json.loads(eventContact) if eventContact else {}
        allowed_file_types = json.loads(allowedFileTypes) if allowedFileTypes else []
        required_basic_info = json.loads(requiredBasicInfo) if requiredBasicInfo else []
        required_web_links = json.loads(requiredWebLinks) if requiredWebLinks else []
        custom_questions = json.loads(customQuestions) if customQuestions else []
        upload_dir = Path("uploads")
        upload_dir.mkdir(exist_ok=True)
        banner_path = None
        if bannerImage:
            banner_path = upload_dir / bannerImage.filename
            with banner_path.open("wb") as f:
                f.write(await bannerImage.read())
            logger.debug(f"Saved bannerImage to {banner_path}")
        thumbnail_path = None
        if thumbnailImage:
            thumbnail_path = upload_dir / thumbnailImage.filename
            with thumbnail_path.open("wb") as f:
                f.write(await thumbnailImage.read())
            logger.debug(f"Saved thumbnailImage to {thumbnail_path}")
        sponsor_logos = [
            sponsor_logo_0,
            sponsor_logo_1,
            sponsor_logo_2,
            sponsor_logo_3,
            sponsor_logo_4,
        ]
        for i, logo in enumerate(sponsor_logos):
            if logo and i < len(sponsors_list):
                logo_path = upload_dir / logo.filename
                with logo_path.open("wb") as f:
                    f.write(await logo.read())
                sponsors_list[i]["logo"] = str(logo_path)
            elif i < len(sponsors_list):
                sponsors_list[i]["logo"] = None
        highlight_images = [
            highlight_image_0,
            highlight_image_1,
            highlight_image_2,
            highlight_image_3,
            highlight_image_4,
        ]
        for i, image in enumerate(highlight_images):
            if image and i < len(highlights_list):
                image_path = upload_dir / image.filename
                with image_path.open("wb") as f:
                    f.write(await image.read())
                highlights_list[i]["image"] = str(image_path)
            elif i < len(highlights_list):
                highlights_list[i]["image"] = None
        event_data = {
            "eventName": eventName,
            "tagline": tagline,
            "category": category,
            "tags": tags_list,
            "date": date,
            "month": month,
            "year": year,
            "location": location,
            "capacity": capacity,
            "eventMode": eventMode,
            "bannerImage": str(banner_path) if banner_path else "",
            "thumbnailImage": str(thumbnail_path) if thumbnail_path else "",
            "description": description,
            "highlights": highlights_list,
            "faqs": faqs_list,
            "sponsors": sponsors_list,
            "organizer": organizer,
            "eventContact": event_contact,
            "whoAreWe": whoAreWe,
            "status": status,
            "totalRegistrations": 0,
            "registeredUsers": [],
            "requireResume": requireResume,
            "allowedFileTypes": allowed_file_types,
            "requireBasicInfo": requireBasicInfo,
            "requiredBasicInfo": required_basic_info,
            "requireWebLink": requireWebLink,
            "requiredWebLinks": required_web_links,
            "requireCoverLetter": requireCoverLetter,
            "requirePortfolio": requirePortfolio,
            "customQuestions": custom_questions,
            "instructions": instructions,
        }
        created_event_id = await create_event(event_data)
        created_event_data = await get_event_by_id(created_event_id)
        if not created_event_data:
            raise HTTPException(status_code=404, detail="Created event not found")
        created_event_data["_id"] = created_event_id
        return Event.parse_obj(created_event_data)
    except json.JSONDecodeError as e:
        logger.error(f"JSON decode error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Invalid JSON in form data: {str(e)}")
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Error creating event: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error creating event: {str(e)}")

async def get_current_user(user_id: str):
    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/{event_id}/register", response_model=Dict)
async def register_for_event(
    event_id: str,
    user_id: str = Form(...),
    resume: UploadFile = File(None),
    data: str = Form(None),  # Expect JSON string for basic_info, web_links, etc.
    current_user: Dict = Depends(get_current_user)
):
    try:
        if not ObjectId.is_valid(event_id):
            raise HTTPException(status_code=400, detail="Invalid event ID")
        if not ObjectId.is_valid(user_id):
            raise HTTPException(status_code=400, detail="Invalid user ID")
        event = await get_event_by_id(event_id)
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        if event["status"] != "upcoming":
            raise HTTPException(status_code=400, detail="Registration is closed for this event")
        if str(user_id) in event["registeredUsers"]:
            raise HTTPException(status_code=400, detail="User already registered for this event")
        
        # Parse JSON data if provided
        registration_data = {}
        basic_info = web_links = custom_answers = None
        portfolio = ''
        if data:
            try:
                json_data = json.loads(data)
                basic_info = json_data.get('basic_info', {})
                web_links = json_data.get('web_links', {})
                portfolio = json_data.get('portfolio', '')
                custom_answers = json_data.get('custom_answers', {})
            except json.JSONDecodeError as e:
                logger.error(f"Invalid JSON in data field: {str(e)}")
                raise HTTPException(status_code=400, detail=f"Invalid JSON in data field: {str(e)}")

        # Validate required fields
        if event["requireResume"]:
            if not resume:
                raise HTTPException(status_code=400, detail="Resume is required")
            if resume.content_type not in [f"application/{ext.lower()}" for ext in event["allowedFileTypes"]]:
                raise HTTPException(status_code=400, detail=f"Invalid file type. Allowed: {', '.join(event['allowedFileTypes'])}")
            resume_path = Path("uploads") / f"{user_id}_{event_id}_{resume.filename}"
            with resume_path.open("wb") as f:
                f.write(await resume.read())
            registration_data["resume"] = str(resume_path)
        if event["requireBasicInfo"]:
            if not basic_info:
                raise HTTPException(status_code=400, detail="Basic information is required")
            for field in event["requiredBasicInfo"]:
                if field.lower() not in basic_info or not basic_info[field.lower()]:
                    raise HTTPException(status_code=400, detail=f"Missing required field: {field}")
            registration_data["basic_info"] = basic_info
        if event["requireWebLink"]:
            if not web_links:
                raise HTTPException(status_code=400, detail="Web links are required")
            for link_type in event["requiredWebLinks"]:
                if link_type.lower() not in web_links or not web_links[link_type.lower()]:
                    raise HTTPException(status_code=400, detail=f"Missing required link: {link_type}")
            registration_data["web_links"] = web_links
        if event["requirePortfolio"]:
            if not portfolio:
                raise HTTPException(status_code=400, detail="Portfolio link is required")
            registration_data["portfolio"] = portfolio
        if event["customQuestions"]:
            if not custom_answers:
                raise HTTPException(status_code=400, detail="Custom question answers are required")
            for question in event["customQuestions"]:
                question_text = question["question"]
                if question_text not in custom_answers:
                    raise HTTPException(status_code=400, detail=f"Missing answer for: {question_text}")
                answer = custom_answers[question_text]
                if question["type"] == "MCQ" and answer not in question["options"]:
                    raise HTTPException(status_code=400, detail=f"Invalid answer for {question_text}. Allowed: {', '.join(question['options'])}")
                if question["type"] == "Yes/No" and answer not in ["Yes", "No"]:
                    raise HTTPException(status_code=400, detail=f"Invalid answer for {question_text}. Allowed: Yes, No")
                if question["type"] == "Question/Answer":
                    if question["answerType"] == "Integer":
                        try:
                            int(answer)
                        except ValueError:
                            raise HTTPException(status_code=400, detail=f"Answer for {question_text} must be an integer")
            registration_data["custom_answers"] = custom_answers
        
        # Update event
        update_data = {
            "registeredUsers": event["registeredUsers"] + [str(user_id)],
            "totalRegistrations": event["totalRegistrations"] + 1,
            "updatedAt": datetime.utcnow()
        }
        await modify_event(event_id, update_data)
        
        # Update user
        user_update_data = {
            "eventsRegistered": current_user.get("eventsRegistered", []) + [{
                "eventId": event_id,
                "registeredAt": datetime.utcnow(),
                **registration_data
            }],
            "updatedAt": datetime.utcnow()
        }
        await update_user(user_id, user_update_data)
        
        logger.info(f"User {user_id} registered for event {event_id}")
        return {"message": "Successfully registered for the event", "eventId": event_id}
    except ValueError as ve:
        logger.error(f"Validation error in register_for_event: {str(ve)}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Error registering for event {event_id}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error registering for event: {str(e)}")

@router.patch("/{event_id}/extend_deadline/", response_model=Event)
async def extend_event_deadline(event_id: str, extension: ExtendDeadlineRequest):
    try:
        if not ObjectId.is_valid(event_id):
            raise HTTPException(status_code=400, detail="Invalid event ID")
        event = await get_event_by_id(event_id)
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        # Parse new date
        try:
            new_date = datetime.strptime(extension.newDate, "%Y-%m-%d")
        except ValueError:
            logger.error(f"Invalid date format for newDate: {extension.newDate}")
            raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
        # Validate new date is in the future
        if new_date.date() < datetime.utcnow().date():
            raise HTTPException(status_code=400, detail="New date must be in the future")
        # Update event with new date fields
        update_data = {
            "date": str(new_date.day),
            "month": str(new_date.month),
            "year": str(new_date.year),
            "updatedAt": datetime.utcnow()
        }
        result = await modify_event(event_id, update_data)
        if not result or result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Event not found or no fields updated")
        # Post deadline extension notification
        notification_data = Notification(
            event_id=event_id,
            type="deadline",
            message=f"The deadline for {event['eventName']} has been changed to {new_date.strftime('%B %d, %Y')}.",
            poster_url=None,
            extended_days=0,
            extended_months=0,
            reason=extension.reason,
            created_at=datetime.utcnow()
        )
        await post_notification(notification_data.dict())
        # Fetch updated event
        updated_event = await get_event_by_id(event_id)
        if not updated_event:
            raise HTTPException(status_code=404, detail="Updated event not found")
        updated_event["_id"] = event_id
        return Event.parse_obj(updated_event)
    except ValueError as ve:
        logger.error(f"Validation error in extend_event_deadline: {str(ve)}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Error extending deadline for event {event_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error extending deadline: {str(e)}")