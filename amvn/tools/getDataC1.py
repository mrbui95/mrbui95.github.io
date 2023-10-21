import requests
import codecs
import json
import time
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


data={}
headers = {'x-requested-with':'https://fantasy.premierleague.com', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'}
for uid in listTeam:
    url = 'https://fantasy.premierleague.com/api/entry/' + uid + '/event/' + str(current_gw) + '/picks/'
    print('-------------' + uid + '----------------')
    print(url)
    response = requests.get(url)
    data[uid] = response.json()
    print('-------------' + uid + '----------------')
print(json.dumps(data))
fileName = 'F:\\Study\\Github\\mrbui95.github.io\\amvn\\data\\c1\\result\\' + str(current_gw) + '.json'
file1 = codecs.open(fileName, 'w', 'utf8')
file1.write(json.dumps(data))
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