import requests
import random
import codecs
import time
import json
from git import Repo

curr_gw = 18

prev_gw = curr_gw - 1

url_current_gw_result = "https://mrbui95.github.io/amvn/data/c1/result/" + str(prev_gw) + ".json"
response = requests.get(url_current_gw_result)

gw_result = response.json()

# print(last_rank)

data = {}

if (curr_gw == 17 or curr_gw == 36):
    response = requests.get("https://mrbui95.github.io/amvn/data/c1/rank/" + str(prev_gw) + ".json")
    last_rank = response.json()
    for i in range(1,5):
        group_rank = last_rank[str(i)]
        print('-----------' + str(i) + '---------')
        # print(group_rank)

        list = []
        for u in group_rank:
            usr = group_rank[u]
            usr['id'] = u
            list.append(usr)
        
        slist = sorted(list, key = lambda u: (-int(u['point']), -int(u['gd'])))

        print(slist)

        quarter_final = {}
        qf1 = []
        qf1.append(slist[0]['id'])
        qf1.append(slist[7]['id'])
        quarter_final['1'] = qf1

        qf2 = []
        qf2.append(slist[1]['id'])
        qf2.append(slist[6]['id'])
        quarter_final['2'] = qf2

        qf3 = []
        qf3.append(slist[2]['id'])
        qf3.append(slist[5]['id'])
        quarter_final['3'] = qf3

        qf4 = []
        qf4.append(slist[3]['id'])
        qf4.append(slist[4]['id'])
        quarter_final['4'] = qf4

        data[str(i)] = quarter_final

        print('-----------END_' + str(i) + '---------')
elif (curr_gw == 18 or curr_gw == 37):
    response = requests.get("https://mrbui95.github.io/amvn/data/c1/final_" + str(prev_gw) + ".json")
    last_rank = response.json()
    # print(last_rank)
    
    for i in range(1,5):
        semi_final = {}
        winner = []
        qf = last_rank[str(i)]
        for j in range(1,5):
            match = qf[str(j)]
            u1 = match[0]
            u2 = match[1]
            u1_point = gw_result[str(u1)]['entry_history']['points'] - gw_result[str(u1)]['entry_history']['event_transfers_cost']
            u2_point = gw_result[str(u2)]['entry_history']['points'] - gw_result[str(u2)]['entry_history']['event_transfers_cost']
            print(u1, u2, u1_point, u2_point)
            if (u1_point > u2_point):
                winner.append(u1)
            elif (u1_point < u2_point):
                winner.append(u2)
            else:
                winner.append(u1)

        print(winner)
        sf1 = []
        sf1.append(winner[0])
        sf1.append(winner[3])
        semi_final['1'] = sf1
        sf2 = []
        sf2.append(winner[1])
        sf2.append(winner[2])
        semi_final['2'] = sf2
        data[str(i)] = semi_final

elif  (curr_gw == 19 or curr_gw == 38):
    response = requests.get("https://mrbui95.github.io/amvn/data/c1/final_" + str(prev_gw) + ".json")
    last_rank = response.json()

    for i in range(1,5):
        final = {}
        winner = []
        loser = []
        qf = last_rank[str(i)]
        for j in range(1,3):
            match = qf[str(j)]
            u1 = match[0]
            u2 = match[1]
            u1_point = gw_result[str(u1)]['entry_history']['points'] - gw_result[str(u1)]['entry_history']['event_transfers_cost']
            u2_point = gw_result[str(u2)]['entry_history']['points'] - gw_result[str(u2)]['entry_history']['event_transfers_cost']
            print(u1, u2, u1_point, u2_point)
            if (u1_point > u2_point):
                winner.append(u1)
                loser.append(u2)
            elif (u1_point < u2_point):
                winner.append(u2)
                loser.append(u1)
            else:
                winner.append(u1)
                loser.append(u2)

        print(winner)
        fn = []
        fn.append(winner[0])
        fn.append(winner[1])
        final['1'] = fn
        fn34 = []
        fn34.append(loser[0])
        fn34.append(loser[1])
        final['2'] = fn34
        data[str(i)] = final




    
print(data)

fileName = 'F:\\Study\\Github\\mrbui95.github.io\\amvn\\data\\c1\\final_' + str(curr_gw) + '.json'
file1 = codecs.open(fileName, 'w', 'utf8')
file1.write(json.dumps(data))
file1.close()

from git import Repo

repo_dir = 'F:\\Study\\Github\\mrbui95.github.io'
repo = Repo(repo_dir)
file_list = [
    fileName
]
commit_message = 'Create fixture period 2 - ' + str(time.time())
repo.index.add(file_list)
repo.index.commit(commit_message)
origin = repo.remote('origin')
origin.push()

