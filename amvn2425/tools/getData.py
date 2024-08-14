import requests
import codecs
import json
import time
import random
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

def GetUserInfo():
    url_user = 'https://mrbui95.github.io/amvn2425/data/user_c1.json'
    response = requests.get(url_user)
    listTeam = response.json()['league']

    data = {}

    for team in listTeam:
        print(team)
        response = requests.get('https://fantasy.premierleague.com/api/entry/' + team + '/')
        uInfo = response.json()
        data[team] = uInfo

    file_name = file_prefix + '\\u_info.json'
    content = json.dumps(data)
    print(file_name)
    saveFileAndUpdateGit(file_name, content, 'Update User Info')

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
    # print(response.json())
    gw_data = response.json()
    return gw_data

def getPlayerPoint(gw_data, uid):
    player = gw_data[str(uid)]
    point = player['entry_history']['points'] - player['entry_history']['event_transfers_cost']
    total_points = player['entry_history']['total_points']
    return point, total_points

def getListGroupPlayer(stage):
    url_group_player = 'https://mrbui95.github.io/amvn2425/data/c1/group/list_stage_' + str(stage) + '.json'
    response = requests.get(url_group_player)
    group_player = response.json()
    return group_player

def getStage(gw):
    stage = 1
    if (current_gw > 20):
        stage = 2
        
    return stage

def getFixture(gw):
    stage = getStage(gw)

    index = gw - 5
    if (current_gw >= 24):
        index = gw - 24

    url_fixture = 'https://mrbui95.github.io/amvn2425/data/c1/group/fixture_' + str(stage) + '.json'
    response = requests.get(url_fixture)
    fixture = response.json()
    data = {}
    data['c1'] = fixture['c1'][index]
    data['c2'] = fixture['c2'][index]
    data['c3'] = fixture['c3'][index]
    data['c4'] = fixture['c4'][index]
    return data

def saveGwRank(gw, data):
    file_name = file_prefix + '\\c1\\group\\rank_' + str(gw) + '.json'
    content = json.dumps(data)
    saveFileAndUpdateGit(file_name, content, 'Save GW User Data')


def saveRankData(gw, rank):
    file_name = file_prefix + '\\c1\\group\\rank_' + str(gw) + '.json'
    content = json.dumps(rank)
    saveFileAndUpdateGit(file_name, content, 'Update GW Rank ' + str(gw))

def CreateDefaultRank(gw):
    stage = getStage(gw)
    group_player = getListGroupPlayer(stage)
    data = {}
    for group in group_player:
        group_data = []
        list_player = group_player[group]
        for player in list_player:
            player_info = {}
            player_info['id'] = player
            player_info['point'] = 0
            player_info['total_points'] = 0
            group_data.append(player_info)
        data[group] = group_data

    saveRankData(gw, data)

    return data

def getRank(gw):
    url_rank = 'https://mrbui95.github.io/amvn2425/data/c1/group/rank_' + str(gw) + '.json'
    response = requests.get(url_rank)
    rank = response.json()
    return rank





# Ham sinh Fixture tự động
def make_fixture(teams):
    random.shuffle(teams)
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
        key_number = int(key)
        if (index < GROUP_MAX_MEMBER):
            group_c1.append(key_number)
        elif (index < (2 * GROUP_MAX_MEMBER)):
            group_c2.append(key_number)
        elif (index < (3 * GROUP_MAX_MEMBER)):
            group_c3.append(key_number)
        else:
            group_c4.append(key_number)

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

def updateRankData(rank, group, uid1, point_add1, total_points1, uid2, point_add2, total_points2):
    done1 = False
    done2 = False
    for item in rank[group]:
        if item['id'] == uid1:
            item['point'] = item['point'] + point_add1
            item['total_points'] = total_points1
            done1 = True
        if item['id'] == uid2:
            item['point'] = item['point'] + point_add2
            item['total_points'] = total_points2
            done2 = True
        if done1 and done2:
            break


