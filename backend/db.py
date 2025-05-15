from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

db_client = AsyncIOMotorClient(settings.MONGO_URI)
db = db_client[settings.DB_NAME]