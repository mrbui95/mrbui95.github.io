import requests
import random
import codecs
import time
import json
from git import Repo

stage = 1

current_gw = -1
if stage == 1:
    current_gw = 9
elif stage == 2:
    current_gw = 28

prev_gw = current_gw - 1


data = {}

group_c1 = []
group_c2 = []
group_c3 = []
group_c4 = []


def make_fixture(teams):
    if len(teams) % 2:
        teams.append('Day off')
    n = len(teams)
    matchs = []
    fixtures = []
    for fixture in range(0, n - 1):
        for i in range(n // 2):
            matchs.append((teams[i], teams[n - 1 - i]))
        teams.insert(1, teams.pop())
        fixtures.insert(len(fixtures) // 2, matchs)
        matchs = []
    
    return fixtures


response = requests.get("https://mrbui95.github.io/amvn/data/c1/rank/" + str(prev_gw) + ".json")
last_rank = response.json()


for i in range(1,9):
    print('--------' + str(i) + '-------')
    group = last_rank[str(i)]
    # print(group)
    list = []
    for u in group:
        usr = group[u]
        usr['id'] = u
        list.append(usr)
    
    slist = sorted(list, key = lambda u: (-int(u['point']), -int(u['gd'])))

    print(slist)

    k = 1
    for susr in slist:
        gr = ''
        if (k <= 2):
            gr = 'c1'
            group_c1.append(susr['id'])
        elif (k <= 4):
            gr = 'c2'
            group_c2.append(susr['id'])
        elif (k <= 6):
            gr = 'c3'
            group_c3.append(susr['id'])
        elif (k <= 10):
            gr = 'c4'
            group_c4.append(susr['id'])
        k += 1
        print(susr['id'], susr['point'], susr['gd'], '===========> ', gr)

    print('--------end-------')

print(group_c1)
print(group_c2)
print(group_c3)
print(group_c4)


random.shuffle(group_c1)
random.shuffle(group_c2)
random.shuffle(group_c3)
random.shuffle(group_c4)


fixture = make_fixture(group_c1)
data['1'] = fixture
fixture = make_fixture(group_c2)
data['2'] = fixture
fixture = make_fixture(group_c3)
data['3'] = fixture
fixture = make_fixture(group_c4)
data['4'] = fixture

# print(data)

fileName = 'F:\\Study\\Github\\mrbui95.github.io\\amvn\\data\\c1\\group_period2_' + str(stage) + '.json'
file1 = codecs.open(fileName, 'w', 'utf8')
file1.write(json.dumps(data))

from git import Repo

repo_dir = 'F:\\Study\\Github\\mrbui95.github.io'
repo = Repo(repo_dir)
file_list = [
    fileName
]
commit_message = 'Create fixture period 1 - ' + str(time.time())
repo.index.add(file_list)
repo.index.commit(commit_message)
origin = repo.remote('origin')
origin.push()