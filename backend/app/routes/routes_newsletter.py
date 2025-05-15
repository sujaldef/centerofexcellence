from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from app.models.newsletter_model import NewsletterSubscription
from app.services.newsletter_services import subscribe_user, get_all_subscribers
from typing import List

router = APIRouter(prefix="/newsletter", tags=["newsletter"])

class SubscribeResponse(BaseModel):
    message: str
    id: str = None

@router.post("/subscribe", response_model=SubscribeResponse, status_code=status.HTTP_201_CREATED)
async def subscribe(subscription: NewsletterSubscription):
    """Subscribe a user to the newsletter by email."""
    try:
        result = await subscribe_user(subscription.email)
        return result
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/allsubscribers", response_model=List[NewsletterSubscription])
async def list_subscribers():
    """Retrieve all newsletter subscribers."""
    try:
        subscribers = await get_all_subscribers()
        return [NewsletterSubscription(**sub) for sub in subscribers]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))