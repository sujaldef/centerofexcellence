from db import db_client
from bson.objectid import ObjectId
from app.models.blog_model import Blog
from datetime import datetime
import pytz
import logging

logger = logging.getLogger(__name__)

IST = pytz.timezone("Asia/Kolkata")

async def create_blog(blog_data: dict):
    try:
        logger.info(f"Received blog data: {blog_data}")
        blog = Blog(**blog_data)
        blog_dict = blog.dict(by_alias=True, exclude={"id"})
        collection = db_client["centerofexcellence"]["blogs"]
        result = await collection.insert_one(blog_dict)
        logger.info(f"Created blog with _id: {result.inserted_id}")
        inserted_blog = await get_blog_by_id(str(result.inserted_id))
        return inserted_blog
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        raise ValueError(f"Invalid blog data: {str(ve)}")
    except Exception as e:
        logger.error(f"Error creating blog: {str(e)}", exc_info=True)
        raise Exception(f"Error creating blog: {str(e)}")

async def get_blog_by_id(blog_id: str):
    try:
        if not ObjectId.is_valid(blog_id):
            logger.error(f"Invalid blog ID format: {blog_id}")
            raise ValueError("Invalid blog ID format")
        collection = db_client["centerofexcellence"]["blogs"]
        blog = await collection.find_one({"_id": ObjectId(blog_id)})
        if not blog:
            logger.info(f"No blog found with _id: {blog_id}")
            return None
        blog["_id"] = str(blog["_id"])
        logger.info(f"Retrieved blog with _id: {blog_id}")
        return blog
    except ValueError as ve:
        logger.error(f"Validation error in get_blog_by_id: {str(ve)}")
        raise
    except Exception as e:
        logger.error(f"Error retrieving blog with _id {blog_id}: {str(e)}", exc_info=True)
        raise Exception(f"Error retrieving blog: {str(e)}")

async def get_all_blogs():
    try:
        collection = db_client["centerofexcellence"]["blogs"]
        blogs = await collection.find().to_list(None)
        for blog in blogs:
            blog["_id"] = str(blog["_id"])
        logger.info(f"Retrieved {len(blogs)} blogs")
        return blogs
    except Exception as e:
        logger.error(f"Error retrieving all blogs: {str(e)}", exc_info=True)
        raise Exception(f"Error retrieving blogs: {str(e)}")

async def delete_blog(blog_id: str):
    try:
        if not ObjectId.is_valid(blog_id):
            logger.error(f"Invalid blog ID format: {blog_id}")
            raise ValueError("Invalid blog ID format")
        collection = db_client["centerofexcellence"]["blogs"]
        result = await collection.delete_one({"_id": ObjectId(blog_id)})
        logger.info(f"Delete result for _id {blog_id}: {result.deleted_count} deleted")
        return result
    except ValueError as ve:
        logger.error(f"Validation error in delete_blog: {str(ve)}")
        raise
    except Exception as e:
        logger.error(f"Error deleting blog with _id {blog_id}: {str(e)}", exc_info=True)
        raise Exception(f"Error deleting blog: {str(e)}")

async def modify_blog(blog_id: str, update_data: dict):
    try:
        if not ObjectId.is_valid(blog_id):
            logger.error(f"Invalid blog ID format: {blog_id}")
            raise ValueError("Invalid blog ID format")
        if "authorId" in update_data and update_data["authorId"] is not None:
            try:
                ObjectId(update_data["authorId"])
            except Exception:
                logger.error(f"Invalid authorId in update: {update_data['authorId']}")
                raise ValueError("authorId must be a valid MongoDB ObjectId")
        if "status" in update_data and update_data["status"] not in ["pending", "accepted", "rejected"]:
            logger.error(f"Invalid status in update: {update_data['status']}")
            raise ValueError("status must be one of: pending, accepted, rejected")
        update_data["updated_at"] = datetime.now(IST)
        logger.info(f"Updating blog with _id: {blog_id} with data: {update_data}")
        collection = db_client["centerofexcellence"]["blogs"]
        result = await collection.update_one(
            {"_id": ObjectId(blog_id)},
            {"$set": update_data}
        )
        logger.info(f"Update result: {result.matched_count} matched, {result.modified_count} modified")
        return result
    except ValueError as ve:
        logger.error(f"Validation error in modify_blog: {str(ve)}")
        raise
    except Exception as e:
        logger.error(f"Error updating blog with _id {blog_id}: {str(e)}", exc_info=True)
        raise Exception(f"Error updating blog: {str(e)}")