# Ham tinh toan ket qua thang thua vong bang, tinh toan bang xep hang tam thoi
def CalcGroupResult(current_gw):
    print('CalcGroupResult')
    gw_data = getDataResult(current_gw)
    list_fixture = getFixture(current_gw)
    rank = getRank(current_gw - 1)

    for group in list_fixture:
        group_fixture = list_fixture[group]
        print(group_fixture)
        for fixture in group_fixture:
            print(fixture)
            uid1 = fixture[0]
            uid2 = fixture[1]
            point1, total_points1 = getPlayerPoint(gw_data, uid1)
            point2, total_points2 = getPlayerPoint(gw_data, uid2)

            point_add1 = 0
            point_add2 = 0

            if point1 < point2:
                point_add2 = 3
            elif point1 > point2:
                point_add1 = 3
            else:
                point_add1 = 1
                point_add2 = 1

            updateRankData(rank, group, uid1, point_add1, total_points1, uid2, point_add2, total_points2)
    

    saveRankData(current_gw, rank)
    return rank



# Ham tinh toan ket qua vong bang, xac dinh cac cap dau playoff
def CalcPlayOffResult(current_gw, rank):
    print('CalcPlayOffResult')

    stage = getStage(current_gw)

    for group in rank:
        rank[group] = sorted(rank[group], key=lambda x: (x['point'], x['total_points']), reverse=True)

    data = {}
    # Playoff tu ket C2
    c2 = [
        [int(rank["c1"][8]["id"]), int(rank["c2"][7]["id"])],
        [int(rank["c1"][9]["id"]), int(rank["c2"][6]["id"])],
        [int(rank["c1"][10]["id"]), int(rank["c2"][5]["id"])],
        [int(rank["c1"][11]["id"]), int(rank["c2"][4]["id"])]
    ]
    data['c2'] = c2
    # Playoff tu ket C]
    c3 = [
        [int(rank["c2"][8]["id"]), int(rank["c3"][7]["id"])],
        [int(rank["c2"][9]["id"]), int(rank["c3"][6]["id"])],
        [int(rank["c2"][10]["id"]), int(rank["c3"][5]["id"])],
        [int(rank["c2"][11]["id"]), int(rank["c3"][4]["id"])]
    ]
    data['c3'] = c3
    # Playoff tu ket C4
    c4 = [
        [int(rank["c3"][8]["id"]), int(rank["c4"][7]["id"])],
        [int(rank["c3"][9]["id"]), int(rank["c4"][6]["id"])],
        [int(rank["c3"][10]["id"]), int(rank["c4"][5]["id"])],
        [int(rank["c3"][11]["id"]), int(rank["c4"][4]["id"])]
    ]
    data['c4'] = c4




    file_name = file_prefix + '\\c1\\knockout\\playoff_' + str(stage) + '.json'
    content = json.dumps(data)
    saveFileAndUpdateGit(file_name, content, 'Update Fixture Play-off ' + str(stage))

    


def CalcWinner(uid1, uid2, prevGwData, gwData):
    prevPoint1 = getPlayerPoint(prevGwData, uid1)[0]
    prevPoint2 = getPlayerPoint(prevGwData, uid2)[0]
    point1 = getPlayerPoint(gwData, uid1)[0]
    point2 = getPlayerPoint(gwData, uid2)[0]

    match_1 = 1 if prevPoint1 > prevPoint2 else 0 if prevPoint1 == prevPoint2 else -1
    match_2 = 1 if point1 > point2 else 0 if point1 == point2 else -1

    winner = ''
    loser = ''

    result = match_1 + match_2
    if (result == 0):
        if (prevPoint1 + point1) > (prevPoint2 + point2):
            winner = uid1
            loser = uid2
        else:
            winner = uid2
            loser = uid1
    else:
        if result > 0:
            winner = uid1
            loser = uid2
        else:
            winner = uid2
            loser = uid1
    return winner, loser

def GetPlayOffFixture(gw):
    stage = getStage(gw)
    url_playoff = 'https://mrbui95.github.io/amvn2425/data/c1/knockout/playoff_' + str(stage) + '.json'
    response = requests.get(url_playoff)
    fixture = response.json()
    return fixture

