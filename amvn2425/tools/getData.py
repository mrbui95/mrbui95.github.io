import requests
import codecs
import json
import time
from git import Repo

repo_dir = 'F:\\Study\\Github\\mrbui95.github.io'



file_prefix = repo_dir + '\\amvn2425\\data'
file_curr_gw = 'current_gw.json'


def updateGit(file_name, commit):
    print('upload git: ' + commit)
    

# Hàm lay thong tin gameweek hien tai
def getCurrGw():
    url_curr_gw = 'https://fantasy.premierleague.com/api/entry/1/'
    response_curr_gw = requests.get(url_curr_gw)
    data_curr_gw = response_curr_gw.json()
    current_gw = data_curr_gw['current_event']
    if current_gw is None:
        current_gw = 1
    return current_gw



    


# Ham lay danh sach id nguoi choi C1
def getListPlayerC1():
    url_user_c1 = 'https://mrbui95.github.io/amvn2425/data/user_c1.json'
    response = requests.get(url_user_c1)
    print(response.json())
    return response[]




current_gw = getCurrGw()
print(current_gw)