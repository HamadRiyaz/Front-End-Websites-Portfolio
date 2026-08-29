// =====================================
// Smart Study Planner
// focus.js
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // Elements
    // ==============================

    const timer = document.getElementById("timer");
    const modeName = document.getElementById("modeName");

    const startBtn = document.getElementById("startBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const resetBtn = document.getElementById("resetBtn");

    const modeButtons = document.querySelectorAll(".mode");

    const sessionCounter = document.getElementById("sessions");
    const focusHours = document.getElementById("focusHours");

    const historyList = document.getElementById("history");

    // ==============================
    // Local Storage
    // ==============================

    let sessions = Number(localStorage.getItem("focusSessions")) || 0;

    let totalFocusMinutes =
        Number(localStorage.getItem("focusMinutes")) || 0;

    let history =
        JSON.parse(localStorage.getItem("focusHistory")) || [];

    sessionCounter.textContent = sessions;

    focusHours.textContent =
        (totalFocusMinutes / 60).toFixed(1) + "h";

    // ==============================
    // Variables
    // ==============================

    let defaultMinutes = 25;

    let minutes = defaultMinutes;

    let seconds = 0;

    let timerInterval = null;

    let running = false;

    // ==============================
    // Display Timer
    // ==============================

    function updateDisplay() {

        let min = String(minutes).padStart(2, "0");

        let sec = String(seconds).padStart(2, "0");

        timer.textContent = `${min}:${sec}`;

    }

    updateDisplay();

    // ==============================
    // Display History
    // ==============================

    function displayHistory() {

        if (!historyList) return;

        historyList.innerHTML = "";

        if (history.length == 0) {

            historyList.innerHTML =
                "<li>No Focus Sessions Yet</li>";

            return;

        }

        history.forEach(function (item) {

            historyList.innerHTML += `<li>✔ ${item}</li>`;

        });

    }

    displayHistory();

    // ==============================
    // Start Timer
    // ==============================

    function startTimer() {

        if (running) return;

        running = true;

        timerInterval = setInterval(function () {

            if (seconds == 0) {

                if (minutes == 0) {

                    clearInterval(timerInterval);

                    running = false;

                    if (defaultMinutes == 25) {

                        sessions++;

                        totalFocusMinutes += 25;

                        sessionCounter.textContent = sessions;

                        focusHours.textContent =
                            (totalFocusMinutes / 60).toFixed(1) + "h";

                        localStorage.setItem(
                            "focusSessions",
                            sessions
                        );

                        localStorage.setItem(
                            "focusMinutes",
                            totalFocusMinutes
                        );

                        let today =
                            new Date().toLocaleDateString();

                        history.unshift(
                            "Focus Session - 25 min (" + today + ")"
                        );

                        if (history.length > 10) {

                            history.pop();

                        }

                        localStorage.setItem(
                            "focusHistory",
                            JSON.stringify(history)
                        );

                        displayHistory();

                    }

                    alert("🎉 Focus Session Completed!");

                    return;

                }

                minutes--;

                seconds = 59;

            }

            else {

                seconds--;

            }

            updateDisplay();

        }, 1000);

    }
        // ==============================
    // Pause Timer
    // ==============================

    function pauseTimer() {

        clearInterval(timerInterval);

        running = false;

    }

    // ==============================
    // Reset Timer
    // ==============================

    function resetTimer() {

        clearInterval(timerInterval);

        running = false;

        minutes = defaultMinutes;

        seconds = 0;

        updateDisplay();

    }

    // ==============================
    // Button Events
    // ==============================

    startBtn.addEventListener("click", startTimer);

    pauseBtn.addEventListener("click", pauseTimer);

    resetBtn.addEventListener("click", resetTimer);

    // ==============================
    // Change Mode
    // ==============================

    modeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            modeButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            defaultMinutes = Number(button.dataset.time);

            minutes = defaultMinutes;

            seconds = 0;

            updateDisplay();

            clearInterval(timerInterval);

            running = false;

            if (defaultMinutes == 25) {

                modeName.textContent = "Focus Session";

            }

            else if (defaultMinutes == 5) {

                modeName.textContent = "Short Break";

            }

            else {

                modeName.textContent = "Long Break";

            }

        });

    });

    // ==============================
    // Music Selection
    // ==============================

    const musicItems = document.querySelectorAll(".music-item");

    musicItems.forEach(function (item) {

        item.addEventListener("click", function () {

            musicItems.forEach(function (m) {

                m.style.background = "#f8fbff";

                m.style.color = "#1f2937";

            });

            item.style.background =
                "linear-gradient(135deg,#6670f8,#9d6cf8)";

            item.style.color = "white";

        });

    });

    // ==============================
    // Session History Hover
    // ==============================

    function applyHistoryHover() {

        const items = document.querySelectorAll(".history li");

        items.forEach(function (item) {

            item.addEventListener("mouseenter", function () {

                item.style.transform = "translateX(8px)";

            });

            item.addEventListener("mouseleave", function () {

                item.style.transform = "translateX(0)";

            });

        });

    }

    applyHistoryHover();

    const oldDisplayHistory = displayHistory;

    displayHistory = function () {

        oldDisplayHistory();

        applyHistoryHover();

    };

});