try:
    from ..db import db_client  # Try importing from app/db.py
except ImportError:
    try:
        from db import db_client  # Fallback to backend/db.py or root
    except ImportError:
        raise ImportError("Cannot import db_client. Ensure db.py exists in app/ or backend/ and is in PYTHONPATH")

from bson import ObjectId
from ..models.event_registration_model import EventRegistration
import logging

logger = logging.getLogger(__name__)

async def create_registration(registration_data: dict) -> str:
    try:
        logger.info(f"Creating registration with data: {registration_data}")
        # Validate registration data using Pydantic model
        registration = EventRegistration(**registration_data)
        # Convert to dict, include all fields (including created_at)
        registration_dict = registration.dict(by_alias=True, exclude={"_id", "id"})
        logger.info(f"Registration dict for insertion: {registration_dict}")
        
        # Insert into the database
        collection = db_client["centerofexcellence"]["event_registration"]
        result = await collection.insert_one(registration_dict)
        logger.info(f"Created registration with _id: {result.inserted_id}")
        return str(result.inserted_id)
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        raise ValueError(f"Invalid registration data: {str(ve)}")
    except Exception as e:
        logger.error(f"Error creating registration: {str(e)}", exc_info=True)
        raise Exception(f"Error creating registration: {str(e)}")

async def get_registration(registration_id: str) -> dict:
    if not ObjectId.is_valid(registration_id):
        logger.error(f"Invalid registration ID: {registration_id}")
        return None
    collection = db_client["centerofexcellence"]["event_registration"]
    registration = await collection.find_one({"_id": ObjectId(registration_id)})
    if registration:
        registration["_id"] = str(registration["_id"])
    return registration

async def get_registration_by_event_and_user(event_id: str, user_id: str) -> dict:
    collection = db_client["centerofexcellence"]["event_registration"]
    registration = await collection.find_one({"event_id": event_id, "user_id": user_id})
    if registration:
        registration["_id"] = str(registration["_id"])
    return registration

async def get_registrations_by_event(event_id: str) -> list:
    collection = db_client["centerofexcellence"]["event_registration"]
    cursor = collection.find({"event_id": event_id})
    registrations = await cursor.to_list(length=None)
    for reg in registrations:
        reg["_id"] = str(reg["_id"])
    return registrations

async def update_registration(event_id: str, user_id: str, update_data: dict):
    collection = db_client["centerofexcellence"]["event_registration"]
    logger.info(f"Updating registration for event_id: {event_id}, user_id: {user_id} with data: {update_data}")
    result = await collection.update_one(
        {"event_id": event_id, "user_id": user_id},
        {"$set": update_data}
    )
    logger.info(f"Update result: {result.matched_count} matched, {result.modified_count} modified")
    return result

async def delete_registration(event_id: str, user_id: str):
    collection = db_client["centerofexcellence"]["event_registration"]
    return await collection.delete_one({"event_id": event_id, "user_id": user_id})