def CalcWinners(fixtures, gw):
    prevGwData = getDataResult(gw - 1)
    gwData = getDataResult(gw)

    winners = {}
    losers = {}

    for group in fixtures:
        fixture = fixtures[group]
        print(fixture)
        group_winners = []
        group_losers = []
        for match in fixture:
            winner, loser = CalcWinner(str(match[0]), str(match[1]), prevGwData, gwData)
            group_winners.append(winner)
            group_losers.append(loser)
        winners[str(group)] = group_winners
        losers[str(group)] = group_losers

    return winners, losers

# Ham tinh toan ket qua Playoff luot ve
def CalcPlayoffSecondLeg(gw):
    print("CalcPlayoffSecondLeg")
    
    stage = getStage(gw)

    fixtures = GetPlayOffFixture(gw)
    print(fixtures)

    winners, losers = CalcWinners(fixtures, gw)

    print(winners)

    rank_gw = 12 if stage == 1 else 31
    rank = getRank(rank_gw)

    for group in rank:
        rank[group] = sorted(rank[group], key=lambda x: (x['point'], x['total_points']), reverse=True)

    data = {}
    # Tu ket C1
    c1 = [
        [int(rank["c1"][0]["id"]), int(rank["c1"][7]["id"])],
        [int(rank["c1"][1]["id"]), int(rank["c1"][6]["id"])],
        [int(rank["c1"][2]["id"]), int(rank["c1"][5]["id"])],
        [int(rank["c1"][3]["id"]), int(rank["c1"][4]["id"])]
    ]
    data['c1'] = c1
    # Tu ket C2
    c2 = [
        [int(rank["c2"][0]["id"]), int(winners["c2"][0])],
        [int(rank["c2"][1]["id"]), int(winners["c2"][1])],
        [int(rank["c2"][2]["id"]), int(winners["c2"][2])],
        [int(rank["c2"][3]["id"]), int(winners["c2"][3])]
    ]
    data['c2'] = c2
    # Tu ket C3
    c3 = [
        [int(rank["c3"][0]["id"]), int(winners["c3"][0])],
        [int(rank["c3"][1]["id"]), int(winners["c3"][1])],
        [int(rank["c3"][2]["id"]), int(winners["c3"][2])],
        [int(rank["c3"][3]["id"]), int(winners["c3"][3])]
    ]
    data['c3'] = c3
    # Tu ket C4
    c4 = [
        [int(rank["c4"][0]["id"]), int(winners["c4"][0])],
        [int(rank["c4"][1]["id"]), int(winners["c4"][1])],
        [int(rank["c4"][2]["id"]), int(winners["c4"][2])],
        [int(rank["c4"][3]["id"]), int(winners["c4"][3])]
    ]
    data['c4'] = c4
    print(data)

    

    file_name = file_prefix + '\\c1\\knockout\\quarter_' + str(stage) + '.json'
    content = json.dumps(data)
    saveFileAndUpdateGit(file_name, content, 'Update Fixture Quarter Final ' + str(stage))


def GetQuarterFinalFixture(gw):
    stage = getStage(gw)
    url_quarter = 'https://mrbui95.github.io/amvn2425/data/c1/knockout/quarter_' + str(stage) + '.json'
    response = requests.get(url_quarter)
    fixture = response.json()
    return fixture

# Ham tinh toan ket qua Tu ket luot ve
def CalcQuarterFinalSecondLeg(gw):
    print("CalcQuarterFinalSecondLeg")

    stage = getStage(gw)
    
    fixtures = GetQuarterFinalFixture(gw)
    print(fixtures)

    winners, losers = CalcWinners(fixtures, gw)
    print(winners)

    data = {}
    # Ban ket C1
    c1 = [
        [int(winners["c1"][0]), int(winners["c1"][1])],
        [int(winners["c1"][2]), int(winners["c1"][3])],
    ]
    data['c1'] = c1
    # Ban ket C2
    c2 = [
        [int(winners["c2"][0]), int(winners["c2"][1])],
        [int(winners["c2"][2]), int(winners["c2"][3])],
    ]
    data['c2'] = c2
    # Ban ket C3
    c3 = [
        [int(winners["c3"][0]), int(winners["c3"][1])],
        [int(winners["c3"][2]), int(winners["c3"][3])],
    ]
    data['c3'] = c3
    # Ban ket C4
    c4 = [
        [int(winners["c4"][0]), int(winners["c4"][1])],
        [int(winners["c4"][2]), int(winners["c4"][3])],
    ]
    data['c4'] = c4
    print(data)

    file_name = file_prefix + '\\c1\\knockout\\semi_' + str(stage) + '.json'
    content = json.dumps(data)
    saveFileAndUpdateGit(file_name, content, 'Update Fixture Semi Final ' + str(stage))


