from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import pytz

IST = pytz.timezone("Asia/Kolkata")

class Answer(BaseModel):
    index: int
    answer: str
class EventRegistrationUpdate(BaseModel):
    answers: Optional[List[Answer]] = None
    created_at: Optional[datetime] = None
class EventRegistration(BaseModel):
    event_id: str
    user_id: str
    answers: Optional[List[Answer]] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(IST))

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            datetime: lambda v: v.isoformat(),  # Serialize datetime to ISO string
        }
        json_schema_extra = {
            "example": {
                "event_id": "507f1f77bcf86cd799439011",
                "user_id": "507f1f77bcf86cd799439012",
                "answers": [
                    {"index": 0, "answer": "Yes"},
                    {"index": 1, "answer": "42"}
                ],
                "created_at": "2025-04-30T18:30:05.672594+05:30"
            }
        }