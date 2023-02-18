import requests
import json


token = input("Enter your token to send data:")

headers = {'Authorization' : 'Token {}'.format(token),"Content-Type": "application/json; charset=utf-8"}

notes_arr = []

def post_notes_data(data, endpoint):
    r = requests.post(url = endpoint, headers=headers, json=data)
    return r.json()

def post(data, endpoint):
    r = requests.post(
        url=endpoint, 
        headers=headers, 
        json=data
    )
    print(r.json())

#query = input("Enter your query:")
#print(post({"query":query,"response_from_ai":""}, "http://localhost:8000/notesapi/"))

data_arr = []

for i in range(3):
    query = input("Enter your query:")
    response_from_ai = input("Enter response:")
    print('\n')
    data_arr.append({"query":query, "response_from_ai":response_from_ai})


structure = {"title":"This is the structure of the data", "data":data_arr}

print(post(structure, "http://localhost:8000/notesapi/"))
