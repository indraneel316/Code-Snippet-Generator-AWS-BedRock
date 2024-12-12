import boto3
import botocore.config
import json
from datetime import datetime

def code_generate_using_bedrock(code_topic: str) -> str:
    # Updated prompt to ask for only the code and Big-O notation if applicable
    prompt = f"""<s>[INST]Human: {code_topic}
    Generate only the code Under the <code> </code>  . No extra content, no explanations in the response. Ensure the code is syntactically correct and, if applicable, include the Big-O time complexity at the end of the code in a comment. Do not add any additional lines or information.[/INST]
    """


    body = {
        "prompt": prompt,
        "max_gen_len": 2048,  # Set a large token limit
        "temperature": 0.5,
        "top_p": 0.9
    }

    try:
        bedrock = boto3.client("bedrock-runtime", region_name="us-east-1",
                               config=botocore.config.Config(read_timeout=1000, retries={'max_attempts': 3}))
        response = bedrock.invoke_model(body=json.dumps(body), modelId="meta.llama3-70b-instruct-v1:0")

        response_content = response.get('body').read()
        response_data = json.loads(response_content)
        print(response_data)
        code_details = response_data['generation']  # This will contain the generated code snippet
        return code_details
    except Exception as e:
        print(f"Error generating the code snippet: {e}")
        return ""


def lambda_handler(event, context):
    # Parse incoming event
    event = json.loads(event['body'])
    code_topic = event['code_topic']  # Adjusted to receive code generation topic
    print("Code Topic:", code_topic)

    generate_code = code_generate_using_bedrock(code_topic=code_topic)

    if generate_code:
        current_time = datetime.now().strftime('%H%M%S')
        s3_key = f"code-output/{current_time}.txt"
        s3_bucket = 'isd-data--24'
        # Commented out the S3 saving logic
        # save_code_details_s3(s3_key, s3_bucket, generate_code)
    else:
        print("No code snippet was generated")

    return {
        'statusCode': 200,
        'body': json.dumps({
            'generated_code': generate_code
        })
    }
