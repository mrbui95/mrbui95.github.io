import requests
import codecs
import json
import time
from git import Repo

repo_dir = 'F:\\Study\\Github\\mrbui95.github.io'

file_prefix = repo_dir + '\\amvn2425\\data'

GROUP_MAX_MEMBER = 16


# Ham luu tru file local
def saveFile(file_name, content):
    file = codecs.open(file_name, 'w', 'utf8')
    file.write(content)
    file.close()

# Ham luu file len git
def updateGit(file_name, commit):
    time.sleep(10)
    print('upload git: ' + commit)
    repo = Repo(repo_dir)
    file_list = [
        file_name
    ]
    commit_message = commit + ' - ' + str(time.time())
    repo.index.add(file_list)
    repo.index.commit(commit_message)
    origin = repo.remote('origin')
    origin.push()
    
def saveFileAndUpdateGit(file_name, content, commit):
    saveFile(file_name, content)
    updateGit(file_name, commit)

# Hàm lay thong tin gameweek hien tai
def getCurrGw():
    url_curr_gw = 'https://fantasy.premierleague.com/api/entry/1/'
    response_curr_gw = requests.get(url_curr_gw)
    data_curr_gw = response_curr_gw.json()
    current_gw = data_curr_gw['current_event']
    if current_gw is None:
        current_gw = 1
    
    data = {}
    data['current_gw'] = current_gw
    
    file_name = file_prefix + '\\current_gw.json'
    content = json.dumps(data)
    saveFileAndUpdateGit(file_name, content, 'Update Current GW')
    
    return current_gw



# Ham lay danh sach id nguoi choi C1
def getListPlayerUid():
    url_user_c1 = 'https://mrbui95.github.io/amvn2425/data/user_c1.json'
    response = requests.get(url_user_c1)
    print(response.json())
    listPlayerUid = response.json()['league']
    return listPlayerUid


