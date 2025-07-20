from fastapi import HTTPException
from db import db_client
from bson.objectid import ObjectId
from app.models.user_model import User
from passlib.hash import bcrypt
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

async def create_user(user_data: dict) -> str:
    try:
        collection = db_client["centerofexcellence"]["user"]
        user = User(**user_data)
        user_dict = user.dict(by_alias=True, exclude_unset=True, exclude={"id"})
        current_time = datetime.utcnow()
        user_dict["createdAt"] = current_time
        user_dict["updatedAt"] = current_time
        existing_user = await collection.find_one({
            "$or": [
                {"email": user_dict.get("email")},
                {"username": user_dict.get("username")}
            ]
        })
        if existing_user:
            logger.error(f"User already exists with email {user_dict.get('email')} or username {user_dict.get('username')}")
            raise HTTPException(status_code=400, detail="Email or username already exists")
        logger.info(f"Creating user with data: {user_dict}")
        result = await collection.insert_one(user_dict)
        logger.info(f"Created user with _id: {result.inserted_id}")
        return str(result.inserted_id)
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        raise HTTPException(status_code=400, detail=f"Invalid user data: {str(ve)}")
    except Exception as e:
        logger.error(f"Error creating user: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error creating user: {str(e)}")

async def get_user_by_id(user_id: str) -> dict:
    try:
        collection = db_client["centerofexcellence"]["user"]
        user = await collection.find_one({"_id": ObjectId(user_id)})
        if user:
            user["_id"] = str(user["_id"])
            return user
        logger.warning(f"User not found with ID: {user_id}")
        return None
    except Exception as e:
        logger.error(f"Error fetching user {user_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching user: {str(e)}")

async def get_user_by_name(username: str) -> dict:
    try:
        collection = db_client["centerofexcellence"]["user"]
        user = await collection.find_one({"username": username})
        if user:
            user["_id"] = str(user["_id"])
            return user
        logger.warning(f"User not found with username: {username}")
        return None
    except Exception as e:
        logger.error(f"Error fetching user by username {username}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching user: {str(e)}")

async def delete_user(user_id: str) -> dict:
    try:
        collection = db_client["centerofexcellence"]["user"]
        result = await collection.delete_one({"_id": ObjectId(user_id)})
        return result
    except Exception as e:
        logger.error(f"Error deleting user {user_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error deleting user: {str(e)}")

async def update_user(user_id: str, user_data: dict) -> dict:
    try:
        collection = db_client["centerofexcellence"]["user"]
        if not ObjectId.is_valid(user_id):
            logger.error(f"Invalid user ID: {user_id}")
            raise HTTPException(status_code=400, detail="Invalid user ID format")
        existing_user = await collection.find_one({"_id": ObjectId(user_id)})
        if not existing_user:
            logger.error(f"User not found: {user_id}")
            raise HTTPException(status_code=404, detail="User not found")
        if "password" in user_data:
            user_data["password"] = bcrypt.hash(user_data["password"])
        if "eventsRegistered" in user_data:
            logger.info(f"Updating eventsRegistered for user {user_id}: {user_data['eventsRegistered']}")
            for registration in user_data["eventsRegistered"]:
                if not isinstance(registration, dict) or "eventId" not in registration:
                    logger.error("Invalid eventsRegistered format")
                    raise HTTPException(status_code=400, detail="Invalid eventsRegistered format")
        user_data["updatedAt"] = datetime.utcnow()
        # Convert _id to string in existing_user before merging
        existing_user["_id"] = str(existing_user["_id"])
        updated_user_data = {**existing_user, **user_data}
        logger.info(f"Validating updated user data: {updated_user_data}")
        try:
            User(**updated_user_data)
        except Exception as ve:
            logger.error(f"Pydantic validation failed for user {user_id}: {str(ve)}")
            raise HTTPException(status_code=400, detail=f"Invalid user data: {str(ve)}")
        logger.info(f"Updating user with _id: {user_id} with data: {user_data}")
        update_result = await collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": user_data}
        )
        if update_result.modified_count == 0:
            logger.warning(f"No changes made to user data for _id: {user_id}")
            raise HTTPException(status_code=400, detail="No changes made to user data")
        updated_user = await collection.find_one({"_id": ObjectId(user_id)})
        if not updated_user:
            logger.error(f"Failed to retrieve updated user: {user_id}")
            raise HTTPException(status_code=500, detail="Failed to retrieve updated user")
        updated_user["_id"] = str(updated_user["_id"])
        logger.info(f"Successfully updated user with _id: {user_id}")
        return updated_user
    except Exception as e:
        logger.error(f"Error updating user {user_id}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error updating user: {str(e)}")