import requests
import codecs
import time
import json
from git import Repo

response = requests.get('https://mrbui95.github.io/amvn23/data/user_c1.json')

listTeam = response.json()['league']

data = {}

for team in listTeam:
    print(team)
    response = requests.get('https://fantasy.premierleague.com/api/entry/' + team + '/')
    uInfo = response.json()
    data[team] = uInfo



fileName = 'F:\\Study\\Github\\mrbui95.github.io\\amvn23\\data\\u_info.json'
file = codecs.open(fileName, 'w', 'utf8')
file.write(json.dumps(data))

from git import Repo

repo_dir = 'F:\\Study\\Github\\mrbui95.github.io'
repo = Repo(repo_dir)
file_list = [
    fileName
]
commit_message = 'Get User Info - ' + str(time.time())
repo.index.add(file_list)
repo.index.commit(commit_message)
origin = repo.remote('origin')
origin.push()