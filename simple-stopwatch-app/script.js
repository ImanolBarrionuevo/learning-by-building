/** Get the timer, start, stop, and reset button elements */
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

/** Set the initial text content of the timer element */
const mainTimeEl = document.getElementById("main-time"); // 00:00:00
const msEl = document.getElementById("ms"); // .00 (milliseconds)

/** Timer state variables */
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let intervalId = null;
stopBtn.disabled = true;
resetBtn.disabled = true;

/** Initialize the timer display */
function startTimer() {
    if (isRunning) return;

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        const formatted = formatTimeParts(elapsedTime);
        mainTimeEl.textContent = formatted.main;
        msEl.textContent = formatted.ms;
    }, 10);

    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
    isRunning = true;
}

/** Stop the timer */
function stopTimer() {
    if (!isRunning) return;
    resetButtonsAndStopTimer();
    resetBtn.disabled = false;
}

/** Reset the timer to its initial state */
function resetTimer() {
    resetButtonsAndStopTimer()
    elapsedTime = 0;
    mainTimeEl.textContent = "00:00:00";
    msEl.textContent = ".00";
    resetBtn.disabled = true;
}

/** Reset the buttons and stop the timer */
function resetButtonsAndStopTimer() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    isRunning = false;
}

/** Format the elapsed time into hours, minutes, seconds, and milliseconds */
function formatTimeParts(elapsedTime) {
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    const main =
        (hours > 9 ? hours : "0" + hours) + ":" +
        (minutes > 9 ? minutes : "0" + minutes) + ":" +
        (seconds > 9 ? seconds : "0" + seconds);

    const ms = "." + (milliseconds > 9 ? milliseconds : "0" + milliseconds);

    return { main, ms };
}

/** Add event listeners to the buttons and keydown events */
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        event.preventDefault();
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    }
});
