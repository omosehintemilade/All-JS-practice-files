const ourfield = document.querySelector('.our-field')
const ourform = document.querySelector('.our-form')
const problemelement = document.querySelector('.problem')
const pointsneeded = document.querySelector('.pointsneeded')
const mistakesallowed = document.querySelector('.mistakesallowed')
const progressbar = document.querySelector('.progress-inner')
const endmessage = document.querySelector('.endmessage')
const button = document.querySelector('.button')

function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1))
}

function generateproblem() {
    return {
        numberone: generateNumber(10),
        numbertwo: generateNumber(10),
        operator: ['+', '-', 'x'][generateNumber(2)]
    }
}

let state = {
    score: 0,
    wronganswers: 0
}

function updateproblem() {
    state.currentproblem = generateproblem()
    problemelement.textContent = `${state.currentproblem.numberone} ${state.currentproblem.operator} ${state.currentproblem.numbertwo}`
    ourfield.value = ''
    ourfield.focus()
}

updateproblem();



ourform.addEventListener('submit', handlesubmit)

function handlesubmit(e) {
    e.preventDefault();

    let correctanswer
    const p = state.currentproblem
    if (p.operator === '+') correctanswer = p.numberone + p.numbertwo
    if (p.operator === '-') correctanswer = p.numberone - p.numbertwo
    if (p.operator === 'x') correctanswer = p.numberone * p.numbertwo

    if (parseInt(ourfield.value, 10) === correctanswer) {
        state.score++
            pointsneeded.textContent = 10 - state.score;
        updateproblem()
        renderprogressbar()
    } else {
        state.wronganswers++
            mistakesallowed.textContent = 2 - state.wronganswers
        updateproblem()
        problemelement.classList.add('animate-wrong')
        setTimeout(function() { problemelement.classList.remove('animate-wrong') }, 331)

    }
    checklogic()
}

function checklogic() {
    // if you win
    if (state.score === 10) {
        endmessage.textContent = 'Congrats. You Won'
        document.body.classList.add('overlay-is-open')
        setTimeout(function() { button.focus() }, 331)
    }

    if (state.wronganswers === 2) {
        endmessage.textContent = 'Sorry. You Lost'
        document.body.classList.add('overlay-is-open')
        setTimeout(function() { button.focus() }, 331)
    }
}
button.addEventListener('click', resetgame)


function resetgame() {
    document.body.classList.remove('overlay-is-open')
    updateproblem()
    state.score = 0
    state.wronganswers = 0
    pointsneeded.textContent = 10
    mistakesallowed.textContent = 2
    renderprogressbar()
}

function renderprogressbar() {
    progressbar.style.transform = `scaleX(${state.score / 10})`
}