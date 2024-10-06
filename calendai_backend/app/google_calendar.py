import datetime
import os.path


from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from datetime import datetime, timezone

SCOPES = ["https://www.googleapis.com/auth/calendar"]

def get_credentials():
    flow = InstalledAppFlow.from_client_secrets_file(
        "C:/Users/chuya/Documents/Projects/calendAI/calendai_backend/app/hello.json", SCOPES
    )
    creds = None    
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json",SCOPES)
        
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            print(os.path.abspath(__file__))
            flow = InstalledAppFlow.from_client_secrets_file(
                "C:/Users/chuya/Documents/Projects/calendAI/calendai_backend/app/hello.json", SCOPES
            )
        creds = flow.run_local_server(port=0)
    with open("token.json", "w") as token:
        token.write(creds.to_json())
    return creds

def create_event(service, event : any):
    event = {
        'summary': event.task,
        'location': 'Gainesville, Florida',
        'start': {
            'dateTime': event.start,
            'timezone': 'America/New_York',
        },
        'end':{
            'dateTime': event.end,
            'timeZone': 'America/New_York',
        }
    }
    created_event = service.events().insert(calendarId="primary", body= event).execute()
    print(f"Event Created: {created_event.get('htmlLink')}")
    
def get_events(service,start_time: datetime, end_time : datetime):
    start_time_rfc = start_time.astimezone(timezone.utc).isoformat()
    end_time_rfc = end_time.astimezone(timezone.utc).isoformat()
    events_result = service.events().list(calendarId='primary',
                                          timeMin=start_time_rfc,
                                          timeMax=end_time_rfc,
                                          singleEvents=True,
                                          orderBy='startTime').execute()
    events = events_result.get('items', [])
    
    print(f'Number of events: {len(events)}')
if __name__=="__main__":
    creds = get_credentials()
    service = build("calendar", "v3", credentials=creds)
    
    create_event(service)