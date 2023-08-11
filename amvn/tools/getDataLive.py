import requests
import codecs
import time
import json
from git import Repo

uid = 417635

url_curr_gw = 'https://fantasy.premierleague.com/api/entry/' + str(uid) + '/'
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


# url_live = 'https://fantasy.premierleague.com/api/event/' + str(currentGw) + '/live/'
# reponse_live = requests.get(url_live)
# data_live = reponse_live.json()

# url = 'https://fantasy.premierleague.com/api/entry/' + uid + '/event/' + str(currentGw) + '/picks/'
# print('-------------' + uid + '----------------')
# print(url)
# response = requests.get(url)
# udata = response.json()
# print(udata)
# picks = udata['picks']
# currentPoint = 0
# for pick in picks:
#     position = pick['position']
#     if position < 12:
#         element = pick['element']
#         playerData = data_live['elements'][element - 1]
#         explain = playerData['explain']
#         totalMinsPlay = 0
#         for gw in explain:
#             for stat in gw['stats']:
#                 if (stat['identifier'] == 'minutes'):
#                     totalMinsPlay += stat['value']
#                 currentPoint += stat['points']
#         if totalMinsPlay == 0:
#             print('player' + str(element - 1) + ' not play')
    

# print(currentPoint)