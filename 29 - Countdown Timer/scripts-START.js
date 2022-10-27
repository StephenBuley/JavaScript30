let countdown

const timerDisplay = document.querySelector(".display__time-left")
const endTime = document.querySelector(".display__end-time")
const buttons = document.querySelectorAll("[data-time]")

function timer(seconds) {
    clearInterval(countdown) // clear existing timers

    const now = Date.now()
    const then = now + seconds * 1000
    displayTimeLeft(seconds)
    displayEndTime(then)
    countdown = setInterval(function () {
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        if (secondsLeft < 0) {
            clearInterval(countdown)
            return
        }
        displayTimeLeft(secondsLeft)
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainderSeconds = String(seconds % 60).padStart(2, "0")
    const display = `${minutes}:${remainderSeconds}`
    timerDisplay.textContent = display
    document.title = display
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp)
    const hours = end.getHours()
    const minutes = end.getMinutes()
    endTime.textContent = `Be Back At ${hours > 12 ? hours - 12 : hours}:${String(minutes).padStart(2, "0")}`
}

function startTimer() {
    const seconds = parseInt(this.dataset.time)
    timer(seconds)
}

document.customForm.addEventListener("submit", function(e) {
    e.preventDefault()
    const mins = this.minutes.value
    timer(mins * 60)
    this.reset()
})
buttons.forEach(button => button.addEventListener('click', startTimer))