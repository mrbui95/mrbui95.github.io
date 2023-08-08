import requests
import codecs
import time
import json
from git import Repo

current_gw = 1

rank = {}

if (current_gw == 1):
    response = requests.get('https://mrbui95.github.io/amvn/data/c1/group_period1_1.json')

    list_team = response.json()

    for i in range(1,9):
        group = list_team[str(i)]
        print(group)
        team = {}
        group_rank = {}
        for teamId in group:
            print(teamId)
            team['id'] = teamId
            gw_point = 0
            team['gw_point'] = gw_point
            total_point = 0
            team['point'] = total_point
            team_cost = 0
            team['gd'] = team_cost
            group_rank[teamId] = team
            team = {}
        
        print(group_rank)
        rank[str(i)] = group_rank

    print(rank)
else:
    print(current_gw)

fileName = 'F:\\Study\\Github\\mrbui95.github.io\\amvn\\data\\c1\\rank\\' + str(current_gw) + '.json'
file1 = codecs.open(fileName, 'w', 'utf8')
file1.write(json.dumps(rank))

file1.close()


from git import Repo

repo_dir = 'F:\\Study\\Github\\mrbui95.github.io'
repo = Repo(repo_dir)
file_list = [
    fileName
]
commit_message = 'Update rank - ' + str(time.time())
repo.index.add(file_list)
repo.index.commit(commit_message)
origin = repo.remote('origin')
origin.push()