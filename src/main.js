"use strict"

const ANIMATION_DELAY = 500
const OPENING_TIME = 2000

let cardsTable = generateCardTable()
renderRestartButton()
render(cardsTable)

function open_closeCard(id) {
    cardsTable = cardsTable.map(v => {
        if (v.id === id) {
            return changeState(v)
        }
        return v
    })
}

function check() {
    let checkList = cardsTable.filter(v => v.isChecking)
    render(cardsTable)
    if (checkList.length === 2) {
        if (checkNumberIsSame(checkList[0], checkList[1])) {
            cardsTable = verified(cardsTable)
            render(cardsTable)
        } else {
            const id1 = checkList[0].id
            const id2 = checkList[1].id
            open_closeCard(id1)
            open_closeCard(id2)
            setTimeout(() => render(cardsTable), OPENING_TIME)
        }
    }
}

function handleClick(id) {
    setTimeout(() => {
        open_closeCard(id)
        check()
    }, ANIMATION_DELAY)
    renderSingle(id)
}

function restart() {
    cardsTable = generateCardTable()
    render(cardsTable)
}

function renderSingle(id) {
    const card = document.getElementById(id)
    card.classList.add('back')
}

function render(cardsTable) {
    const container = document.getElementById('container')
    container.innerHTML = ``

    for (const item of cardsTable) {
        container.appendChild(renderCard(item))
    }
}

function renderCard(item) {
    const { isOpen, id, card_shape, card_number, isVerified } = item
    const card = document.createElement('a')
    
    card.id = id
    card.innerHTML = `<span>${isOpen ? card_number : ''}</span>
        <div class='card-shape ${isOpen && card_shape}'></div>`
        
    card.classList.add('card')
    isVerified && card.classList.add('verified-card')
    !isOpen && card.classList.add('hidden')
    !isVerified && card.addEventListener('click', () => handleClick(id))
    return card
}

function renderRestartButton() {
    const panel = document.getElementById('control-panel')
    const button = document.createElement('button')

    panel.appendChild(button)
    button.classList.add('control-btn')
    button.innerHTML = `restart`
    button.addEventListener('click', () => restart())
}

function checkNumberIsSame(openedCard, openingCard) {
    if (openedCard.card_number === openingCard.card_number) {
        return true
    }
    return false
}

function changeState(state) {
    return {
        ...state,
        isOpen: !state.isOpen,
        isChecking: !state.isChecking,  // !undefined === true
    }
}

function verified(list) {
    return list.map(v => {
        if (v.isChecking) {
            return {
                ...v,
                isChecking: false,
                isVerified: true,
            }
        }
        return v
    })
}

function generateCardTable() {
    let table = generateOriginCardTable()

    for (let i=0; i<table.length; i++) {
        let rand = generateRandom(table.length) - 1
        let tmp = table[rand]
        table[rand] = table[i]
        table[i] = tmp
    }
    return table
}

function generateOriginCardTable() {
    const shapes = [
        'spade', //黑桃
        'heart', //紅心,
        'diamond', //方塊
        'club', //梅花
    ]
    let table = []
    let key = 0

    for (let i=0; i<13; i++) {
       for (let j=0; j<4; j++) {
           table[key] = {
               id: key,
               card_shape: shapes[j],
               card_number: numberToString(i + 1),
               isOpen: false,
           }
           key += 1
       }
    }
    return table
}

function numberToString(number= 0) {
    switch (number) {
        case 11: 
            return 'J'
        case 12:
            return 'Q'
        case 13: 
            return 'K'
        default:
            return number.toString()
    }
}

function generateRandom(n) {
    return Math.floor(Math.random()*n + 1)
}
