from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.models.notification_model import Notification
from app.services.notification_services import post_notification, get_notifications_by_event
from typing import Optional
from datetime import datetime
import pytz
import os

router = APIRouter(prefix="/notifications", tags=["notifications"])

IST = pytz.timezone("Asia/Kolkata")

@router.post("/", response_model=dict)
async def create_notification(
    event_id: str = Form(...),
    type: str = Form(...),
    message: Optional[str] = Form(None),
    poster: Optional[UploadFile] = File(None),
    reason: Optional[str] = Form(None),
    extended_days: Optional[int] = Form(0),
    extended_months: Optional[int] = Form(0),
):
    print(f"Received POST request: event_id={event_id}, type={type}, message={message}")
    if type not in ['text', 'poster', 'deadline', 'cancellation']:
        raise HTTPException(status_code=400, detail="Invalid notification type")

    notification_data = {
        "event_id": event_id,
        "type": type,
        "message": message,
        "reason": reason,
        "extended_days": extended_days,
        "extended_months": extended_months,
        "created_at": datetime.now(IST),
    }

    if type == "poster" and poster:
        upload_dir = "uploads/posters"
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, poster.filename)
        with open(file_path, "wb") as f:
            f.write(poster.file.read())
        notification_data["poster_url"] = file_path

    inserted_id = await post_notification(notification_data)
    return {"message": "Notification posted", "id": str(inserted_id)}

@router.get("/{event_id}")
async def fetch_notifications(event_id: str):
    return await get_notifications_by_event(event_id)