def GetSemiFinalFixture(gw):
    stage = getStage(gw)
    url_semi = 'https://mrbui95.github.io/amvn2425/data/c1/knockout/semi_' + str(stage) + '.json'
    response = requests.get(url_semi)
    fixture = response.json()
    return fixture

# Ham tinh toan ket qua Ban ket luot ve
def CalcSemiFinalSecondLeg(gw):
    print("CalcSemiFinalSecondLeg")

    stage = getStage(gw)
    
    fixtures = GetSemiFinalFixture(gw)
    print(fixtures)

    winners, losers = CalcWinners(fixtures, gw)
    data = {}

    final_data = {}
    final_data['c1'] = [[int(winners['c1'][0]), int(winners['c1'][1])]]
    final_data['c2'] = [[int(winners['c2'][0]), int(winners['c2'][1])]]
    final_data['c3'] = [[int(winners['c3'][0]), int(winners['c3'][1])]]
    final_data['c4'] = [[int(winners['c4'][0]), int(winners['c4'][1])]]

    third_place_data = {}
    third_place_data['c1'] = [[int(losers['c1'][0]), int(losers['c1'][1])]]
    third_place_data['c2'] = [[int(losers['c2'][0]), int(losers['c2'][1])]]
    third_place_data['c3'] = [[int(losers['c3'][0]), int(losers['c3'][1])]]
    third_place_data['c4'] = [[int(losers['c4'][0]), int(losers['c4'][1])]]

    data['final'] = final_data
    data['thirdPlace'] = third_place_data

    print(data)

    file_name = file_prefix + '\\c1\\knockout\\final_' + str(stage) + '.json'
    content = json.dumps(data)
    saveFileAndUpdateGit(file_name, content, 'Update Fixture Final ' + str(stage))


# Ham tinh toan ket qua Tranh 3-4
def CalcThirdPlace(gw):
    print("CalcThirdPlace")

# Ham tinh toan ket qua Chung ket
def CalcChampionship(gw):
    print("CalcChampionship")

def CalcSecondChance(gw):
    print("CalcSecondChance")


current_gw = getCurrGw()
print(current_gw)

#Fix cung current_gw de test
#current_gw = 0


getDataGw(current_gw)

if (current_gw == 0):
    GetUserInfo()
elif (current_gw < 4):
    # Vong phan hang - chi lay ket qua classic => khong lam gi
    print('Vong phan hang - chi lay ket qua classic => khong lam gi')
elif (current_gw == 4):
    # Ket thuc vong phan hang - lay ket quả classic va chia danh sach thanh vien vao 4 nhóm C1,C2,C3,C4, tu dong sinh lich thi dau ngau nhien
    stage, group_c1, group_c2, group_c3, group_c4 = SplitGroup(current_gw)
    RandomFixture(stage, group_c1, group_c2, group_c3, group_c4)
    CreateDefaultRank(current_gw)
elif (current_gw < 12):
    # Giai doan vong bang, tinh diem theo lich thi dau
    CalcGroupResult(current_gw)
elif (current_gw == 12):
    # Vong dau cuoi vong bang => tinh toan nguoi choi playoff, nguoi choi vao vong tu ket
    rank = CalcGroupResult(current_gw)
    CalcPlayOffResult(current_gw, rank)
elif (current_gw == 14):
    # Playoff luot ve
    CalcPlayoffSecondLeg(current_gw)
elif (current_gw == 16):
    # Tu ket luot ve
    CalcQuarterFinalSecondLeg(current_gw)
elif (current_gw == 18):
    # Ban ket luot ve
    CalcSemiFinalSecondLeg(current_gw)
elif (current_gw == 19):
    # Tranh 3-4
    CalcThirdPlace(current_gw)
    # Tranh chuc vo dich
    CalcChampionship(current_gw)
    # Tinh toan giai Second Chance
    CalcSecondChance(current_gw)

    





