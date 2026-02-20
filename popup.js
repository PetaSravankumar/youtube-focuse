const toggle = document.getElementById("toggleFocus");
const clock = document.getElementById("clock");
const clockTime = document.getElementById("clockTime");
const numbersContainer = document.getElementById("clockNumbers");
const progressRing = document.getElementById("progressRing");

const startBtn = document.getElementById("startTimer");
const pauseBtn = document.getElementById("pauseTimer");
const resumeBtn = document.getElementById("resumeTimer");
const stopBtn = document.getElementById("stopTimer");

let interval;
let selectedMinutes = 25;
let initialTotalSeconds = selectedMinutes * 60;

clockTime.textContent = "25:00";

/* ============================
   GENERATE CLOCK NUMBERS
============================ */

function generateClockNumbers() {

    numbersContainer.innerHTML = "";

    for (let i = 5; i <= 60; i += 5) {

        const angle = (i / 60) * 360;
        const span = document.createElement("span");
        span.textContent = i;

        const radius = 75;
        const center = 90;

        const x = center + radius * Math.cos((angle - 90) * Math.PI / 180);
        const y = center + radius * Math.sin((angle - 90) * Math.PI / 180);

        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        span.style.position = "absolute";
        span.style.transform = "translate(-50%, -50%)";

        numbersContainer.appendChild(span);
    }
}

generateClockNumbers();

/* ============================
   UPDATE PROGRESS RING
============================ */

function updateProgress(remainingSeconds) {

    if (!initialTotalSeconds) return;

    const progress = remainingSeconds / initialTotalSeconds;
    const degrees = progress * 360;

    progressRing.style.transform = `rotate(${degrees}deg)`;
}

/* ============================
   CLOCK CLICK SELECT
============================ */

clock.addEventListener("click", (e) => {

    const rect = clock.getBoundingClientRect();

    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle += 90;
    if (angle < 0) angle += 360;

    let minutes = Math.round((angle / 360) * 60);
    if (minutes === 0) minutes = 60;

    selectedMinutes = minutes;
    initialTotalSeconds = minutes * 60;

    clockTime.textContent = `${minutes.toString().padStart(2,"0")}:00`;

    updateProgress(initialTotalSeconds);
});

/* ============================
   START
============================ */

startBtn.addEventListener("click", () => {

    chrome.runtime.sendMessage({
        type: "START_TIMER",
        minutes: selectedMinutes
    });

    toggle.checked = true;
    startDisplayUpdater();
});

/* ============================
   PAUSE
============================ */

pauseBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "PAUSE_TIMER" });
});

/* ============================
   RESUME
============================ */

resumeBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "RESUME_TIMER" });
});

/* ============================
   STOP
============================ */

stopBtn.addEventListener("click", () => {

    chrome.runtime.sendMessage({ type: "STOP_TIMER" });

    toggle.checked = false;
    clearInterval(interval);

    clockTime.textContent = "00:00";
    updateProgress(0);
});

/* ============================
   DISPLAY TIMER
============================ */

function startDisplayUpdater() {

    clearInterval(interval);

    interval = setInterval(() => {

        chrome.runtime.sendMessage({ type: "GET_STATUS" }, (response) => {

            if (!response) return;

            let remaining = response.focusRemaining || 0;

            if (remaining <= 0) {
                clearInterval(interval);
                clockTime.textContent = "00:00";
                updateProgress(0);
                toggle.checked = false;
                return;
            }

            let totalSeconds = Math.floor(remaining / 1000);
            let mins = Math.floor(totalSeconds / 60);
            let secs = totalSeconds % 60;

            clockTime.textContent =
                `${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`;

            updateProgress(totalSeconds);
        });

    }, 1000);
}

/* ============================
   RESTORE STATE
============================ */

chrome.runtime.sendMessage({ type: "GET_STATUS" }, (response) => {

    if (response && response.focusActive) {

        toggle.checked = true;

        if (response.focusRemaining) {
            initialTotalSeconds =
                Math.floor(response.focusRemaining / 1000);
        }

        startDisplayUpdater();
    }
});

/* ============================
   TOGGLE FOCUS MODE
============================ */

toggle.addEventListener("change", () => {

    chrome.storage.local.set({
        focusActive: toggle.checked
    });

});
