import requests
import random
import codecs
import json
import time

response = requests.get('https://mrbui95.github.io/amvn/data/user_c1.json')

listTeam = response.json()['league']

stage = 2   


def make_fixture(teams):
    if len(teams) % 2:
        teams.append('Day off')
    n = len(teams)
    matchs = []
    fixtures = []
    for fixture in range(0, n - 1):
        for i in range(n // 2):
            matchs.append((teams[i], teams[n - 1 - i]))
        teams.insert(1, teams.pop())
        fixtures.insert(len(fixtures) // 2, matchs)
        matchs = []
    
    return fixtures


def createFixture (groupData):
    listTeam = []
    for data in groupData:
        listTeam.append(groupData[data])

    fixture_result = make_fixture(listTeam)
    return fixture_result


# Chia bảng
random.shuffle(listTeam)

data={}
group = {}

teamInGroup = 8

i = 0
groupIndex = 1
for team in listTeam:
    i += 1
    group[i] = team
    if i % teamInGroup == 0:
        data[groupIndex] = group
        groupIndex += 1
        group = {}
        i = 0




# Tạo lịch thi đấu
result = {}
index = 0
for group in data:
    index += 1
    groupData = data[group]
    fixture = createFixture(groupData)
    result[index] = fixture

print(json.dumps(result))


fileName = 'F:\\Study\\Github\\mrbui95.github.io\\amvn\\data\\c1\\group_' + str(stage) + '.json'
file1 = codecs.open(fileName, 'w', 'utf8')
file1.write(json.dumps(result))



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

