from fastapi import APIRouter, UploadFile, File, Form
from app.models.notification_model import Notification
from app.services.notification_services import post_notification, get_notifications_by_event
from typing import Optional
import datetime

router = APIRouter(prefix="/notifications", tags=["notifications"])

@router.post("/", response_model=dict)
async def create_notification(notification: Notification):
    inserted_id = await post_notification(notification.dict())
    return {"message": "Notification posted", "id": inserted_id}

@router.get("/{event_id}")
async def fetch_notifications(event_id: str):
    return await get_notifications_by_event(event_id)
