import requests
import random
import codecs
import time
import json
from git import Repo

stage = 1

response = requests.get('https://mrbui95.github.io/amvn/data/c1/group_period' + str(stage) + '_1.json')
list_team = response.json()

rank = {
    "1": {},
    "2": {},
    "3": {},
    "4": {}
}


gw_data = {}

for i in range (1,5):
    lteam = []
    lmatch = list_team[str(i)][0]
    for match in lmatch:
        lteam.append(match[0])
        lteam.append(match[1])
    print(lteam)
    for team in lteam:
        u = {
            "point": 0,
            "win": 0,
            "lose": 0,
            "draw": 0,
            "gd": 0,
        }
        rank[str(i)][str(team)] = u
        gw_data[str(team)] = {
            "entry_history" : {
                "points": 0,
                "event_transfers_cost": 0
            }     
        }

print(rank)
print(gw_data)

file_list = []
        
for i in range (9,17):
    fileName = 'F:\\Study\\Github\\mrbui95.github.io\\amvn\\data\\c1\\rank\\' + str(i) + '.json'
    file_list.append(fileName)
    file = codecs.open(fileName, 'w', 'utf8')
    file.write(json.dumps(rank))
    file.close()

    fileName2 = 'F:\\Study\\Github\\mrbui95.github.io\\amvn\\data\\c1\\result\\' + str(i) + '.json'
    file_list.append(fileName2)
    file1 = codecs.open(fileName2, 'w', 'utf8')
    file1.write(json.dumps(gw_data))
    file1.close()



from git import Repo

repo_dir = 'F:\\Study\\Github\\mrbui95.github.io'
repo = Repo(repo_dir)
commit_message = 'Update rank - ' + str(time.time())
repo.index.add(file_list)
repo.index.commit(commit_message)
origin = repo.remote('origin')
origin.push()



