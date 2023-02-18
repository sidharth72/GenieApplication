import openai
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv('OPEN_API_KEY')

openai.api_key = API_KEY


def Text_Engine(query,start, tone=None, language=None, words=None):

    complete_query = query + " " + start + "," + tone + "," + language + "," + words 
    response = openai.Completion.create(
    model="text-davinci-003",
    prompt= complete_query,
    temperature=0.7,
    max_tokens=1000,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    
    return start + " " + response['choices'][0]['text']

