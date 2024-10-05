import boto3
from boto3.dynamodb.conditions import Key, Attr

# Initialize a DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

# Reference a specific table
table = dynamodb.Table('ADHD_Database')

# # Example: Get an item from the table
# response = table.get_item(
#     Key={
#         'PrimaryKey': 'Value'
#     }
# )

# # CRUD Operations

# # put an item into database
# item = {
#     'userid': 'chuyang001',
#     'end_time': '2024-10-11T05:00:00-10:00',
#     'firstname': 'Chuyang',
#     'lastname': 'Zhang',
#     'location': 'America/Los_Angeles',
#     'start_time': '2024-10-11T05:00:00-07:00',
#     'summary': 'EVENT_NAME'
# }

# # get an item
# response = table.get_item(
#     Key={
#         'userid': 'chuyang001',
#         'end_time': '2024-10-11T05:00:00-10:00'
#     }
# )

# item = response.get('Item')
# if item:
#     print(item)
# else:
#     print("Item not found")

# # Update an item if needed
# response = table.update_item(
#     Key={
#         'userid': 'chuyang001',
#         'end_time': '2024-10-11T05:00:00-10:00'
#     },
#     UpdateExpression='SET #summary = :newSummary',
#     ExpressionAttributeNames={
#         '#summary': 'summary'
#     },
#     ExpressionAttributeValues={
#         ':newSummary': 'UPDATED_EVENT'
#     },
#     ReturnValues='UPDATED_NEW'
# )

# # Delete an item
# response = table.delete_item(
#     Key={
#         'userid': 'chuyang001',
#         'end_time': '2024-10-11T05:00:00-10:00'
#     }
# )




