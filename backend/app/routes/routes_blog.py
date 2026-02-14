from fastapi import APIRouter, HTTPException, Request
from typing import List
from pydantic import BaseModel
from app.services.blog_service import *
from app.models.blog_model import Blog, BlogUpdate

router = APIRouter(prefix="/blogs", tags=["blogs"])


class DeleteResponse(BaseModel):
    message: str


@router.post("/", response_model=Blog)
async def create_blog_route(blog: Blog):
    inserted_blog = await create_blog(blog.dict(by_alias=True))
    return Blog.parse_obj(inserted_blog)


@router.get("/", response_model=List[Blog])
async def get_all_blogs_route():
    blogs = await get_all_blogs()
    return [Blog.parse_obj(blog) for blog in blogs]


@router.get("/{blog_id}", response_model=Blog)
async def get_blog(blog_id: str):
    blog = await get_blog_by_id(blog_id)
    if not blog:
        raise HTTPException(status_code=404)
    return Blog.parse_obj(blog)


@router.delete("/{blog_id}", response_model=DeleteResponse)
async def delete_blog_route(blog_id: str):
    result = await delete_blog(blog_id)
    return {"message": "Blog deleted"}


@router.patch("/{blog_id}", response_model=Blog)
async def modify_blog_route(blog_id: str, update_data: BlogUpdate):
    result = await modify_blog(blog_id, update_data.dict(exclude_unset=True))
    updated = await get_blog_by_id(blog_id)
    return Blog.parse_obj(updated)
