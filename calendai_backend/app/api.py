from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os 

#Imports the modules for data
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

name = os.getenv("Chuyang Zhang", "World")
print(f"Hello {name} from Python")

#Creates an FASTapi application
app = FastAPI()


#application is run locally
origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)




#Definition of Models
class DateTimeZone(BaseModel):
    dateTime: str
    timeZone: str
class eventItem(BaseModel):
    summary: str
    location: str
    start: DateTimeZone
    end: DateTimeZone
     
# In-memory storage for todos (replace with database in production)

Memory = []

    
@app.get("/", tags=["root"])
async def root() -> dict:
    return {"message": "Welcome to Calendai"}

@app.get("/event/get_events", tags=["events"])
async def get_events() -> List[eventItem]:
    return Memory
 
@app.post("/event/add_event", tags=["events"])
async def add_event(event: eventItem) -> dict:
    Memory.append(event)
    return {"message": "Event was successfully added"}

@app.get("/event/get_event/{name}", tags=["event"])
async def get_event(name : str) -> eventItem:
    for event in Memory:
        if event.summary == name:
            return event 
    raise HTTPException(status_code=404,detail=f"Event {name} not found")

@app.put("/event/update_event", tags=["event"], response_model=eventItem)
async def update_event(event_name: str, event: eventItem) -> dict:
    for index, item in enumerate(Memory):
        if item.summary == event_name:
           Memory[index] = event
           return {"message": f"event {event_name} has been updated"}
    raise HTTPException(status_code=404,detail = f"Event {name} not found")
    
@app.delete("/event/delete/{name}", tags=["event"])
async def delete_event(name: str) -> dict:
    for index, event in enumerate(Memory):
        if event.summary == name:
            Memory.pop(index)
            return {"message": f"Event {name} has been deleted successfully"}
    raise HTTPException(status_code=404, response_model= f"Event {name} not found")

@app.get("/event/search", tags=["event"])
async def search_event(keyword: str) -> List[eventItem]:
    matching_events = []
    for event in Memory:
        if keyword.lower() in event.summary.lower():
            matching_events.append(event)
    if not matching_events:
        raise HTTPException(status_code=404, response_model= f"Event {name} not found")
    return matching_events