# Ham lay ket qua vong choi
def getDataGw(gw):
    data={}
    headers = {'x-requested-with':'https://fantasy.premierleague.com', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'}
    listPlayerUid = getListPlayerUid()
    for uid in listPlayerUid:
        url = 'https://fantasy.premierleague.com/api/entry/' + uid + '/event/' + str(current_gw) + '/picks/'
        print('-------------' + uid + '----------------')
        print(url)
        response = requests.get(url)
        data[uid] = response.json()
        print('-------------' + uid + '----------------')
    print(json.dumps(data))
    
    file_name = file_prefix + '\\c1\\result\\' + str(gw) + '.json'
    content = json.dumps(data)
    saveFileAndUpdateGit(file_name, content, 'Get GW User Data')

def getDataResult(gw):
    url_data_result = 'https://mrbui95.github.io/amvn2425/data/c1/result/' + str(gw) + '.json'
    response = requests.get(url_data_result)
    print(response.json())
    gw_data = response.json()
    return gw_data

# Ham sinh Fixture tự động
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


# Ham sinh Fixture cho 4 giai C1, C2, C3, C4
def RandomFixture(stage, group_c1, group_c2, group_c3, group_c4):
    fixture1 = make_fixture(group_c1)
    fixture2 = make_fixture(group_c2)
    fixture3 = make_fixture(group_c3)
    fixture4 = make_fixture(group_c4)

    data = {}

    data['c1'] = fixture1
    data['c2'] = fixture2
    data['c3'] = fixture3
    data['c4'] = fixture4

    file_name = file_prefix + '\\c1\\group\\fixture_' + str(stage) + '.json'
    content = json.dumps(data)
    saveFileAndUpdateGit(file_name, content, 'Update Group Fixture')


# Ham tinh toan danh sach nguoi choi vao 4 nhom C1, C2, C3, C4
def SplitGroup(current_gw):
    print('Split group')
    group_c1 = []
    group_c2 = []
    group_c3 = []
    group_c4 = []

    stage = 1

    gw_data = getDataResult(current_gw)
    gw_data_19 = None
    if (current_gw == 23):
        stage = 2
        gw_data_19 = getDataResult(19)

    
    sorted_data = dict(sorted(gw_data.items(), key=lambda item: item[1]['entry_history']['total_points'], reverse=True))
    index = 0
    for key, value in sorted_data.items():
        print(key + ": " + str(value['entry_history']['total_points']))
        if (index < GROUP_MAX_MEMBER):
            group_c1.append(key)
        elif (index < (2 * GROUP_MAX_MEMBER)):
            group_c2.append(key)
        elif (index < (3 * GROUP_MAX_MEMBER)):
            group_c3.append(key)
        else:
            group_c4.append(key)

        index += 1

    data = {}
    data['c1'] = group_c1
    data['c2'] = group_c2
    data['c3'] = group_c3
    data['c4'] = group_c4

    file_name = file_prefix + '\\c1\\group\\list_stage_' + str(stage) + '.json'
    content = json.dumps(data)
    saveFileAndUpdateGit(file_name, content, 'Update Group List')

    print(group_c1)
    print(group_c2)
    print(group_c3)
    print(group_c4)

    return stage, group_c1, group_c2, group_c3, group_c4



# Ham tinh toan ket qua thang thua vong bang, tinh toan bang xep hang tam thoi
def CalcGroupResult():
    print('CalcGroupResult')

# Ham tinh toan ket qua vong bang, xac dinh cac cap dau playoff
def CalcKnockOutResult():
    print('CalcKnockOutResult')

# Ham tinh toan ket qua Playoff luot di
def CalcPlayoffFirstLeg():
    print("CalcPlayoffFirstLeg")

# Ham tinh toan ket qua Playoff luot ve
def CalcPlayoffSecondLeg():
    print("CalcPlayoffSecondLeg")

# Ham tinh toan ket qua Tu ket luot di
def CalcQuarterFinalFirstLeg():
    print("CalcQuarterFinalFirstLeg")

# Ham tinh toan ket qua Tu ket luot ve
def CalcQuarterFinalSecondLeg():
    print("CalcQuarterFinalSecondLeg")

# Ham tinh toan ket qua Ban ket luot di
def CalcSemiFinalFirstLeg():
    print("CalcSemiFinalFirstLeg")

# Ham tinh toan ket qua Ban ket luot ve
def CalcSemiFinalSecondLeg():
    print("CalcSemiFinalSecondLeg")

# Ham tinh toan ket qua Tranh 3-4
def CalcThirdPlace():
    print("CalcThirdPlace")

# Ham tinh toan ket qua Chung ket
def CalcChampionship():
    print("CalcChampionship")

def CalcSecondChance():
    print("CalcSecondChance")


#current_gw = getCurrGw()
#print(current_gw)

#Fix cung current_gw de test
current_gw = 4


#getDataGw(current_gw)

if (current_gw < 4):
    # Vong phan hang - chi lay ket qua classic => khong lam gi
    print('Vong phan hang - chi lay ket qua classic => khong lam gi')
elif (current_gw == 4):
    # Ket thuc vong phan hang - lay ket quả classic va chia danh sach thanh vien vao 4 nhóm C1,C2,C3,C4, tu dong sinh lich thi dau ngau nhien
    stage, group_c1, group_c2, group_c3, group_c4 = SplitGroup(current_gw)
    RandomFixture(stage, group_c1, group_c2, group_c3, group_c4)
elif (current_gw < 12):
    # Giai doan vong bang, tinh diem theo lich thi dau
    CalcGroupResult()
elif (current_gw == 12):
    # Vong dau cuoi vong bang => tinh toan nguoi choi playoff, nguoi choi vao vong tu ket
    CalcGroupResult()
    CalcKnockOutResult()
elif (current_gw == 13):
    # Playoff luot di
    CalcPlayoffFirstLeg()
elif (current_gw == 14):
    # Playoff luot ve
    CalcPlayoffSecondLeg()
elif (current_gw == 15):
    # Tu ket luot di
    CalcQuarterFinalFirstLeg()
elif (current_gw == 16):
    # Tu ket luot ve
    CalcQuarterFinalSecondLeg()
elif (current_gw == 17):
    # Ban ket luot di
    CalcSemiFinalFirstLeg()
elif (current_gw == 18):
    # Ban ket luot ve
    CalcSemiFinalSecondLeg()
elif (current_gw == 19):
    # Tranh 3-4
    CalcThirdPlace()
    # Tranh chuc vo dich
    CalcChampionship()
    # Tinh toan giai Second Chance
    CalcSecondChance()

    





