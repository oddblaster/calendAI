import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ADHD_Database')


