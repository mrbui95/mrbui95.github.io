import requests

league_id = '208379'

page = 1
hasNext = True

data={}

headers = {'x-requested-with':'https://fantasy.premierleague.com', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'}

while hasNext == True:
    url = 'https://fantasy.premierleague.com/api/leagues-classic/' + league_id + '/standings/?page_new_entries=' + str(page)  + '&page_standings=' + str(page) + '&phase=1'

    # print(url)

    response = requests.get(url)

    # print(response.json())

    # standings = response.json()['standings']
    # print(standings)

    # hasNext = standings['has_next']
    # listUser = standings['results']

    newEntries = response.json()['new_entries']

    # print(newEntries)

    listUser = newEntries['results']
    hasNext = newEntries['has_next']
    # print(newEntries)
    # print(hasNext)
    

    # In danh sách kèm tên
    #for user in listUser:
    #    print ('\'' + str(user['entry']) + '\'' + '|' + user['entry_name'] + '|' + user['player_first_name'] + ' ' + user['player_last_name'] +',')

    #In danh sách chỉ có id
    for user in listUser:
        print ('"' + str(user['entry']) + '",')

    page = page + 1

    