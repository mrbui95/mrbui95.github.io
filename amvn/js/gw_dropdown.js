const gameWeekSelect = document.querySelector('#gw_select')


let currentGw = -1
let uInfo
let gwData


const getCurrentGW =  async () => {
    await fetch("https://mrbui95.github.io/fpl/data/current_gw.json", {
        method: "GET",
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
    }).then(data => {
        return data.json()
    }).then((json) => {
        let id
        let gameWeekSelectOption

        if (currentGw != -1) {
            id = 'dropdown_gw_option_' + currentGw;
            gameWeekSelectOption = document.getElementById(id)
            gameWeekSelectOption.removeAttribute('selected')
        }

        currentGw = json.current_gw
        console.log(json, currentGw)
        id = 'dropdown_gw_option_' + currentGw;
        gameWeekSelectOption = document.getElementById(id)
        gameWeekSelectOption.setAttribute('selected', true)
    })
}

getCurrentGW()


for (let i = 1; i < 39; i += 1) {
    const option = document.createElement('option')
    option.appendChild(document.createTextNode(i))
    option.setAttribute('id', 'dropdown_gw_option_' + i)
    if (i === currentGw) {
        option.setAttribute('selected', true)
    }

    gameWeekSelect.appendChild(option)
}

const getGroupName = (index) => {
    switch (index) {
        case 1:
            return 'Group A'
        case 2:
            return 'Group B'
        case 3:
            return 'Group C'
        case 4:
            return 'Group D'
        default:
            return 'Group'
    }
}

const groupResults = document.querySelector('#group_result')

const createGroupResult = (groupInfo) => {
    const result = document.createElement('div')

    result.appendChild(document.createTextNode(groupInfo.groupName))


    const table = document.createElement('table')
    table.classList.add('table')
    table.classList.add('table-bordered')
    table.classList.add('table-striped')
    table.classList.add('table-sm')
    const tbody = document.createElement('tbody')

    console.log(groupInfo.listMatchResult)

    groupInfo.listMatchResult.forEach((match) => {
        console.log(match)

        const tr = document.createElement('tr')
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        const td3 = document.createElement('td')
        const td4 = document.createElement('td')

        td1.appendChild(document.createTextNode(match.name1))
        td2.appendChild(document.createTextNode(match.point1))
        td3.appendChild(document.createTextNode(match.point2))
        td4.appendChild(document.createTextNode(match.name2))

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)

        tbody.appendChild(tr)
    })

    table.appendChild(tbody)

    result.appendChild(table)

    // return result
    groupResults.appendChild(result)
}

const getUserData = async () => {
    console.log('==========GET USER DATA============')

    await fetch("https://mrbui95.github.io/fpl/data/u_info.json", {
        method: "GET",
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
    }).then(data => {
        return data.json()
    }).then(data => uInfo = data)

    let gw = currentGw % 19
    if (gw < 8) {
        await fetch("https://mrbui95.github.io/fpl/data/c1/result/" + gw + ".json", {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(data => {
            return data.json()
        }).then(data => gwData = data)

        await fetch("https://mrbui95.github.io/fpl/data/c1/group_1.json", {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(data => {
            return data.json()
        }).then((groupData) => {
            console.log(groupData)
            for (let i = 1; i <= 8; i++) {
                const fixture = groupData[i][gw]
                console.log(fixture)

                const groupName = getGroupName(i)
                listMatch = []

                let listMatchResult = []

                console.log('-----------', groupName ,'----------')
                fixture.forEach((match) => {
                    console.log(match)
                    const team1 = match[0]
                    const team2 = match[1]
                    const player1 = gwData[team1]
                    const player2 = gwData[team2]
                    const name1 = uInfo[team1]['name']
                    const name2 = uInfo[team2]['name']
                    const point1 = player1['entry_history']['points']
                    const point2 = player2['entry_history']['points']

                    listMatchResult = listMatchResult.concat({
                        team1,
                        team2,
                        name1,
                        name2,
                        point1,
                        point2
                    })

                })

                groupInfo = {
                    listMatchResult,
                    groupName
                }

                result = createGroupResult(groupInfo)
                

                console.log('-----------', groupName ,'----------')

                
                
            }
        })
    } else {
        console.log(gw, 'GW > 8')
    }


    
}

getUserData()

const gameWeekSelectOnChange = (e) => {
    currentGw = e.target.value
    reloadPage()
}


gameWeekSelect.onchange = gameWeekSelectOnChange

const reloadPage = () => {
    console.log('reload page')
    getUserData()
}