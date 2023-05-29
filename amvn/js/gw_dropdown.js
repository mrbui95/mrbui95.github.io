const gameWeekSelect = document.querySelector('#gw_select')


let currentGw = -1

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

const gameWeekSelectOnChange = (e) => {
    currentGw = e.target.value
    reloadPage()
}

gameWeekSelect.onchange = gameWeekSelectOnChange

const reloadPage = () => {
    console.log('reload page')
}