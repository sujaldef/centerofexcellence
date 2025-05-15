from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
import pytz

IST = pytz.timezone("Asia/Kolkata")

class NewsletterSubscription(BaseModel):
    email: EmailStr
    created_at: datetime = Field(default_factory=lambda: datetime.now(IST))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(IST))