from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.routes_user import router as user_router
from app.routes.routes_event import router as event_router
from app.routes.routes_auth import router as auth_router
from app.routes.routes_blog import router as blog_router
from app.routes.routes_event_registration import router as event_registrations
from app.routes.routes_newsletter import router as routes_newsletter
from app.routes.routes_notifications import router as routes_notifications 

app = FastAPI(title="Center of Excellence API")

# ✅ Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5171",
        "http://localhost:5173",
        "http://localhost:5174",
        "https://coe-47billion.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(user_router, tags=["users"])
app.include_router(event_router, tags=["events"])
app.include_router(auth_router, tags=["auth"])
app.include_router(blog_router, tags=["blogs"])
app.include_router(event_registrations, tags=["event_registrations"])
app.include_router(routes_newsletter, tags=["routes_newsletter"])
app.include_router(routes_notifications, tags=["routes_notifications"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
