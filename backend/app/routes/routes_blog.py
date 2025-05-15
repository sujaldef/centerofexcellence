from fastapi import APIRouter, HTTPException
from app.services.blog_service import create_blog, get_blog_by_id, delete_blog, modify_blog, get_all_blogs
from app.models.blog_model import Blog, BlogUpdate
from bson.objectid import ObjectId
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/blogs", tags=["blogs"])

class DeleteResponse(BaseModel):
    message: str

@router.post("/", response_model=Blog)
async def create_blog_route(blog: Blog):
    try:
        inserted_blog = await create_blog(blog.dict(by_alias=True))
        if not inserted_blog:
            raise HTTPException(status_code=500, detail="Failed to retrieve inserted blog")
        return Blog.parse_obj(inserted_blog)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating blog: {str(e)}")

@router.get("/{blog_id}", response_model=Blog)
async def get_blog(blog_id: str):
    try:
        blog = await get_blog_by_id(blog_id)
        if blog is None:
            raise HTTPException(status_code=404, detail="Blog not found")
        return Blog.parse_obj(blog)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving blog: {str(e)}")

@router.get("/", response_model=List[Blog])
async def get_all_blogs_route():
    try:
        blogs = await get_all_blogs()
        return [Blog.parse_obj(blog) for blog in blogs]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving blogs: {str(e)}")

@router.delete("/{blog_id}", response_model=DeleteResponse)
async def delete_blog_route(blog_id: str):
    try:
        result = await delete_blog(blog_id)
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Blog not found")
        return {"message": "Blog deleted"}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting blog: {str(e)}")

@router.patch("/{blog_id}", response_model=Blog)
async def modify_blog_route(blog_id: str, update_data: BlogUpdate):
    update_dict = update_data.dict(exclude_unset=True)
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields provided for update")
    
    result = await modify_blog(blog_id, update_dict)
    if not result or result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")

    updated_blog = await get_blog_by_id(blog_id)
    if not updated_blog:
        raise HTTPException(status_code=404, detail="Updated blog not found")

    return Blog.parse_obj(updated_blog)