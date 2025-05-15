from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

class Certificate(BaseModel):
    certificateId: str
    eventId: str
    name: str
    issuedDate: str

class EventRegistration(BaseModel):
    eventId: str
    registeredAt: Optional[datetime] = None
    attendedAt: Optional[datetime] = None
    appliedAt: Optional[datetime] = None
    status: Optional[str] = None

class BlogRequest(BaseModel):
    blogId: str
    status: str = Field(..., pattern="^(pending|rejected|accepted)$")

class PostedBlog(BaseModel):
    blogId: str
    status: str = Field(..., pattern="^(published|unpublished)$")

class User(BaseModel):
    username: str
    password: str
    email: EmailStr
    age: int
    phone: str
    profilePic: Optional[str] = None
    description: Optional[str] = None
    skills: List[str] = []
    interests: List[str] = []
    eventsRegistered: List[EventRegistration] = []
    eventsAttended: List[EventRegistration] = []
    certificatesEarned: List[Certificate] = []
    activeApplications: List[EventRegistration] = []
    requestedBlogs: List[BlogRequest] = []
    postedBlogs: List[PostedBlog] = []
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)


class UserUpdate(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None
    email: Optional[EmailStr] = None
    age: Optional[int] = None
    phone: Optional[str] = None
    profilePic: Optional[str] = None
    description: Optional[str] = None
    skills: Optional[List[str]] = None
    interests: Optional[List[str]] = None
    eventsRegistered: Optional[List[EventRegistration]] = None
    eventsAttended: Optional[List[EventRegistration]] = None
    certificatesEarned: Optional[List[Certificate]] = None
    activeApplications: Optional[List[EventRegistration]] = None
    requestedBlogs: Optional[List[BlogRequest]] = None
    postedBlogs: Optional[List[PostedBlog]] = None
    updatedAt: Optional[datetime] = Field(default_factory=datetime.utcnow)
