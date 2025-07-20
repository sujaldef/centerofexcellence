from db import db_client
from bson.objectid import ObjectId
from app.models.event_model import Event
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

async def create_event(event_data: dict):
    try:
        logger.info(f"Received event data: {event_data}")
        # Validate event data using Pydantic model
        event = Event(**event_data)
        # Convert to dict, explicitly exclude '_id' and 'id' to prevent conflicts
        event_dict = event.dict(by_alias=True, exclude_unset=True, exclude={"_id", "id"})
        # Set createdAt and updatedAt
        current_time = datetime.utcnow()
        event_dict["createdAt"] = current_time
        event_dict["updatedAt"] = current_time
        logger.debug(f"Event dict for insertion: {event_dict}")
        
        # Insert into the database
        collection = db_client["centerofexcellence"]["events"]
        result = await collection.insert_one(event_dict)
        logger.info(f"Created event with _id: {result.inserted_id}")
        return str(result.inserted_id)
    
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}", exc_info=True)
        raise ValueError(f"Invalid event data: {str(ve)}")
    except Exception as e:
        logger.error(f"Error creating event: {str(e)}", exc_info=True)
        raise Exception(f"Error creating event: {str(e)}")

# Other functions remain unchanged
async def get_event_by_id(event_id: str):
    try:
        if not ObjectId.is_valid(event_id):
            logger.error(f"Invalid event ID format: {event_id}")
            raise ValueError("Invalid event ID format")
        
        collection = db_client["centerofexcellence"]["events"]
        event = await collection.find_one({"_id": ObjectId(event_id)})
        
        if event:
            # Convert _id to string for JSON response
            event["_id"] = str(event["_id"])
            logger.info(f"Retrieved event with _id: {event_id}")
        return event
    
    except ValueError as ve:
        logger.error(f"Validation error in get_event_by_id: {str(ve)}")
        raise
    except Exception as e:
        logger.error(f"Error retrieving event with _id {event_id}: {str(e)}", exc_info=True)
        raise Exception(f"Error retrieving event: {str(e)}")

async def get_event_by_name(event_name: str):
    try:
        collection = db_client["centerofexcellence"]["events"]
        event = await collection.find_one({"eventName": event_name})
        
        if event:
            # Convert _id to string for JSON response
            event["_id"] = str(event["_id"])
            logger.info(f"Retrieved event with name: {event_name}")
        return event
    
    except Exception as e:
        logger.error(f"Error retrieving event with name {event_name}: {str(e)}", exc_info=True)
        raise Exception(f"Error retrieving event: {str(e)}")

async def get_all_events():
    try:
        collection = db_client["centerofexcellence"]["events"]
        cursor = collection.find({})
        events = []
        async for event in cursor:
            event["_id"] = str(event["_id"])  # Convert ObjectId to string
            events.append(event)
        logger.info(f"Retrieved {len(events)} events")
        return events
    except Exception as e:
        logger.error(f"Error retrieving all events: {str(e)}", exc_info=True)
        raise Exception(f"Error retrieving events: {str(e)}")

async def delete_event(event_id: str):
    try:
        if not ObjectId.is_valid(event_id):
            logger.error(f"Invalid event ID format: {event_id}")
            raise ValueError("Invalid event ID format")
        
        collection = db_client["centerofexcellence"]["events"]
        result = await collection.delete_one({"_id": ObjectId(event_id)})
        logger.info(f"Delete result for _id {event_id}: {result.deleted_count} deleted")
        return result
    
    except ValueError as ve:
        logger.error(f"Validation error in delete_event: {str(ve)}")
        raise
    except Exception as e:
        logger.error(f"Error deleting event with _id {event_id}: {str(e)}", exc_info=True)
        raise Exception(f"Error deleting event: {str(e)}")

