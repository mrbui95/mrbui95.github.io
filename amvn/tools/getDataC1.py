import requests
import codecs
import json
import time

response = requests.get('https://mrbui95.github.io/amvn/data/user_c1.json')

print(response.json())

listTeam = response.json()['league']

for currentGw in range (1, 2):
    data={}
    headers = {'x-requested-with':'https://fantasy.premierleague.com', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'}


    for uid in listTeam:
        url = 'https://fantasy.premierleague.com/api/entry/' + uid + '/event/' + str(currentGw) + '/picks/'
        print('-------------' + uid + '----------------')
        print(url)
        response = requests.get(url)

        data[uid] = response.json()
        print('-------------' + uid + '----------------')


    print(json.dumps(data))



    fileName = 'F:\\Study\\Github\\mrbui95.github.io\\amvn\\data\\c1\\result\\' + str(currentGw) + '.json'
    file1 = codecs.open(fileName, 'w', 'utf8')
    file1.write(json.dumps(data))








    from git import Repo

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