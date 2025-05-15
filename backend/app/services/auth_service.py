from app.password import verify_password
from app.services.user_service import get_user_by_id

async def authenticate_user(id: str, password: str):
    user = await get_user_by_id
    if not user or not verify_password(password, user["password"]):
        return False
    return user