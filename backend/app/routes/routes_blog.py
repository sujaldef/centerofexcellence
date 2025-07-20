from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from app.services.blog_service import create_blog, get_blog_by_id, delete_blog, modify_blog, get_all_blogs
from app.models.blog_model import Blog, BlogUpdate
from bson.objectid import ObjectId
from pydantic import BaseModel
from typing import List
import logging

# Set up logging to debug CORS issues
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(redirect_slashes=False)

# Add CORS middleware with explicit logging
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5175", "http://localhost:5175/"],  # Add both with and without trailing slash
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],  # Explicitly allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Log all incoming requests to debug CORS
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    logger.info(f"Headers: {request.headers}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code}")
    logger.info(f"Response headers: {dict(response.headers)}")  # Log response headers
    return response

router = APIRouter(tags=["blogs"], redirect_slashes=False)

class DeleteResponse(BaseModel):
    message: str

@router.post("/blogs/", response_model=Blog)
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

@router.get("/blogs/{blog_id}", response_model=Blog)
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

@router.get("/blogs/", response_model=List[Blog])
async def get_all_blogs_route(request: Request):
    logger.info(f"Received request for {request.url}")
    try:
        blogs = await get_all_blogs()
        return [Blog.parse_obj(blog) for blog in blogs]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving blogs: {str(e)}")

@router.delete("/blogs/{blog_id}", response_model=DeleteResponse)
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

@router.patch("/blogs/{blog_id}", response_model=Blog)
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

app.include_router(router)