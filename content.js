console.log("Advanced Focus Engine Loaded 🚀");



function applyFocusMode() {

    if (document.getElementById("yt-focus-style")) return;

    const style = document.createElement("style");
    style.id = "yt-focus-style";
    style.textContent = `
        #secondary,
        #comments,
        #related,
        ytd-watch-next-secondary-results-renderer {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
}

function removeFocusMode() {
    const style = document.getElementById("yt-focus-style");
    if (style) style.remove();
}


function showBreakBomb() {

    if (document.getElementById("break-bomb")) return;

    const bomb = document.createElement("div");
    bomb.id = "break-bomb";

    bomb.innerHTML = `
        <div class="bomb-box">
            <div class="bomb-title">⏳ Break Time</div>
            <div id="bombTime">00:00</div>
        </div>
    `;

    document.body.appendChild(bomb);

    const style = document.createElement("style");
    style.id = "break-bomb-style";
    style.textContent = `
        #break-bomb {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999999;
            animation: fadeIn 0.3s ease;
        }

        .bomb-box {
            background: linear-gradient(145deg, #1f1f35, #2c2c4a);
            color: white;
            padding: 16px;
            border-radius: 14px;
            width: 140px;
            text-align: center;
            font-weight: bold;
            box-shadow: 0 0 25px rgba(0,0,0,0.6);
            border: 1px solid rgba(255,255,255,0.1);
        }

        .bomb-title {
            font-size: 13px;
            margin-bottom: 6px;
            color: #ff9800;
        }

        #bombTime {
            font-size: 20px;
            font-weight: bold;
            color: #00ffc3;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    const interval = setInterval(() => {

        chrome.storage.local.get(["breakRemaining", "breakActive"], data => {

            if (!data.breakActive) {
                clearInterval(interval);
                const el = document.getElementById("break-bomb");
                if (el) el.remove();
                return;
            }

            if (!data.breakRemaining) return;

            let total = Math.floor(data.breakRemaining / 1000);
            let m = Math.floor(total / 60);
            let s = total % 60;

            const el = document.getElementById("bombTime");
            if (el) {
                el.textContent =
                    `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
            }

        });

    }, 1000);
}


function showStopPopup(previousTime) {

    if (document.getElementById("stop-popup")) return;

    const overlay = document.createElement("div");
    overlay.id = "stop-popup";

    overlay.innerHTML = `
        <div class="popup-box">
            <h2>Focus Stopped</h2>
            <p>What would you like to do?</p>

            <button id="takeBreak">⏳ Take 5 Min Break</button>
            <button id="restartFocus">🔁 Restart ${previousTime} Min</button>
            <button id="quitAll">❌ Quit</button>
        </div>
    `;

    document.body.appendChild(overlay);

    const style = document.createElement("style");
    style.id = "stop-popup-style";
    style.textContent = `
        #stop-popup {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.75);
            backdrop-filter: blur(6px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999999;
            animation: fadeIn 0.3s ease;
        }

        .popup-box {
            background: linear-gradient(145deg, #1f1f35, #2c2c4a);
            padding: 28px;
            border-radius: 16px;
            width: 320px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.6);
            color: white;
            animation: popUp 0.3s ease;
        }

        .popup-box h2 {
            margin-bottom: 10px;
        }

        .popup-box p {
            font-size: 14px;
            margin-bottom: 18px;
            color: #ccc;
        }

        .popup-box button {
            display: block;
            width: 100%;
            margin-top: 12px;
            padding: 10px;
            border-radius: 8px;
            border: none;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        #takeBreak {
            background: #ff9800;
            color: white;
        }

        #takeBreak:hover {
            background: #f57c00;
            transform: translateY(-2px);
        }

        #restartFocus {
            background: #4CAF50;
            color: white;
        }

        #restartFocus:hover {
            background: #43a047;
            transform: translateY(-2px);
        }

        #quitAll {
            background: #f44336;
            color: white;
        }

        #quitAll:hover {
            background: #d32f2f;
            transform: translateY(-2px);
        }

        @keyframes popUp {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.getElementById("takeBreak").onclick = () => {
        chrome.runtime.sendMessage({ type: "START_BREAK", minutes: 5 });
        overlay.remove();
    };

    document.getElementById("restartFocus").onclick = () => {
        chrome.runtime.sendMessage({ type: "START_TIMER", minutes: previousTime });
        overlay.remove();
    };

    document.getElementById("quitAll").onclick = () => overlay.remove();
}



chrome.storage.onChanged.addListener((changes) => {

    if (changes.focusActive) {
        if (changes.focusActive.newValue) applyFocusMode();
        else removeFocusMode();
    }

    if (changes.focusStopped && changes.focusStopped.newValue === true) {
        chrome.storage.local.get(["previousFocusTime"], data => {
            showStopPopup(data.previousFocusTime || 25);
        });
    }

    if (changes.breakActive && changes.breakActive.newValue === true) {
        removeFocusMode();
        showBreakBomb();
    }

    if (changes.breakCompleted && changes.breakCompleted.newValue === true) {
        alert("Break Completed! Set your focus timer again.");
    }
});


chrome.storage.local.get(["focusActive"], (data) => {
    if (data.focusActive) {
        applyFocusMode();
    }
});
