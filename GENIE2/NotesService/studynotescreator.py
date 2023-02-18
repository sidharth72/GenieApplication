import openai
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv('OPEN_API_KEY')

openai.api_key = API_KEY


def create_study_notes(query,start):
    complete_query = query + " " + start
    response = openai.Completion.create(
    model="text-davinci-002",
    prompt= complete_query,
    temperature=0.4,
    max_tokens=1800,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    
    return start + " " + response['choices'][0]['text']

