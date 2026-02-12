from fastapi import APIRouter, HTTPException, status, Depends, Header
from app.services.user_service import create_user, get_user_by_id, get_user_by_name, delete_user, update_user
from app.models.user_model import User, UserUpdate
from bson.objectid import ObjectId
from app.core.security import hash_password
from app.core.security import verify_password

from pydantic import BaseModel
import logging
from app.jwt_handler import verify_token, create_access_token
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

# Initialize MongoDB client
db_client = AsyncIOMotorClient(settings.MONGO_URI)
db = db_client[settings.DB_NAME]

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/users", tags=["users"])

# Request model for login
class LoginRequest(BaseModel):
    identifier: str
    password: str

# Response model for token, including user_id
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user_id: str

class DeleteResponse(BaseModel):
    message: str

# Dependency to verify JWT token and get the current user
async def get_current_user(authorization: str = Header(...)):
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing",
            headers={"WWW-Authenticate": "Bearer"},
        )
    try:
        token = authorization.split("Bearer ")[1] if "Bearer " in authorization else authorization
        payload = verify_token(token)
        logger.info(f"Token payload: {payload}")
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: username not found",
                headers={"WWW-Authenticate": "Bearer"},
            )
        user = await get_user_by_name(username)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"User not found for username: {username}",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user
    except IndexError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header format",
            headers={"WWW-Authenticate": "Bearer"},
        )

@router.post("/", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def create_new_user(user: User):
    try:
        logger.info(f"Received user data for creation: {user.dict(exclude_unset=True)}")
        # Check if username or email already exists
        existing_user = await db["user"].find_one({
            "$or": [
                {"username": user.username},
                {"email": user.email}
            ]
        })
        if existing_user:
            logger.warning(f"User creation failed: Username {user.username} or email {user.email} already exists")
            raise HTTPException(status_code=400, detail="Username or email already exists")

        hashed_password = hash_password(user.password)
        user_data = user.dict(exclude_unset=True)
        user_data["password"] = hashed_password
        # Remove _id if present to let MongoDB generate it
        user_data.pop("_id", None)
        user_id = await create_user(user_data)
        created_user = await get_user_by_id(str(user_id))
        if not created_user:
            logger.error(f"Failed to retrieve user with ID: {user_id}")
            raise HTTPException(status_code=500, detail="Failed to retrieve created user")
        
        # Generate JWT token for the new user
        access_token = create_access_token(data={"sub": created_user["username"]})
        logger.info(f"User created and token generated for username: {created_user['username']}")
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": str(user_id)
        }
    except HTTPException as he:
        logger.error(f"HTTP error during user creation: {he.detail}")
        raise he
    except Exception as e:
        logger.error(f"Error creating user: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error creating user: {str(e)}")

@router.get("/{user_id}", response_model=User)
async def get_user(user_id: str, current_user: dict = Depends(get_current_user)):
    if not ObjectId.is_valid(user_id):
        logger.warning(f"Invalid user ID format: {user_id}")
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    user = await get_user_by_id(user_id)
    if not user:
        logger.warning(f"User not found: {user_id}")
        raise HTTPException(status_code=404, detail="User not found")
    return User.parse_obj(user)

@router.get("/name/{username}", response_model=User)
async def get_user_by_username(username: str, current_user: dict = Depends(get_current_user)):
    user = await get_user_by_name(username)
    if not user:
        logger.warning(f"User not found with username: {username}")
        raise HTTPException(status_code=404, detail="User not found")
    return User.parse_obj(user)

@router.delete("/{user_id}", response_model=DeleteResponse, status_code=status.HTTP_200_OK)
async def delete_user_route(user_id: str, current_user: dict = Depends(get_current_user)):
    if not ObjectId.is_valid(user_id):
        logger.warning(f"Invalid user ID format: {user_id}")
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    result = await delete_user(user_id)
    if result.deleted_count == 0:
        logger.warning(f"User not found for deletion: {user_id}")
        raise HTTPException(status_code=404, detail="User not found")
    logger.info(f"User deleted successfully: {user_id}")
    return {"message": "User deleted successfully"}

@router.patch("/{user_id}", response_model=User)
async def update_user_route(user_id: str, user_update: UserUpdate, current_user: dict = Depends(get_current_user)):
    if not ObjectId.is_valid(user_id):
        logger.warning(f"Invalid user ID format: {user_id}")
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    user = await get_user_by_id(user_id)
    if not user:
        logger.warning(f"User not found: {user_id}")
        raise HTTPException(status_code=404, detail="User not found")
    update_data = user_update.dict(exclude_unset=True)
    if not update_data:
        logger.warning(f"No data provided for update for user: {user_id}")
        raise HTTPException(status_code=400, detail="No data provided for update")
    updated_user = await update_user(user_id, update_data)
    if not updated_user:
        logger.error(f"Failed to update user: {user_id}")
        raise HTTPException(status_code=400, detail="Failed to update user")
    logger.info(f"User updated successfully: {user_id}")
    return User.parse_obj(updated_user)

@router.post("/login", response_model=TokenResponse)
async def login_user(login_data: LoginRequest):
    try:
        collection = db["user"]
        if collection is None:
            logger.error("Database collection 'user' is None")
            raise HTTPException(status_code=500, detail="Database configuration error: collection is None")
        user = await collection.find_one({
            "$or": [
                {"username": login_data.identifier},
                {"email": login_data.identifier}
            ]
        })
        if not user:
            logger.warning(f"Login failed: Invalid username or email: {login_data.identifier}")
            raise HTTPException(status_code=401, detail="Invalid username or email")
        if "_id" not in user:
            logger.error(f"User {login_data.identifier} has missing _id field")
            raise HTTPException(status_code=500, detail="User account is corrupted: missing _id")
        user["_id"] = str(user["_id"])
        password_hash = user.get("password")
        if not password_hash or not isinstance(password_hash, str) or not password_hash.startswith('$2b$'):
            logger.error(f"User {login_data.identifier} has invalid or missing password field: {password_hash}")
            raise HTTPException(status_code=500, detail="User account is corrupted: invalid password format")
        try:
            if not verify_password(login_data.password, password_hash):
                logger.warning(f"Login failed: Invalid password for identifier: {login_data.identifier}")
                raise HTTPException(status_code=401, detail="Invalid password")
        except ValueError as ve:
            logger.error(f"Password verification failed for {login_data.identifier}: {str(ve)}")
            raise HTTPException(status_code=500, detail="Password verification error")
        
        access_token = create_access_token(data={"sub": user["username"]})
        logger.info(f"Generating token for username: {user['username']}")
        logger.info(f"User logged in successfully: {user['_id']}")
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": user["_id"]
        }
    except Exception as e:
        logger.error(f"Error during login: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Login error: {str(e)}")