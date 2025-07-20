from pydantic import BaseModel, Field, validator
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from pydantic_core import core_schema

# Custom ObjectId validator for MongoDB
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

# Event contact schema
class EventContact(BaseModel):
    name: str
    email: str
    phone: str

# Highlight schema
class HighlightItem(BaseModel):
    type: str
    title: Optional[str] = None
    description: Optional[str] = None
    name: Optional[str] = None
    role: Optional[str] = None
    contact: Optional[str] = None
    image: Optional[str] = None
    email: Optional[str] = None

# FAQ schema
class FAQItem(BaseModel):
    question: str
    answer: str

# Sponsor schema
class Sponsor(BaseModel):
    name: str
    logo: Optional[str] = None
    website: Optional[str] = None

# Custom question schema
class CustomQuestion(BaseModel):
    question: str
    type: str = Field(default="Question/Answer")
    options: List[str] = []
    answerType: Optional[str] = None

# Main Event Schema
class Event(BaseModel):
    eventId: Optional[PyObjectId] = Field(default=None, alias="_id")
    eventName: str
    tagline: Optional[str] = None
    category: str
    tags: List[str]
    date: str
    month: str
    year: str
    location: str
    capacity: Optional[int] = None
    eventMode: str = Field(default="virtual", pattern="^(virtual|physical)$")
    bannerImage: Optional[str] = None  # Changed to Optional
    thumbnailImage: Optional[str] = None  # Changed to Optional
    description: str
    highlights: List[HighlightItem] = []
    faqs: List[FAQItem] = []
    sponsors: List[Sponsor] = []
    organizer: str
    eventContact: EventContact
    whoAreWe: Optional[str] = None
    status: str
    totalRegistrations: int = 0
    registeredUsers: List[str] = []
    requireResume: bool = False
    allowedFileTypes: List[str] = Field(default_factory=list)
    requireBasicInfo: bool = False
    requiredBasicInfo: List[str] = Field(default_factory=list)
    requireWebLink: bool = False
    requiredWebLinks: List[str] = Field(default_factory=list)
    requireCoverLetter: bool = False
    requirePortfolio: bool = False
    customQuestions: List[CustomQuestion] = []
    instructions: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        from_attributes = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Event update schema
class EventUpdate(BaseModel):
    eventId: Optional[PyObjectId] = Field(default=None, alias="_id")
    eventName: Optional[str] = None
    tagline: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    date: Optional[str] = None
    month: Optional[str] = None
    year: Optional[str] = None
    location: Optional[str] = None
    capacity: Optional[int] = None
    eventMode: Optional[str] = Field(default=None, pattern="^(virtual|physical)$")
    bannerImage: Optional[str] = None
    thumbnailImage: Optional[str] = None
    description: Optional[str] = None
    highlights: Optional[List[HighlightItem]] = None
    faqs: Optional[List[FAQItem]] = None
    sponsors: Optional[List[Sponsor]] = None
    organizer: Optional[str] = None
    eventContact: Optional[EventContact] = None
    whoAreWe: Optional[str] = None
    status: Optional[str] = None
    totalRegistrations: Optional[int] = None
    registeredUsers: Optional[List[str]] = None
    requireResume: Optional[bool] = None
    allowedFileTypes: Optional[List[str]] = None
    requireBasicInfo: Optional[bool] = None
    requiredBasicInfo: Optional[List[str]] = None
    requireWebLink: Optional[bool] = None
    requiredWebLinks: Optional[List[str]] = None
    requireCoverLetter: Optional[bool] = None
    requirePortfolio: Optional[bool] = None
    customQuestions: Optional[List[CustomQuestion]] = None
    instructions: Optional[str] = None
    updatedAt: Optional[datetime] = Field(default_factory=datetime.utcnow)

    @validator("capacity")
    def validate_capacity(cls, v, values):
        if "eventMode" in values and values["eventMode"] == "physical":
            if v is None:
                raise ValueError("capacity is required for physical events")
            if v <= 0:
                raise ValueError("capacity must be a positive integer for physical events")
        return v

    class Config:
        populate_by_name = True
        from_attributes = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}