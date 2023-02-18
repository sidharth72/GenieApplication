import requests
import json


token = input("Enter token:")
headers = {'Authorization' : 'Token {}'.format(token),"Content-Type": "application/json; charset=utf-8"}


def put(data, endpoint):
    r = requests.put(url=endpoint, headers=headers, json=data)
    print(r.json())


print(put({"query":"What is Greate attractor?","response_from_ai":""}, "http://localhost:8000/notesapi/104/"))

