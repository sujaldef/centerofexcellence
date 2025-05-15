from db import db_client
import logging
from datetime import datetime
import pytz
from app.models.newsletter_model import NewsletterSubscription
from pydantic import ValidationError

IST = pytz.timezone("Asia/Kolkata")

logger = logging.getLogger(__name__)
collection = db_client["centerofexcellence"]["newsletter"]

async def subscribe_user(email: str):
    """Subscribe a user to the newsletter by email."""
    try:
        # Check if email is already subscribed
        existing = await collection.find_one({"email": email})
        if existing:
            logger.info(f"Email already subscribed: {email}")
            return {"message": "This email is already subscribed."}

        # Create subscription data with timestamps
        current_time = datetime.now(IST)
        subscription_data = {
            "email": email,
            "created_at": current_time,
            "updated_at": current_time
        }

        # Validate data with Pydantic model
        subscription = NewsletterSubscription(**subscription_data)
        logger.info(f"Subscribing email: {email}")

        # Insert into database
        result = await collection.insert_one(subscription.dict(by_alias=True))
        logger.info(f"Subscribed email with _id: {result.inserted_id}")

        return {"message": "Subscription successful", "id": str(result.inserted_id)}

    except ValidationError as ve:
        logger.error(f"Validation error for email {email}: {str(ve)}")
        raise ValueError(f"Invalid email format: {str(ve)}")
    except Exception as e:
        logger.error(f"Error subscribing email {email}: {str(e)}", exc_info=True)
        raise Exception(f"Error subscribing email: {str(e)}")

async def get_all_subscribers():
    """Retrieve all newsletter subscribers."""
    try:
        cursor = collection.find({})
        subscribers = await cursor.to_list(length=None)
        # Convert _id to string for JSON response
        for subscriber in subscribers:
            subscriber["_id"] = str(subscriber["_id"])
        logger.info(f"Retrieved {len(subscribers)} subscribers")
        return subscribers
    except Exception as e:
        logger.error(f"Error retrieving subscribers: {str(e)}", exc_info=True)
        raise Exception(f"Error retrieving subscribers: {str(e)}")