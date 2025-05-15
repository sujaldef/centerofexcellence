from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime
import pytz

IST = pytz.timezone("Asia/Kolkata")
class Notification(BaseModel):
    event_id: str
    type: Literal['text', 'poster', 'deadline', 'cancellation']
    message: Optional[str] = None
    poster_url: Optional[str] = None
    extended_days: Optional[int] = 0
    extended_months: Optional[int] = 0
    reason: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(IST))
