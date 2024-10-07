from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os 
from ai import*
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
    start: str
    end: str
     
# In-memory storage for todos (replace with database in production)

Memory = []

creds = get_credentials()
service = build("calendar", "v3", credentials=creds)
def format_datetime(iso_string):
    # Parse the ISO format string
    dt = datetime.fromisoformat(iso_string.replace('Z', '+00:00'))
    
    # Format the datetime as desired
    return dt.strftime("%Y-%m-%d %I:%M %p") 

@app.get("/", tags=["root"])
async def root() -> dict:
    return {"message": "Welcome to Calendai"}

@app.get("/event/get_events", tags=["events"])
async def get_events():
    try:
        events = get_events_from_calendar(service, datetime.now(), datetime.now() + timedelta(days=7))
        simplified_events = [{
            'title': event['summary'],
            'date': format_datetime(event['end']['dateTime']),
            'description': "Task"
        } for event in events]
        return simplified_events
    except Exception as e:
        print(f"Error in get_events: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
 
@app.post("/event/add_event", tags=["events"])
async def add_event(event: eventItem):

    content = event.summary
    start_date = event.start
    end_date = event.end
    Task_Maker = task_creator(content,end_date,start_date)
      
    Task_Maker.make_tasks()
    Task_Maker.make_list()
    Task_Maker.calculate_time()
    Task_Maker.place_events()
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