async def modify_event(event_id: str, update_data: dict):
    try:
        if not ObjectId.is_valid(event_id):
            logger.error(f"Invalid event ID format: {event_id}")
            raise ValueError("Invalid event ID format")

        # Validate eventMode if provided
        if "eventMode" in update_data and update_data["eventMode"] not in ["virtual", "physical"]:
            logger.error(f"Invalid eventMode in update: {update_data['eventMode']}")
            raise ValueError("eventMode must be one of: virtual, physical")

        # Validate capacity if provided and eventMode is physical
        if "eventMode" in update_data and update_data["eventMode"] == "physical":
            if "capacity" not in update_data or update_data["capacity"] is None:
                logger.error("capacity is required for physical events")
                raise ValueError("capacity is required for physical events")
            if update_data["capacity"] <= 0:
                logger.error(f"Invalid capacity in update: {update_data['capacity']}")
                raise ValueError("capacity must be a positive integer for physical events")

        # Add updatedAt to update_data
        update_data["updatedAt"] = datetime.utcnow()
        
        logger.info(f"Updating event with _id: {event_id} with data: {update_data}")
        collection = db_client["centerofexcellence"]["events"]
        result = await collection.update_one(
            {"_id": ObjectId(event_id)},
            {"$set": update_data}
        )
        
        logger.info(f"Update result: {result.matched_count} matched, {result.modified_count} modified")
        return result
    
    except ValueError as ve:
        logger.error(f"Validation error in modify_event: {str(ve)}")
        raise
    except Exception as e:
        logger.error(f"Error updating event with _id {event_id}: {str(e)}", exc_info=True)
        raise Exception(f"Error updating event: {str(e)}")
    # In event_service.py, modify the modify_event function to add logging for registration updates
async def modify_event(event_id: str, update_data: dict):
    try:
        if not ObjectId.is_valid(event_id):
            logger.error(f"Invalid event ID format: {event_id}")
            raise ValueError("Invalid event ID format")

        # Validate eventMode if provided
        if "eventMode" in update_data and update_data["eventMode"] not in ["virtual", "physical"]:
            logger.error(f"Invalid eventMode in update: {update_data['eventMode']}")
            raise ValueError("eventMode must be one of: virtual, physical")

        # Validate capacity if provided and eventMode is physical
        if "eventMode" in update_data and update_data["eventMode"] == "physical":
            if "capacity" not in update_data or update_data["capacity"] is None:
                logger.error("capacity is required for physical events")
                raise ValueError("capacity is required for physical events")
            if update_data["capacity"] <= 0:
                logger.error(f"Invalid capacity in update: {update_data['capacity']}")
                raise ValueError("capacity must be a positive integer for physical events")

        # Validate registeredUsers if provided
        if "registeredUsers" in update_data:
            logger.info(f"Updating registeredUsers for event {event_id}: {update_data['registeredUsers']}")
            if not isinstance(update_data["registeredUsers"], list):
                logger.error("registeredUsers must be a list")
                raise ValueError("registeredUsers must be a list")

        # Validate totalRegistrations if provided
        if "totalRegistrations" in update_data:
            logger.info(f"Updating totalRegistrations for event {event_id}: {update_data['totalRegistrations']}")
            if not isinstance(update_data["totalRegistrations"], int) or update_data["totalRegistrations"] < 0:
                logger.error("totalRegistrations must be a non-negative integer")
                raise ValueError("totalRegistrations must be a non-negative integer")

        # Add updatedAt to update_data
        update_data["updatedAt"] = datetime.utcnow()
        
        logger.info(f"Updating event with _id: {event_id} with data: {update_data}")
        collection = db_client["centerofexcellence"]["events"]
        result = await collection.update_one(
            {"_id": ObjectId(event_id)},
            {"$set": update_data}
        )
        
        logger.info(f"Update result: {result.matched_count} matched, {result.modified_count} modified")
        return result
    
    except ValueError as ve:
        logger.error(f"Validation error in modify_event: {str(ve)}")
        raise
    except Exception as e:
        logger.error(f"Error updating event with _id {event_id}: {str(e)}", exc_info=True)
        raise Exception(f"Error updating event: {str(e)}")