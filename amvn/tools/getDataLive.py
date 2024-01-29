import requests
import codecs
import time
import json
from git import Repo
from datetime import datetime
import pytz
import schedule

# uid = 250006
# uid = 2114046

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



def get_current_point(uid):


    url_fixture_live = 'https://fantasy.premierleague.com/api/fixtures/?event=' + str(current_gw)
    reponse_fixture_live = requests.get(url_fixture_live)
    data_fixture_live = reponse_fixture_live.json()


    url_live = 'https://fantasy.premierleague.com/api/event/' + str(current_gw) + '/live/'
    reponse_live = requests.get(url_live)
    data_live = reponse_live.json()

    url = 'https://fantasy.premierleague.com/api/entry/' + str(uid) + '/event/' + str(current_gw) + '/picks/'
    # print('-------------' + str(uid) + '----------------')
    # print(url)
    response = requests.get(url)
    udata = response.json()
    # print(udata)
    picks = udata['picks']
    currentPoint = 0
    for pick in picks:
        is_captain = pick['is_captain']
        position = pick['position']
        if position < 12:
            element = pick['element']
            # print('-------------------------------')
            # print(element)
            playerData = data_live['elements'][element - 1]
            print('----------------playerData:' + str(json.dumps(playerData)))
            explain = playerData['explain']
            # print(explain)
            totalMinsPlay = 0

            player_point = 0

            # 1 gw có thể có nhiều trận
            for gw in explain:
                fixture = gw['fixture']

                # Điểm trong game
                for stat in gw['stats']:
                    if (stat['identifier'] == 'minutes'):
                        totalMinsPlay += stat['value']
                    player_point += stat['points']
                    # if totalMinsPlay == 0:
                    #     print('player' + str(element - 1) + ' not play')
                # Điểm bonus:
                for match in data_fixture_live:
                    finished = match['finished']
                    if (match['id'] == fixture):
                        match_stats = match['stats']
                        print(match_stats)
                        if finished == False:
                            kickoff_time = match['kickoff_time']
                            print(kickoff_time)
                            kickoff_datetime = datetime.strptime(kickoff_time, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=pytz.utc)
                            current_datetime = datetime.now(pytz.utc)
                            if current_datetime > kickoff_datetime:
                                print('match' + str(match))
                                for match_stat in match_stats:
                                    if (match_stat['identifier'] == 'bps'):
                                        a = match_stat['a']
                                        a0 = a[0]['value']
                                        a1 = a[1]['value']
                                        a2 = a[2]['value']

                                        p_bps = 0
                                        for p in a:
                                            if (p['element'] == element):
                                                p_bps = p['value']
                                                break
                                            
                                        if (p_bps == a0):
                                            player_point += 3
                                        elif (p_bps == a1):
                                            player_point += 2
                                        elif (p_bps == a2):
                                            player_point += 1       

            if is_captain == False:
                currentPoint += player_point
            else:
                currentPoint += player_point * 2
        


    print(currentPoint)
    return currentPoint

#get_current_point(486618)
#get_current_point(2114046)


def get_gw19_point(uid):
    response = requests.get("https://mrbui95.github.io/amvn/data/c1/result/19.json")
    udata = response.json()
    print('===============GW19 result')
    print(udata)
    print('===============GW19 result')
    return 0

def job():
    print('============START==============')
    response = requests.get('https://mrbui95.github.io/amvn/data/user_c1.json')
    list_team = response.json()['league']
    print(list_team)

    gw_result={}
    headers = {'x-requested-with':'https://fantasy.premierleague.com', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'}
    for uid in list_team:
        url = 'https://fantasy.premierleague.com/api/entry/' + uid + '/event/' + str(current_gw) + '/picks/'
        print('-------------' + uid + '----------------')
        print(url)
        current_point = get_current_point(uid)
        response = requests.get(url)
        d = response.json()
        d['entry_history']['points'] = current_point
        # d['entry_history']['total_points'] += current_point
        gw_result[uid] = d
        print('-------------' + uid + '----------------')
    print(json.dumps(gw_result))

    fileName = 'F:\\Study\\Github\\mrbui95.github.io\\amvn\\data\\c1\\result\\' + str(current_gw) + '.json'
    file = codecs.open(fileName, 'w', 'utf8')
    file.write(json.dumps(gw_result))
    file.close()

    repo_dir = 'F:\\Study\\Github\\mrbui95.github.io'
    repo = Repo(repo_dir)
    file_list = [
        fileName
    ]
    commit_message = 'Update live result - ' + str(time.time())
    repo.index.add(file_list)
    repo.index.commit(commit_message)
    origin = repo.remote('origin')
    origin.push()



    response = requests.get("https://mrbui95.github.io/amvn/data/c1/group_period2_2.json")
    list_team_gr = response.json()
    # print(list_team_gr)

    def get_rank():
        rank = {}
        for i in range(1,9):
            group = list_team_gr[str(i)]
            print(group)
            team = {}
            group_rank = {}
            for teamId in group:
                print(teamId)
                team['id'] = teamId
                print('---------------------------' + str(teamId))
                gw_point = gw_result[str(teamId)]['entry_history']['points'] - gw_result[str(teamId)]['entry_history']['event_transfers_cost']
                team['gw_point'] = gw_point
                total_point = gw_result[str(teamId)]['entry_history']['total_points']
                if (current_gw > 19):
                    total_point = total_point - get_gw19_point()
                team['point'] = total_point
                team_cost = gw_result[str(teamId)]['entry_history']['value']
                team['gd'] = team_cost
                group_rank[teamId] = team
                team = {}

            print(group_rank)
            rank[str(i)] = group_rank

        return rank


    live_rank = get_rank()
    # print(live_rank)

    fileName = 'F:\\Study\\Github\\mrbui95.github.io\\amvn\\data\\c1\\rank\\' + str(current_gw) + '.json'
    file1 = codecs.open(fileName, 'w', 'utf8')
    file1.write(json.dumps(live_rank))
    file1.close()

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
    print('============DONE==============')

job()

# Lên lịch công việc chạy vào mỗi phút
schedule.every(2).minutes.do(job)


while True:
    schedule.run_pending()
    time.sleep(2)