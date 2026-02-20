let focusInterval = null;
let breakInterval = null;

chrome.runtime.onInstalled.addListener(() => {
    console.log("Focus Extension Installed 🚀");
});

function startTimer(minutes) {

    const totalMs = minutes * 60 * 1000;
    const endTime = Date.now() + totalMs;

    chrome.storage.local.set({
        focusEndTime: endTime,
        focusRemaining: totalMs,
        focusActive: true,
        focusPaused: false,
        previousFocusTime: minutes,
        focusStopped: false
    });

    runFocusTimer();
}


function runFocusTimer() {

    if (focusInterval) clearInterval(focusInterval);

    focusInterval = setInterval(() => {

        chrome.storage.local.get(
            ["focusEndTime", "focusPaused"],
            (data) => {

                if (!data.focusEndTime || data.focusPaused) return;

                const remaining = data.focusEndTime - Date.now();

                if (remaining <= 0) {

                    clearInterval(focusInterval);

                    chrome.storage.local.set({
                        focusActive: false,
                        focusRemaining: 0,
                        focusEndTime: null,
                        focusPaused: false,
                        focusStopped: true
                    });

                    
                    chrome.notifications.create({
                        type: "basic",
                        iconUrl: "icons/icon128.png",  
                        title: "Focus Completed 🎉",
                        message: "Your focus session is finished!"
                    });

                } else {

                    chrome.storage.local.set({
                        focusRemaining: remaining
                    });
                }
            }
        );

    }, 1000);
}


function pauseTimer() {
    clearInterval(focusInterval);
    chrome.storage.local.set({ focusPaused: true });
}


function resumeTimer() {

    chrome.storage.local.get(["focusRemaining"], (data) => {

        if (!data.focusRemaining) return;

        const newEndTime = Date.now() + data.focusRemaining;

        chrome.storage.local.set({
            focusEndTime: newEndTime,
            focusPaused: false
        });

        runFocusTimer();
    });
}


function stopTimer() {

    clearInterval(focusInterval);

    chrome.storage.local.get(["previousFocusTime"], (data) => {

        chrome.storage.local.set({
            focusActive: false,
            focusRemaining: 0,
            focusEndTime: null,
            focusPaused: false,
            focusStopped: true,
            previousFocusTime: data.previousFocusTime || 25
        });

    });
}


function startBreak(minutes) {

    const totalMs = minutes * 60 * 1000;
    const endTime = Date.now() + totalMs;

    chrome.storage.local.set({
        breakEndTime: endTime,
        breakRemaining: totalMs,
        breakActive: true,
        breakCompleted: false
    });

    runBreakTimer();
}


function runBreakTimer() {

    if (breakInterval) clearInterval(breakInterval);

    breakInterval = setInterval(() => {

        chrome.storage.local.get(["breakEndTime"], (data) => {

            if (!data.breakEndTime) return;

            const remaining = data.breakEndTime - Date.now();

            if (remaining <= 0) {

                clearInterval(breakInterval);

                chrome.storage.local.set({
                    breakActive: false,
                    breakRemaining: 0,
                    breakCompleted: true
                });

            } else {

                chrome.storage.local.set({
                    breakRemaining: remaining
                });
            }

        });

    }, 1000);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "START_TIMER") {
        startTimer(message.minutes);
        sendResponse({ status: "started" });
        return true;
    }

    if (message.type === "PAUSE_TIMER") {
        pauseTimer();
        sendResponse({ status: "paused" });
        return true;
    }

    if (message.type === "RESUME_TIMER") {
        resumeTimer();
        sendResponse({ status: "resumed" });
        return true;
    }

    if (message.type === "STOP_TIMER") {
        stopTimer();
        sendResponse({ status: "stopped" });
        return true;
    }

    if (message.type === "START_BREAK") {
        startBreak(message.minutes);
        sendResponse({ status: "break_started" });
        return true;
    }

    if (message.type === "GET_STATUS") {
        chrome.storage.local.get(null, (data) => {
            sendResponse(data);
        });
        return true;
    }

});
