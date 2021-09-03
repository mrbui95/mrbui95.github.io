const LEAGUE_CLASSIC_ID = '290179'

const getInfo = async (url, params, callback) => {
    try {
        const result = await fetch(url, {
            method: "GET",
            headers: {"Content-type": "application/json;charset=UTF-8"}
          })
          .then(response => response.json())
          .then(json => callback(json, params))
    } catch (err) {
        console.log(err)
    }
}

let gw = 1

const gameWeekSelect = document.querySelector('.js-form-select')

for (let i = 1; i < 39; i += 1) {
    const option = document.createElement('option')
    option.appendChild(document.createTextNode(i))
    if (i === gw) {
        option.setAttribute('selected', true)
    }

    gameWeekSelect.appendChild(option)
}

const gameWeekSelectOnChange = (e) => {
    gw = e.target.value
    reloadPage()
}

gameWeekSelect.onchange = gameWeekSelectOnChange

const tableResults = document.querySelector('.results')

const createTableRow = (member) => {
    const tr = document.createElement('tr')

    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')
    const td4 = document.createElement('td')
    const td5 = document.createElement('td')
    const td6 = document.createElement('td')
    const td7 = document.createElement('td')

    td1.appendChild(document.createTextNode(member.entry))
    td2.appendChild(document.createTextNode(member.entry_name))
    td3.appendChild(document.createTextNode(member.player_name))
    td4.appendChild(document.createTextNode(member.event_total))
    td5.appendChild(document.createTextNode(member.transfers))
    td6.appendChild(document.createTextNode(member.transfersCost))
    td7.appendChild(document.createTextNode(member.total))

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
    tr.appendChild(td7)

    tableResults.appendChild(tr)
}

const resetTableInfo = () => {
    tableResults.innerHTML = ''
}


const getListClassicMemberId = (leagueId, gameweek) => {
    const BASE_URL = 'https://fantasy.premierleague.com/api/leagues-classic/'

    const listMember = []

    const listPromise = []

    const processData = (data, params) => {
        const { page, pageType } = params

        const standings = data ? data.standings : null

        if (standings) {
            if (standings.results) {
                standings.results.forEach(element => {
                    listMember.push(element)
                });
            }
        } else {
            console.log('Data is null')
        }
    }

    const getListMemberPage = async (page, pageType = '1') => {
        const url = `${BASE_URL}${leagueId}/standings/?page_new_entries=1&page_standings=${page}&phase=${pageType}`

        const params = {
            page,
            pageType,
        }

        await getInfo(url, params, processData)
    }

    const promise1 = getListMemberPage('1')
    const promise2 = getListMemberPage('2')
    listPromise.push(promise1)
    listPromise.push(promise2)
    

    Promise.all(listPromise).then(() => {
        listMember.forEach(async (member, index) => {
            const entryId = member.entry

            const urlInfo = `https://fantasy.premierleague.com/api/entry/${entryId}/event/${gameweek}/picks/`

            getInfo(urlInfo, null, (data) => {
                const newMember = {
                    ...member,
                }
                const { points, event_transfers: transfers, event_transfers_cost: transfersCost } = data.entry_history
                newMember.event_total = points
                newMember.transfers = transfers
                newMember.transfersCost = transfersCost
                newMember.total = newMember.event_total - transfersCost
                if (transfersCost > 0) console.log(member, transfersCost)

                listMember.splice(index, 1, newMember)

                if (index === listMember.length - 1) {
                    console.log(listMember)

                    const rank = listMember.sort((m1, m2) => {
                        if (m1.total < m2.total) return 1
                        else if (m1.total === m2.total) return 0
                        return -1
                    })

                    console.log(rank)

                    rank.forEach((m) => {
                        createTableRow(m)
                    })
                }
            })
        })

        
        
        // console.log(rank)
    })
    return listMember
}

// getInfo('290179/standings/?page_new_entries=1&page_standings=1&phase=1', null,  )
getInfo('https://fantasy.premierleague.com/api/entry/375/event/2/picks/', null, data => console.log(data))


const reloadPage = () => {
    resetTableInfo()

    getListClassicMemberId(LEAGUE_CLASSIC_ID, gw)
}


getListClassicMemberId(LEAGUE_CLASSIC_ID, gw)

