import requests
import codecs
import time
import json
from git import Repo

current_gw = 7

response = requests.get("https://mrbui95.github.io/amvn23/data/c1/group_period1_1.json")
list_team = response.json()
print(list_team)

url_current_gw_result = "https://mrbui95.github.io/amvn23/data/c1/result/" + str(current_gw) + ".json"
response = requests.get(url_current_gw_result)

gw_result = response.json()



def get_rank():
    rank = {}
    for i in range(1,9):
        group = list_team[str(i)]
        print(group)
        team = {}
        group_rank = {}
        for teamId in group:
            print(teamId)
            team['id'] = teamId
            gw_point = gw_result[str(teamId)]['entry_history']['points'] - gw_result[str(teamId)]['entry_history']['event_transfers_cost']
            team['gw_point'] = gw_point
            total_point = gw_result[str(teamId)]['entry_history']['total_points']
            team['point'] = total_point
            team_cost = gw_result[str(teamId)]['entry_history']['bank'] + gw_result[str(teamId)]['entry_history']['value']
            team['gd'] = team_cost
            group_rank[teamId] = team
            team = {}
        
        print(group_rank)
        rank[str(i)] = group_rank

    return rank

    
live_rank = get_rank()
# print(live_rank)
    
fileName = 'F:\\Study\\Github\\mrbui95.github.io\\fpl\\data\\c1\\rank\\' + str(current_gw) + '.json'
file1 = codecs.open(fileName, 'w', 'utf8')
file1.write(json.dumps(live_rank))


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
