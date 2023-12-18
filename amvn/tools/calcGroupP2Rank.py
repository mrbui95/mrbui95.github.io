import requests
import codecs
import time
import json
from git import Repo


response = requests.get('https://mrbui95.github.io/amvn/data/user_c1.json')

print(response.json())

listTeam = response.json()['league']


url_curr_gw = 'https://fantasy.premierleague.com/api/entry/2114046/'
response_curr_gw = requests.get(url_curr_gw)
data_curr_gw = response_curr_gw.json()
current_gw = data_curr_gw['current_event']
data = {}
data['current_gw'] = current_gw
fileName = 'F:\\Study\\Github\\mrbui95.github.io\\amvn\\data\\current_gw.json'
file = codecs.open(fileName, 'w', 'utf8')
file.write(json.dumps(data))
file.close()
# curr_gw_sv = 0
curr_gw_sv_response = requests.get('https://mrbui95.github.io/amvn/data/current_gw.json').json()
curr_gw_sv = curr_gw_sv_response['current_gw']
print (current_gw, curr_gw_sv)
if (current_gw != curr_gw_sv ):
    time.sleep(10)
    print('upload git')
    repo_dir = 'F:\\Study\\Github\\mrbui95.github.io'
    repo = Repo(repo_dir)
    file_list = [
        fileName
    ]
    commit_message = 'update current gw - ' + str(time.time())
    repo.index.add(file_list)
    repo.index.commit(commit_message)
    origin = repo.remote('origin')
    origin.push()


#Fix cứng
#current_gw = 1


gw_result={}
headers = {'x-requested-with':'https://fantasy.premierleague.com', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'}
for uid in listTeam:
    url = 'https://fantasy.premierleague.com/api/entry/' + uid + '/event/' + str(current_gw) + '/picks/'
    print('-------------' + uid + '----------------')
    print(url)
    response = requests.get(url)
    gw_result[uid] = response.json()
    print('-------------' + uid + '----------------')
print(json.dumps(gw_result))
fileName = 'F:\\Study\\Github\\mrbui95.github.io\\amvn\\data\\c1\\result\\' + str(current_gw) + '.json'
file1 = codecs.open(fileName, 'w', 'utf8')
file1.write(json.dumps(gw_result))
file1.close()



repo_dir = 'F:\\Study\\Github\\mrbui95.github.io'
repo = Repo(repo_dir)
file_list = [
    fileName
]
commit_message = 'Get Data C1 - ' + str(time.time())
repo.index.add(file_list)
repo.index.commit(commit_message)
origin = repo.remote('origin')
origin.push()


# current_gw = 9

response = requests.get("https://mrbui95.github.io/amvn/data/c1/group_period2_1.json")
list_team = response.json()
print(list_team)

#url_current_gw_result = "https://mrbui95.github.io/amvn/data/c1/result/" + str(current_gw) + ".json"
#response = requests.get(url_current_gw_result)

#gw_result = response.json()



def get_rank():
    last_rank = None
    if (current_gw == 9):
        last_rank = {
            "1": {},
            "2": {},
            "3": {},
            "4": {}
        }
    elif (current_gw <= 16):
        print(str(current_gw))
        prev_gw = current_gw - 1
        response = requests.get("https://mrbui95.github.io/amvn/data/c1/rank/" + str(prev_gw) + ".json")
        last_rank = response.json()
        print(last_rank)


    print(last_rank)

    for k in range(1, 5):
        print('--------------' + str(k) + ',' + str(current_gw - 8) +  '----------------')
        list_match = list_team[str(k)][current_gw - 8]
        print('--------list_match-------------')
        # print(list_match)
        for match in list_match:
            print('--------match------')
            # print(match)
            u1 = match[0]
            u2 = match[1]
            u1_point = gw_result[str(u1)]['entry_history']['points'] - gw_result[str(u1)]['entry_history']['event_transfers_cost']
            u2_point = gw_result[str(u2)]['entry_history']['points'] - gw_result[str(u2)]['entry_history']['event_transfers_cost']
            u1_match_point = 0
            u2_match_point = 0
            u1_game_win = 0
            u2_game_win = 0
            u1_game_lose = 0
            u2_game_lose = 0
            u1_game_draw = 0
            u2_game_draw = 0

            u1_gd = u1_point - u2_point
            u2_gd = u2_point - u1_point

            print(u1, u2, u1_point, u2_point, u1_gd, u2_gd)

            if (u1_point > u2_point):
                u1_match_point = 3
                u1_game_win = 1
                u2_game_lose = 1
            elif (u1_point < u2_point):
                u2_match_point = 3
                u1_game_lose = 1
                u2_game_win = 1
            else:
                u1_match_point = 1
                u2_match_point = 1
                u1_game_draw = 1
                u2_game_draw = 1

            print(str(k))
            # print(last_rank[str(index)])

            u1_result = {}
            u2_result = {}


            try:
                u1_result = last_rank[str(k)][str(u1)]
            except:
                u1_result = {}

            try:
                u2_result = last_rank[str(k)][str(u2)]
            except:
                u2_result = {}

            try:
                point = u1_result['point']
                newPoint = point + u1_match_point
                u1_result['point'] = newPoint
            except:
                u1_result['point'] = u1_match_point
            
            try:
                point = u2_result['point']
                newPoint = point + u2_match_point
                u2_result['point'] = newPoint
            except:
                u2_result['point'] = u2_match_point

            try:
                win = u1_result['win']
                newWin = win + u1_game_win
                u1_result['win'] = newWin
            except:
                u1_result['win'] = u1_game_win

            try:
                win = u2_result['win']
                newWin = win + u2_game_win
                u2_result['win'] = newWin
            except:
                u2_result['win'] = u2_game_win
            
            try:
                lose = u1_result['lose']
                newLose = lose + u1_game_lose
                u1_result['lose'] = newLose
            except:
                u1_result['lose'] = u1_game_lose

            try:
                lose = u2_result['lose']
                newLose = lose + u2_game_lose
                u2_result['lose'] = newLose
            except:
                u2_result['lose'] = u2_game_lose


            try:
                draw = u1_result['draw']
                newDraw = draw + u1_game_draw
                u1_result['draw'] = newDraw
            except:
                u1_result['draw'] = u1_game_draw
              
            try:
                draw = u2_result['draw']
                newDraw = draw + u2_game_draw
                u2_result['draw'] = newDraw
            except:
                u2_result['draw'] = u2_game_draw

            try:
                gd = u1_result['gd']
                newGd = gd + u1_gd
                u1_result['gd'] = newGd
            except:
                u1_result['gd'] = u1_gd

            try:
                gd = u2_result['gd']
                newGd = gd + u2_gd
                u2_result['gd'] = newGd
            except:
                u2_result['gd'] = u2_gd



            last_rank[str(k)][str(u1)] = u1_result
            last_rank[str(k)][str(u2)] = u2_result

        print('--------------END_' + str(k) + '----------------')
        
    return last_rank    

    
live_rank = get_rank()
# print(live_rank)
    
fileName = 'F:\\Study\\Github\\mrbui95.github.io\\amvn\\data\\c1\\rank\\' + str(current_gw) + '.json'
file1 = codecs.open(fileName, 'w', 'utf8')
file1.write(json.dumps(live_rank))
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
