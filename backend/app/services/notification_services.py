from db import db_client
from app.models.notification_model import Notification

collection = db_client["centerofexcellence"]["notifications"]

async def post_notification(notification_data: dict):
    result = await collection.insert_one(notification_data)
    return str(result.inserted_id)

async def get_notifications_by_event(event_id: str):
    cursor = collection.find({"event_id": event_id}).sort("created_at", -1)
    return await cursor.to_list(length=None)