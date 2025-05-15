from fastapi import APIRouter, HTTPException
from app.services.event_service import create_event, get_event_by_id, get_event_by_name, delete_event, modify_event, get_all_events
from app.models.event_model import Event,EventUpdate
from bson.objectid import ObjectId
from pydantic import BaseModel


router = APIRouter(prefix="/events", tags=["events"])

class DeleteResponse(BaseModel):
    message: str

from typing import List

@router.get("/", response_model=List[Event])
async def get_all_events_route():
    try:
        events = await get_all_events()
        return [Event.parse_obj(event) for event in events]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving events: {str(e)}")

@router.post("/", response_model=Event)
async def create_new_event(event: Event):
    try:
        event_data = event.dict(exclude_unset=True)
        created_event_id = await create_event(event_data)
        created_event_data = await get_event_by_id(created_event_id)

        if not created_event_data:
            raise HTTPException(status_code=404, detail="Created event not found")

        created_event_data["_id"] = created_event_id
        return Event.parse_obj(created_event_data)
    
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating event: {str(e)}")

@router.get("/{event_id}", response_model=Event)
async def get_event(event_id: str):
    try:
        if not ObjectId.is_valid(event_id):
            raise HTTPException(status_code=400, detail="Invalid event ID")
        event = await get_event_by_id(event_id)
        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")
        event["_id"] = event_id
        return Event.parse_obj(event)
    
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving event: {str(e)}")

@router.get("/name/{event_name}", response_model=Event)
async def get_event_by_eventname(event_name: str):
    try:
        event = await get_event_by_name(event_name)
        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")
        event_id = event["_id"]
        event["_id"] = event_id
        return Event.parse_obj(event)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving event: {str(e)}")

@router.delete("/{event_id}", response_model=DeleteResponse)
async def delete_event_route(event_id: str):
    try:
        if not ObjectId.is_valid(event_id):
            raise HTTPException(status_code=400, detail="Invalid event ID")
        result = await delete_event(event_id)
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Event not found")
        return {"message": "Event deleted"}
    
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting event: {str(e)}")

@router.patch("/{event_id}", response_model=Event)
async def modify_event_route(event_id: str, update_data: EventUpdate):
    try:
        if not ObjectId.is_valid(event_id):
            raise HTTPException(status_code=400, detail="Invalid event ID")

        update_dict = update_data.dict(exclude_unset=True)
        result = await modify_event(event_id, update_dict)

        if not result or result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Event not found or no fields updated")

        updated_event = await get_event_by_id(event_id)
        if not updated_event:
            raise HTTPException(status_code=404, detail="Updated event not found")
        
        updated_event["_id"] = event_id
        return Event.parse_obj(updated_event)
    
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating event: {str(e)}")
