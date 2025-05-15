from fastapi import APIRouter, HTTPException, status
from app.services.user_service import create_user, get_user_by_id, get_user_by_name, delete_user, update_user
from app.models.user_model import User,UserUpdate
from bson.objectid import ObjectId
from passlib.hash import bcrypt
from pydantic import BaseModel

router = APIRouter(prefix="/users", tags=["users"])

class DeleteResponse(BaseModel):
    message: str

@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_new_user(user: User):
    """Create a new user with hashed password and return user details."""
    hashed_password = bcrypt.hash(user.password)
    user_data = user.dict(exclude_unset=True)
    user_data["password"] = hashed_password
    user_id = await create_user(user_data)
    created_user = await get_user_by_id(str(user_id))
    if not created_user:
        raise HTTPException(status_code=500, detail="Failed to retrieve created user")
    created_user["_id"] = user_id
    return User.parse_obj(created_user)

@router.get("/{user_id}", response_model=User)
async def get_user(user_id: str):
    """Retrieve a user by their ID."""
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user["_id"] = user_id
    return User.parse_obj(user)

@router.get("/name/{username}", response_model=User)
async def get_user_by_username(username: str):
    """Retrieve a user by their username."""
    user = await get_user_by_name(username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user_id = user["_id"]
    user["_id"] = user_id
    return User.parse_obj(user)

@router.delete("/{user_id}", response_model=DeleteResponse, status_code=status.HTTP_200_OK)
async def delete_user_route(user_id: str):
    """Delete a user by their ID."""
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    result = await delete_user(user_id)
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}

@router.patch("/{user_id}", response_model=User)
async def update_user_route(user_id: str, user_update: UserUpdate):
    """Update a user's information by their ID."""
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = user_update.dict(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No data provided for update")

    updated_user = await update_user(user_id, update_data)
    if not updated_user:
        raise HTTPException(status_code=400, detail="Failed to update user")

    updated_user["_id"] = user_id
    return User.parse_obj(updated_user)