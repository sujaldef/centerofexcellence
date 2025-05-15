from pydantic import BaseModel, Field, validator
from typing import List, Optional
from bson.objectid import ObjectId
from datetime import datetime
import pytz
from pydantic_core import core_schema

IST = pytz.timezone("Asia/Kolkata")

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type, handler):
        return core_schema.union_schema([
            core_schema.is_instance_schema(ObjectId),
            core_schema.no_info_plain_validator_function(cls.validate),
        ])

    @classmethod
    def validate(cls, v, *args, **kwargs):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        return {"type": "string"}

class Blog(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    title: str
    authorType: str = Field(..., pattern="^(user|admin)$")
    authorId: str
    authorName: str
    authorProfilePic: Optional[str] = None
    tags: List[str]
    poster: str
    description: str
    category: str
    published: bool = False
    status: str = Field(default="pending", pattern="^(pending|accepted|rejected)$")
    created_at: datetime = Field(default_factory=lambda: datetime.now(IST))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(IST))

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            ObjectId: str
        }
        json_schema_extra = {
            "example": {
                "_id": "507f1f77bcf86cd799439011",
                "title": "The Future of AI in 2025",
                "authorType": "user",
                "authorId": "507f1f77bcf86cd799439011",
                "authorName": "John Doe",
                "authorProfilePic": "https://example.com/images/johndoe.jpg",
                "tags": ["AI", "Technology", "2025"],
                "poster": "https://example.com/poster.jpg",
                "description": "An in-depth exploration of AI advancements expected in 2025.",
                "category": "Technology",
                "published": False,
                "status": "pending",
                "created_at": "2025-05-01T11:43:56.564000",
                "updated_at": "2025-05-01T11:43:56.564000"
            }
        }

class BlogUpdate(BaseModel):
    title: Optional[str] = None
    authorType: Optional[str] = Field(default=None, pattern="^(user|admin)$")
    authorId: Optional[str] = None
    authorName: Optional[str] = None
    authorProfilePic: Optional[str] = None
    tags: Optional[List[str]] = None
    poster: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    published: Optional[bool] = None
    status: Optional[str] = Field(default=None, pattern="^(pending|accepted|rejected)$")
    updated_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(IST))

    @validator("authorId")
    def validate_object_id(cls, v):
        if v is not None:
            try:
                ObjectId(v)
            except Exception:
                raise ValueError("authorId must be a valid MongoDB ObjectId (24-character hex string)")
        return v

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            ObjectId: str
        }