import json
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'chats'

def lambda_handler(event, context):
    # Extract the body from the incoming request from API Gateway
    body = event.get('body', '[]')  # Default to an empty list if 'body' is not found

    # Parse the JSON formatted string into a Python list
    try:
        data_list = json.loads(body)
    except json.JSONDecodeError:
        return {'statusCode': 400, 'body': json.dumps('Invalid JSON format')}

    # Validate that the data is indeed a list
    if not isinstance(data_list, list):
        return {'statusCode': 400, 'body': json.dumps('Expected a list of objects')}

    # Create a DynamoDB table object
    table = dynamodb.Table(table_name)

    # Iterate over each object in the list and store it in the DynamoDB table
    for item in data_list:
        try:
            # Insert item into the table
            table.put_item(Item=item)
        except Exception as e:
            return {'statusCode': 500, 'body': json.dumps(f'Error saving item: {str(e)}')}

    # Return a success response
    return {'statusCode': 200, 'body': json.dumps('Data saved to DynamoDB')}
