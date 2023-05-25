const gameWeekSelect = document.querySelector('#gw_select')

let currentGw = 8

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