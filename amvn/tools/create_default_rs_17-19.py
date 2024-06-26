import requests
import random
import codecs
import time
import json
from git import Repo

response = requests.get('https://mrbui95.github.io/amvn/data/u_info.json')
list_team = response.json()

#print(list_team)


gw_data = {}

for team in list_team.keys():
    print(team)
    gw_data[str(team)] = {
        "entry_history" : {
            "points": 0,
            "event_transfers_cost": 0
        }     
    }


file_list = []

for i in range (36,39):
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