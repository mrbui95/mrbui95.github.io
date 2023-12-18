const gameWeekSelect = document.querySelector('#gw_select')


let cgw = 1
let currentGw = 1
let uInfo
let gwData
let gwRank


const getCurrentGW = async () => {
    await fetch("https://mrbui95.github.io/amvn/data/current_gw.json", {
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

        cgw = json.current_gw
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

const getGroupName = (index, groupType) => {
    if (groupType == 'PHAN_HANG') {
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
    } else if (groupType === 'C_1234') {
        switch (index) {
            case 1:
                return 'Group C1'
            case 2:
                return 'Group C2'
            case 3:
                return 'Group C3'
            case 4:
                return 'Group C4'
            default:
                return 'Group'
        }
    }

    return 'Group'

}

const groupResults = document.querySelector('#group_result')

const clearGroupResult = () => {
    // clear all elements
    while (groupResults.firstChild) groupResults.removeChild(groupResults.firstChild);
}

const createGroupResult = (groupType, groupInfo, gw) => {
    const result = document.createElement('div')

    // Tên Bảng
    const groupNameEle = document.createElement('div')
    groupNameEle.setAttribute('id', `group_${groupInfo.index}`)
    groupNameEle.innerHTML = groupInfo.groupName
    groupNameEle.style.fontWeight = 800
    groupNameEle.style.padding = '10px 0'
    result.appendChild(groupNameEle)


    if (groupType === 'PHAN_HANG') {
        const table = document.createElement('table')
        table.classList.add('table')
        table.classList.add('table-bordered')
        table.classList.add('table-striped')
        table.classList.add('table-sm')
        const tbody = document.createElement('tbody')


        const head = document.createElement('thead')
        const trHead = document.createElement('tr')

        const tdHead_1 = document.createElement('td')
        const tdHead_2 = document.createElement('td')
        const tdHead_3 = document.createElement('td')
        const tdHead_4 = document.createElement('td')
        const tdHead_5 = document.createElement('td')
        const tdHead_6 = document.createElement('td')
        const tdHead_7 = document.createElement('td')

        tdHead_1.appendChild(document.createTextNode('Hạng'))
        tdHead_2.appendChild(document.createTextNode('HLV'))
        tdHead_3.appendChild(document.createTextNode('GW'))
        tdHead_4.appendChild(document.createTextNode('Team Value'))
        tdHead_5.appendChild(document.createTextNode('TOT'))

        trHead.appendChild(tdHead_1)
        trHead.appendChild(tdHead_2)
        trHead.appendChild(tdHead_3)
        trHead.appendChild(tdHead_4)
        trHead.appendChild(tdHead_5)

        head.append(trHead)
        table.appendChild(head)

        let index = 1;

        groupInfo.rank.forEach((rank) => {
            console.log(rank)
            const tr = document.createElement('tr')
            const td_1 = document.createElement('td')
            const td_2 = document.createElement('td')
            const td_3 = document.createElement('td')
            const td_4 = document.createElement('td')
            const td_5 = document.createElement('td')

            td_1.appendChild(document.createTextNode(index))
            // const link = "https://fantasy.premierleague.com/entry/" + rank.id + "/history"
            const link = "https://fantasy.premierleague.com/entry/" + rank.id + "/event/" + gw
            const aName = document.createElement('a')
            aName.appendChild(document.createTextNode(rank.name))
            aName.setAttribute('href', link)
            aName.setAttribute('target', '_blank')
            td_2.appendChild(aName)
            td_2.classList.add('font_weight_bold')
            td_3.appendChild(document.createTextNode(rank.gw_point))
            td_4.appendChild(document.createTextNode(rank.gd / 10))
            td_5.appendChild(document.createTextNode(rank.point))

            tr.appendChild(td_1)
            tr.appendChild(td_2)
            tr.appendChild(td_3)
            tr.appendChild(td_4)
            tr.appendChild(td_5)

            switch (index) {
                case 1:
                case 2:
                    tr.classList.add('rank_c1')
                    break
                case 3:
                case 4:
                    tr.classList.add('rank_c2')
                    break
                case 5:
                case 6:
                    tr.classList.add('rank_c3')
                    break
                case 7:
                case 8:
                case 9:
                    tr.classList.add('rank_c4')
                    break
            }

            tbody.appendChild(tr)
            index += 1
        })

        table.appendChild(tbody)
        table.style.border = 'solid 1px'
        result.appendChild(table)

    } else if (groupType === 'C_1234') {
        // Kết quả trận đấu vòng
        const table = document.createElement('table')
        table.classList.add('table')
        table.classList.add('table-bordered')
        table.classList.add('table-striped')
        table.classList.add('table-sm')
        const tbody = document.createElement('tbody')


        const gwInfo = cgw < gw ? cgw : gw

        groupInfo.listMatchResult.forEach((match) => {

            const tr = document.createElement('tr')
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')
            const td3 = document.createElement('td')
            const td4 = document.createElement('td')


            if (match.point1 > match.point2) {
                td1.classList.add('winner_cell')
            } else if (match.point1 < match.point2) {
                td4.classList.add('winner_cell')
            }

            const link1 = "https://fantasy.premierleague.com/entry/" + match.team1 + "/event/" + gwInfo
            const aName1 = document.createElement('a')
            aName1.appendChild(document.createTextNode(match.name1))
            aName1.setAttribute('href', link1)
            aName1.setAttribute('target', '_blank')

            const link2 = "https://fantasy.premierleague.com/entry/" + match.team2 + "/event/" + gwInfo
            const aName2 = document.createElement('a')
            aName2.appendChild(document.createTextNode(match.name2))
            aName2.setAttribute('href', link2)
            aName2.setAttribute('target', '_blank')

            td1.appendChild(aName1)
            td1.classList.add('font_weight_bold')
            td2.appendChild(document.createTextNode(match.point1))
            td3.appendChild(document.createTextNode(match.point2))
            td4.appendChild(aName2)
            td4.classList.add('font_weight_bold')

            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)

            tbody.appendChild(tr)
        })

        table.appendChild(tbody)
        table.style.border = 'solid 1px'

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
        const tdHead2_7 = document.createElement('td')

        tdHead2_1.appendChild(document.createTextNode('Hạng'))
        tdHead2_2.appendChild(document.createTextNode('HLV'))
        tdHead2_3.appendChild(document.createTextNode('T'))
        tdHead2_4.appendChild(document.createTextNode('H'))
        tdHead2_5.appendChild(document.createTextNode('B'))
        tdHead2_6.appendChild(document.createTextNode('HS'))
        tdHead2_7.appendChild(document.createTextNode('Đ'))

        tdHead2_1.classList.add('font_weight_bold')
        tdHead2_2.classList.add('font_weight_bold')
        tdHead2_3.classList.add('font_weight_bold')
        tdHead2_4.classList.add('font_weight_bold')
        tdHead2_5.classList.add('font_weight_bold')
        tdHead2_6.classList.add('font_weight_bold')
        tdHead2_7.classList.add('font_weight_bold')

        trHead2.appendChild(tdHead2_1)
        trHead2.appendChild(tdHead2_2)
        trHead2.appendChild(tdHead2_3)
        trHead2.appendChild(tdHead2_4)
        trHead2.appendChild(tdHead2_5)
        trHead2.appendChild(tdHead2_6)
        trHead2.appendChild(tdHead2_7)

        head2.append(trHead2)
        table2.appendChild(head2)

        let index = 1;

        groupInfo.rank.forEach((rank) => {
            const tr2 = document.createElement('tr')
            const td2_1 = document.createElement('td')
            const td2_2 = document.createElement('td')
            const td2_3 = document.createElement('td')
            const td2_4 = document.createElement('td')
            const td2_5 = document.createElement('td')
            const td2_6 = document.createElement('td')
            const td2_7 = document.createElement('td')

            const link = "https://fantasy.premierleague.com/entry/" + rank.id + "/event/" + gwInfo
            const aName = document.createElement('a')
            aName.appendChild(document.createTextNode(rank.name))
            aName.setAttribute('href', link)
            aName.setAttribute('target', '_blank')

            td2_1.appendChild(document.createTextNode(index))
            td2_2.appendChild(aName)
            td2_2.classList.add('font_weight_bold')
            td2_3.appendChild(document.createTextNode(rank.win))
            td2_4.appendChild(document.createTextNode(rank.draw))
            td2_5.appendChild(document.createTextNode(rank.lose))
            td2_6.appendChild(document.createTextNode(rank.gd))
            td2_7.appendChild(document.createTextNode(rank.point))
            td2_7.classList.add('font_weight_bold')

            tr2.appendChild(td2_1)
            tr2.appendChild(td2_2)
            tr2.appendChild(td2_3)
            tr2.appendChild(td2_4)
            tr2.appendChild(td2_5)
            tr2.appendChild(td2_6)
            tr2.appendChild(td2_7)
            

            if (index <= 8) {
                tr2.classList.add('winner_cell')
            }

            tbody2.appendChild(tr2)
            index += 1
        })

        table2.appendChild(tbody2)
        table2.style.border = 'solid 1px'
        result.appendChild(table2)

        result.appendChild(document.createTextNode('---------------------------------------------------'))

    }





    // return result
    groupResults.appendChild(result)
}


const createFinalResult = (gw, data) => {

    console.log(data)
    const result = document.createElement('div')

    for (let i = 1; i <= 4; i++) {
        const groupGame = data[i]

        const groupName = getGroupName(i, 'C_1234')

        // Tên Bảng
        const groupNameEle = document.createElement('div')
        groupNameEle.innerHTML = groupName
        groupNameEle.style.fontWeight = 800
        groupNameEle.style.padding = '10px 0'
        result.appendChild(groupNameEle)

        // Kết quả trận đấu vòng
        const table = document.createElement('table')
        table.classList.add('table')
        table.classList.add('table-bordered')
        table.classList.add('table-striped')
        table.classList.add('table-sm')
        const tbody = document.createElement('tbody')

        let maxGame = 4

        if (gw === 17 || gw === 36) {
            result.appendChild(document.createTextNode('Tứ kết'))
            maxGame = 4
        } else if (gw === 18 || gw === 37) {
            result.appendChild(document.createTextNode('Bán kết'))
            maxGame = 2
        } else if (gw === 19 || gw === 38) {
            result.appendChild(document.createTextNode('Chung kết'))
            maxGame = 2
        }

        for (let j = 1; j <= maxGame; j++) {
            const game = groupGame[j]
            console.log(game)
            if (typeof game === 'undefined')
                continue

            const team1 = game[0]
            const team2 = game[1]
            console.log(team1, team2)

            const player1 = gwData[team1]
            const player2 = gwData[team2]
            const name1 = uInfo[team1]['name']
            const name2 = uInfo[team2]['name']
            const point1 = player1['entry_history']['points'] - player1['entry_history']['event_transfers_cost']
            const point2 = player2['entry_history']['points'] - player2['entry_history']['event_transfers_cost']


            const tr = document.createElement('tr')
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')
            const td3 = document.createElement('td')
            const td4 = document.createElement('td')


            if (point1 > point2) {
                td1.classList.add('winner_cell')
            } else if (point1 < point2) {
                td4.classList.add('winner_cell')
            }


            const link1 = "https://fantasy.premierleague.com/entry/" + team1 + "/event/" + gw
            const aName1 = document.createElement('a')
            aName1.appendChild(document.createTextNode(name1))
            aName1.setAttribute('href', link1)
            aName1.setAttribute('target', '_blank')
            td1.appendChild(aName1)
            td1.classList.add('font_weight_bold')
            td2.appendChild(document.createTextNode(point1))

            const link2 = "https://fantasy.premierleague.com/entry/" + team2 + "/event/" + gw
            const aName2 = document.createElement('a')
            aName2.appendChild(document.createTextNode(name2))
            aName2.setAttribute('href', link2)
            aName2.setAttribute('target', '_blank')
            td3.appendChild(document.createTextNode(point2))
            td4.appendChild(aName2)
            td4.classList.add('font_weight_bold')

            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)

            tbody.appendChild(tr)
        }

        table.appendChild(tbody)
        table.style.border = 'solid 1px'

        result.appendChild(table)



    }

    groupResults.appendChild(result)
}

const getUserData = async () => {
    console.log('==========GET USER DATA============')

    await fetch("https://mrbui95.github.io/amvn/data/u_info.json", {
        method: "GET",
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
    }).then(data => {
        return data.json()
    }).then(data => uInfo = data)

    let gw = currentGw % 19
    if (gw === 0) {
        gw = currentGw
    }
    let urlGroupFixture = ''
    let maxGroup = -1
    let groupType = ''
    let fixtureIndex = 1
    if (gw <= 8) {
        urlGroupFixture = 'https://mrbui95.github.io/amvn/data/c1/group_period1_1.json'
        maxGroup = 8
        groupType = 'PHAN_HANG'
        fixtureIndex = gw - 1
    } else if (gw < 17) {
        urlGroupFixture = 'https://mrbui95.github.io/amvn/data/c1/group_period2_1.json'
        maxGroup = 4
        groupType = 'C_1234'
        fixtureIndex = gw - 8
    }

    // Xóa dữ liệu cũ
    clearGroupResult()

    // Tên Vòng đấu
    let groupTypeName = ''
    switch (groupType) {
        case 'PHAN_HANG':
            groupTypeName = 'VÒNG PHÂN HẠNG'
            break
        case 'C_1234':
            groupTypeName = 'VÒNG BẢNG'
            break
        default:
            groupTypeName = 'VÒNG CHUNG KẾT'
            break
    }

    const groupTypeNameEle = document.createElement('div')
    groupTypeNameEle.setAttribute('id', `group_type_name`)
    groupTypeNameEle.innerHTML = groupTypeName
    groupTypeNameEle.style.fontWeight = 1000
    groupTypeNameEle.style.padding = '10px 0'
    groupResults.appendChild(groupTypeNameEle)



    await fetch("https://mrbui95.github.io/amvn/data/c1/result/" + gw + ".json", {
        method: "GET",
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
    }).then(data => {
        return data.json()
    }).then(data => gwData = data)


    if (gw < 17 || (gw > 19 && gw < 36)) {
        await fetch("https://mrbui95.github.io/amvn/data/c1/rank/" + gw + ".json", {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(data => {
            return data.json()
        }).then((data) => {
            let rank = []
            for (let i = 1; i <= maxGroup; i++) {
                const groupInfo = data[i]
                let groupPointRs = Object.keys(groupInfo).map(key => {
                    const rs = groupInfo[key]
                    rs.uid = key
                    rs.name = uInfo[key] ? uInfo[key]['name'] : key
                    return rs
                });
                console.log(groupPointRs)
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

        await fetch(urlGroupFixture, {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(data => {
            return data.json()
        }).then((groupData) => {
            console.log(groupData)

            

            for (let i = 1; i <= maxGroup; i++) {
                const groupName = getGroupName(i, groupType)

                if (gw <= 8) {
                    groupInfo = {
                        index: i,
                        groupName,
                        rank: gwRank[i]
                    }

                    result = createGroupResult(groupType, groupInfo, gw)
                } else if (gw < 17) {
                    const fixture = groupData[i][fixtureIndex]
                    console.log(fixture)


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
                        index: i,
                        listMatchResult,
                        groupName,
                        rank: gwRank[i]
                    }

                    result = createGroupResult(groupType, groupInfo, gw)

                    console.log('-----------', groupName, '----------')
                }
            }
        })

    } else {
        await fetch("https://mrbui95.github.io/amvn/data/c1/final_" + gw + ".json", {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(data => {
            return data.json()
        }).then((data) => {
            console.log(data)

            createFinalResult(gw, data)
        })
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