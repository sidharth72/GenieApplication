import sys
import requests

URL = 'http://localhost:8000/auth/login'
endpoint = "http://localhost:8000/notesapi/"
headers = {"Content-Type": "application/json; charset=utf-8"}

s = requests.Session()

username = input("Enter your username:")
password = input("Enter your password:")

r = s.post(url=URL, headers=headers, json={"username":username,"password":password})
print(r.json())

my_headers = {'Authorization' : 'Token {}'.format(r.json()['token'])}
response = requests.get(endpoint, headers=my_headers)

#print(response.json()[0]['id'])


def ListView(i):
    url = endpoint+str(response.json()[i]['id'])
    query = response.json()[i]['query']

    return {"url":url,"query":query}

def DetailedView(i):
    query = response.json()[i]['query']
    response_from_ai = response.json()[i]['response_from_ai']

    return {"Query":query, "response":response_from_ai}


for i in range(len(response.json())):
    print(ListView(i))

print("\n")

for j in range(len(response.json())):
    print(DetailedView(j))

