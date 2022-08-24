import requests


def get(endpoint):

    r = requests.get(url=endpoint)
    data = r.json()
    return data


print(get('http://localhost:8000/auth/logout'))