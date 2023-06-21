const gameWeekSelect = document.querySelector('#gw_select')


let currentGw = -1
let uInfo
let gwData
let gwRank


const getCurrentGW = async () => {
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
        case 5:
            return 'Group E'
        case 6:
            return 'Group F'
        case 7:
            return 'Group G'
        case 8:
            return 'Group H'
        default:
            return 'Group'
    }
}

const groupResults = document.querySelector('#group_result')

const clearGroupResult = () => {
    // clear all elements
    while (groupResults.firstChild) groupResults.removeChild(groupResults.firstChild);
}

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

        if (match.point1 > match.point2) {
            td1.classList.add('winner_cell')
        } else if (match.point1 < match.point2) {
            td4.classList.add('winner_cell')
        }

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)

        tbody.appendChild(tr)
    })

    table.appendChild(tbody)
    result.appendChild(table)

    result.appendChild(document.createTextNode('BXH'))

    const table2 = document.createElement('table')
    table2.classList.add('table')
    table2.classList.add('table-bordered')
    table2.classList.add('table-striped')
    table2.classList.add('table-sm')
    const tbody2 = document.createElement('tbody')

    const head2 = document.createElement('thead')
    const trHead2 = document.createElement('tr')
    
    const tdHead2_1 = document.createElement('td')
    const tdHead2_2 = document.createElement('td')
    const tdHead2_3 = document.createElement('td')
    const tdHead2_4 = document.createElement('td')
    const tdHead2_5 = document.createElement('td')
    const tdHead2_6 = document.createElement('td')

    tdHead2_1.appendChild(document.createTextNode('HLV'))
    tdHead2_2.appendChild(document.createTextNode('T'))
    tdHead2_3.appendChild(document.createTextNode('H'))
    tdHead2_4.appendChild(document.createTextNode('B'))
    tdHead2_5.appendChild(document.createTextNode('HS'))
    tdHead2_6.appendChild(document.createTextNode('Đ'))

    trHead2.appendChild(tdHead2_1)
    trHead2.appendChild(tdHead2_2)
    trHead2.appendChild(tdHead2_3)
    trHead2.appendChild(tdHead2_4)
    trHead2.appendChild(tdHead2_5)
    trHead2.appendChild(tdHead2_6)

    head2.append(trHead2)
    table2.appendChild(head2)

    groupInfo.rank.forEach((rank) => {
        const tr2 = document.createElement('tr')
        const td2_1 = document.createElement('td')
        const td2_2 = document.createElement('td')
        const td2_3 = document.createElement('td')
        const td2_4 = document.createElement('td')
        const td2_5 = document.createElement('td')
        const td2_6 = document.createElement('td')

        td2_1.appendChild(document.createTextNode(rank.name))
        td2_2.appendChild(document.createTextNode(rank.win))
        td2_3.appendChild(document.createTextNode(rank.draw))
        td2_4.appendChild(document.createTextNode(rank.lose))
        td2_5.appendChild(document.createTextNode(rank.gd))
        td2_6.appendChild(document.createTextNode(rank.point))

        tr2.appendChild(td2_1)
        tr2.appendChild(td2_2)
        tr2.appendChild(td2_3)
        tr2.appendChild(td2_4)
        tr2.appendChild(td2_5)
        tr2.appendChild(td2_6)

        tbody2.appendChild(tr2)
    })

    table2.appendChild(tbody2)
    result.appendChild(table2)


    result.appendChild(document.createTextNode('---------------------------------------------------'))


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
        await fetch("https://mrbui95.github.io/fpl/data/c1/rank/" + gw + ".json", {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(data => {
            return data.json()
        }).then((data) => {
            let rank = []
            for (let i = 1; i <= 8; i++) {
                const groupInfo = data[i]
                const groupPointRs = Object.keys(groupInfo).map(key => {
                    const rs = groupInfo[key]
                    rs.uid = key
                    rs.name = uInfo[key]['name']
                    return rs
                });
                groupPointRs.sort((u1, u2) => {
                    if (u1.point == u2.point) {
                        return u1.gd < u2.gd ? 1 : -1
                    }
                    return u1.point < u2.point ? 1 : -1
                })
                console.log(groupPointRs)
                rank[i] = groupPointRs
            }
            gwRank = rank
        })


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

            clearGroupResult()

            for (let i = 1; i <= 8; i++) {
                const fixture = groupData[i][gw - 1]
                console.log(fixture)

                const groupName = getGroupName(i)
                listMatch = []

                let listMatchResult = []

                console.log('-----------', groupName, '----------')
                fixture.forEach((match) => {
                    console.log(match)
                    const team1 = match[0]
                    const team2 = match[1]
                    const player1 = gwData[team1]
                    const player2 = gwData[team2]
                    const name1 = uInfo[team1]['name']
                    const name2 = uInfo[team2]['name']
                    const point1 = player1['entry_history']['points'] - player1['entry_history']['event_transfers_cost']
                    const point2 = player2['entry_history']['points'] - player2['entry_history']['event_transfers_cost']

                    listMatchResult = listMatchResult.concat({
                        team1,
                        team2,
                        name1,
                        name2,
                        point1,
                        point2
                    })

                })

                console.log(gwRank[i])

                groupInfo = {
                    listMatchResult,
                    groupName,
                    rank: gwRank[i]
                }

                result = createGroupResult(groupInfo)


                console.log('-----------', groupName, '----------')



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