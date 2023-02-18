from xml.dom import UserDataHandler
import requests

headers = {"Content-Type": "application/json; charset=utf-8"}

URL = "http://localhost:8000/auth"

username = input("Enter your username:")
email = input("Enter your email:")
password = input("Enter your password:")

r = requests.post(url=URL, headers=headers, json={"username":username,"email":email,"password":password})
print(r.json())