from email import header
import requests
import json

endpoint = "http://localhost:8000/notesapi/"

def get(endpoint):

    r = requests.get(url=endpoint)
    data = r.json()
    return data



headers = {"Content-Type": "application/json; charset=utf-8"}

def post(data, endpoint):
    r = requests.post(url=endpoint, headers=headers, json=data)
    data_ = json.loads(r.text)
    return data_['response_from_ai']

q = input("Enter Your Query:")


def put(data):
    r = requests.put(url=endpoint+"71/", headers=headers, json=data)
    return json.loads(r.text)
#print(put({"query":"Who is ELON MUSK IN THE WORLD","response_from_ai":"He is a great guy"}))


def delete():
    r = requests.delete(url=endpoint+"69/")
    return "Deleted"

#print(delete())
#print(post({"query":q,"response_from_ai":""}))
#print(put({"query":q,"response_from_ai":""}))


print(get(endpoint))