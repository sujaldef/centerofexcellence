from fastapi import HTTPException
from db import db_client
from bson.objectid import ObjectId
from app.models.user_model import User
from passlib.hash import bcrypt
from datetime import datetime
import logging
logger = logging.getLogger(__name__)

async def create_user(user_data: dict) -> str:
    """Create a new user in the database and return the user ID."""
    try:
        collection = db_client["centerofexcellence"]["user"]
        user = User(**user_data)
        user_dict = user.dict(by_alias=True, exclude_unset=True, exclude={"_id", "id"})
        # Set createdAt and updatedAt
        current_time = datetime.utcnow()
        user_dict["createdAt"] = current_time
        user_dict["updatedAt"] = current_time
        logger.info(f"Creating user with data: {user_dict}")
        result = await collection.insert_one(user_dict)
        logger.info(f"Created user with _id: {result.inserted_id}")
        return str(result.inserted_id)
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        raise ValueError(f"Invalid user data: {str(ve)}")
    except Exception as e:
        logger.error(f"Error creating user: {str(e)}", exc_info=True)
        raise Exception(f"Error creating user: {str(e)}")

async def get_user_by_id(user_id: str) -> dict:
    """Retrieve a user by their ID from the database."""
    collection = db_client["centerofexcellence"]["user"]
    user = await collection.find_one({"_id": ObjectId(user_id)})
    if user:
        user["_id"] = str(user["_id"])
        return user
    return None

async def get_user_by_name(username: str) -> dict:
    """Retrieve a user by their username from the database."""
    collection = db_client["centerofexcellence"]["user"]
    user = await collection.find_one({"username": {"$regex": f"^{username}$", "$options": "i"}})
    if user:
        user["_id"] = str(user["_id"])
        return user
    return None

async def delete_user(user_id: str) -> dict:
    """Delete a user by their ID from the database."""
    collection = db_client["centerofexcellence"]["user"]
    return await collection.delete_one({"_id": ObjectId(user_id)})

async def update_user(user_id: str, user_data: dict) -> dict:
    """Update a user's information in the database."""
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
    
    # Add updatedAt to user_data
    user_data["updatedAt"] = datetime.utcnow()
    
    # Validate updated data with User model
    updated_user_data = {**existing_user, **user_data}
    User(**updated_user_data)  # Validate the merged data
    
    logger.info(f"Updating user with _id: {user_id} with data: {user_data}")
    update_result = await collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": user_data}
    )
    
    if update_result.modified_count == 0:
        logger.warning(f"No changes made to user data for _id: {user_id}")
        raise HTTPException(status_code=400, detail="No changes made to user data")
    
    updated_user = await collection.find_one({"_id": ObjectId(user_id)})
    updated_user["_id"] = str(updated_user["_id"])
    
    logger.info(f"Successfully updated user with _id: {user_id}")
    return updated_user