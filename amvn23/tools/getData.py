import requests
import codecs
import json

currentGw = '35'

data={}
headers = {'x-requested-with':'https://fantasy.premierleague.com', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'}

response = requests.get('https://mrbui95.github.io/fpl/data/user.json')

print(response.json())

listTeam = response.json()


url_live = 'https://fantasy.premierleague.com/api/event/35/live/'
reponse_live = requests.get(url_live)
data_live = reponse_live.json()



for key in listTeam:
    value = listTeam[key]
    print(value)
    # teamJson = json.loads(value)
    for id in value:
        uid = value[id]
        url = 'https://fantasy.premierleague.com/api/entry/' + uid + '/event/' + currentGw + '/picks/'
        print('-------------' + uid + '----------------')
        print(url)
        response = requests.get(url)
        udata = response.json()
        print(udata)
        picks = udata['picks']
        currentPoint = 0
        for pick in picks:
            position = pick['position']
            if position < 12:
                element = pick['element']
                playerData = data_live['elements'][element - 1]
                explain = playerData['explain']
                totalMinsPlay = 0
                for gw in explain:
                    for stat in gw['stats']:
                        if (stat['identifier'] == 'minutes'):
                            totalMinsPlay += stat['value']
                        currentPoint += stat['points']
                if totalMinsPlay == 0:
                    print('player' + str(element - 1) + ' not play')
            
        
        print(currentPoint)

        # data[uid] = response.json()
        print('-------------' + uid + '----------------')


print(json.dumps(data))



fileName = 'F:\\Study\\Github\\mrbui95.github.io\\fpl\\data\\resutl_gw' + currentGw + '.json'
file1 = codecs.open(fileName, 'w', 'utf8')
file1.write(json.dumps(data))











# from git import Repo

# repo_dir = 'F:\\Study\\Github\\mrbui95.github.io'
# repo = Repo(repo_dir)
# file_list = [
#     fileName
# ]
# commit_message = 'Add simple regression analysis'
# repo.index.add(file_list)
# repo.index.commit(commit_message)
# origin = repo.remote('origin')
# origin.push()

# response = requests.get('https://mrbui95.github.io/fpl/data/resutl_gw33.json')
# print(response.text)