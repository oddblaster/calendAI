import json
from textwrap import dedent
from openai import OpenAI
#from fastapi import fastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from google_calendar import *
from datetime import *
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
ORG_ID = os.getenv('ORG_ID')
PROJECT_ID = os.getenv('PROJECT_ID')

client = OpenAI(
    api_key=OPENAI_API_KEY
)

MODEL = "gpt-4o"

#content = ""
#@app.post("/task/create",tags=["tasks"])
#def add_task_content(input: str):
#    content = input
class task_creator():
    def __init__(self,content,end_date, start_date):
        self.content = content
        self.tasks = []
        self.start_date = start_date
        self.end_date = end_date
        self.task_prompt = '''
        You are given a string which would be the assignment. This is NOT a task.
        
        Read the assignment. Research about the assignment. Learn what is required to complete the assignment.List at least 10
        tasks to be able to complete this assignment.
        
        Analyze your research. Split the assignment into smaller tasks that will be able to complete the assignment. Make
        at least 5 smaller tasks to complete this assignment. Make the word count for each task at most 10 words.   
        
        Keep it concise and easy to read to be put into a calendar.
        
        Return a JSON format with the following format:
            steps: This would contain the list of tasks needed to complete the main tasks
        
        '''
        self.scheduler_prompt = '''
            Take the task and place it at a reasonable time during the day that is provided by the user content.
            
            You are to parse the JSON format and read the properties of the JSON formatted string.
            The JSON format should contain the following format:

                The task: The name which is used to put on the calendar summary
                duration: The time it takes to complete this task
                
            Analyze and pick a random time between 10am and 8pm for the task.      
            
            Format the start time and end time in isoformat with the date included to fit into the google calendar.
            Return in JSON format:
                task: The task that was provided
                start_date: The starting time or date of the task
                end_date: The ending  time or date of the task
        '''
        self.analyze_task_prompt = '''
            Research about the task, Analyze the difficulty of the task.
            
            Predict how long the task it would take based on your research.
            
            Return in JSON format in the following format:
                task: The task that was given
                duration: How long the task was given
                difficulty: How difficult the task is from a score of 0 to 100 
        '''

    class taskSplitter(BaseModel):
        class Task(BaseModel):
            task: str
        steps: list[Task]
    
    class taskTime(BaseModel):
        task:str
        duration:int
        difficulty: int
        
    class taskEvent(BaseModel,arbitrary_types_allowed=True):
        task: str
        start: str
        end: str
    
    def get_dates(self):
        print(self.start_date)
        print(self.end_date)
        start_date = datetime.fromisoformat(self.start_date)
        end_date = datetime.fromisoformat(self.end_date)
        
        start_date = start_date.date()
        end_date = end_date.date()
        
        dates = []
        current_date = start_date
        for n in range((end_date - start_date).days + 1):
            dates.append(start_date + timedelta(days=n))
        
        print(dates)
        return dates

    def make_tasks(self):
        
        completion = client.beta.chat.completions.parse(
            model=MODEL,
            messages=[
                {"role": "system", "content": dedent(self.task_prompt)},
                {"role": "user", "content": self.content},
            ],
            response_format=self.taskSplitter,
        )
        self.tasks = completion.choices[0].message.content
        print(self.tasks)
        return completion.choices[0].message.content
    
    def make_list(self):

        temp_json = json.loads(self.tasks)
        
        self.tasks = []
        for task in temp_json['steps']:
            if task != None:
                self.tasks.append(task)
                
    def calculate_time(self):
        events_with_time = []
        step = 1
        for task in self.tasks:
            json_string = json.dumps(task)
            
            if json_string is not None:
                completion = client.beta.chat.completions.parse(
                    model=MODEL,
                    messages=[
                        {"role": "system", "content": self.analyze_task_prompt},
                        {"role": "user", "content": json_string},
                    ],
                    response_format=self.taskTime
                )
                task = json.dumps(completion.choices[0].message.content)
                task = json.loads(completion.choices[0].message.content)
                events_with_time.append(task)
                print(task)
        self.tasks = events_with_time
            
    def place_events(self):
        events = []
        creds = get_credentials()
        service = build("calendar", "v3", credentials=creds)
        
        dates = self.get_dates()
        task_index = 0
        total_tasks = len(self.tasks)

        for date in dates:
            daily_complexity = 0
            while task_index < total_tasks and daily_complexity < 100:
                json_task = self.tasks[task_index]
                user_prompt = (f"task: {json_task['task']}\n"
                               f"duration_of_task: {json_task['duration']}\n"
                               f"date: {date.isoformat()}")
                
                try:
                    completion = client.beta.chat.completions.parse(
                        model=MODEL,
                        messages=[
                            {"role": "system", "content": self.scheduler_prompt},
                            {"role": "user", "content": user_prompt},
                        ],
                        response_format= self.taskEvent
                    )
                    event_data = json.loads(completion.choices[0].message.content)
                    print(event_data)
                    
                    if all(key in event_data for key in ['task', 'start', 'end']):
                        start_key, end_key = 'start', 'end'
                    elif all(key in event_data for key in ['task', 'start_date', 'end_date']):
                        start_key, end_key = 'start_date', 'end_date'
                    else:
                        raise ValueError("The API response is missing required fields")

                    start_time = datetime.fromisoformat(event_data[start_key]).replace(tzinfo=timezone.utc)
                    end_time = datetime.fromisoformat(event_data[end_key]).replace(tzinfo=timezone.utc)

                    event = {
                        'summary': event_data['task'],
                        'start': {'dateTime': start_time.isoformat(), 'timeZone': 'America/New_York'},
                        'end': {'dateTime': end_time.isoformat(), 'timeZone': 'America/New_York'},
                        'description': 'Created by CalendAI'
                    }

                    created_event = service.events().insert(
                        calendarId='73379f39f32bbc820ff6c1fa45f06d9208d84b8eedd7711e894370dcb991bd20@group.calendar.google.com', 
                        body=event
                    ).execute()
                    
                    events.append(created_event)
                    print(f'Event created: {created_event.get("htmlLink")}')
                    
                    daily_complexity += json_task.get('difficulty', 0)
                    task_index += 1
                
                except HttpError as error:
                    print(f'An error occurred: {error}')
                    break  # Move to the next day if there's an error

        return events
            

    
    

    
    
