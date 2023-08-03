import requests
import random
import codecs
import json
import time

response = requests.get('https://mrbui95.github.io/fpl/data/user_c1.json')

listTeam = response.json()['league']

stage = 1

# Chia bảng
random.shuffle(listTeam)

teamInGroup = 8

data={}
group = []

i = 0
groupIndex = 1
for team in listTeam:
    i += 1
    group.append(team)
    if i % teamInGroup == 0:
        data[groupIndex] = group
        groupIndex += 1
        group = []
        i = 0

print(data)

fileName = 'F:\\Study\\Github\\mrbui95.github.io\\fpl\\data\\c1\\group_period1_' + str(stage) + '.json'
file1 = codecs.open(fileName, 'w', 'utf8')
file1.write(json.dumps(data))



from git import Repo

repo_dir = 'F:\\Study\\Github\\mrbui95.github.io'
repo = Repo(repo_dir)
file_list = [
    fileName
]
commit_message = 'Split group and create fixture - ' + str(time.time())
repo.index.add(file_list)
repo.index.commit(commit_message)
origin = repo.remote('origin')
origin.push()
