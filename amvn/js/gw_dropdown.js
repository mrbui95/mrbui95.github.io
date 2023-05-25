const gameWeekSelect = document.querySelector('#gw_select')


currentGw = 1

const getCurrentGW =  async () => {
    fetch("https://mrbui95.github.io/fpl/data/current_gw.json", {
        method: "GET",
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
    }).then(data => console.log(data.json()))
}




for (let i = 1; i < 39; i += 1) {
    const option = document.createElement('option')
    option.appendChild(document.createTextNode(i))
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
    getCurrentGW()
}

getCurrentGW()