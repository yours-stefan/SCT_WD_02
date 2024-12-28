// Enhanced Stopwatch variables
let timerInterval;
let isRunning = false;
let milliseconds = 0, seconds = 0, minutes = 0, hours = 0;
let lapCount = 0;
let laps = [];

// DOM Elements
const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapList = document.getElementById("lapList");

// Format the time display
function formatTime() {
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
    timeDisplay.textContent = formattedTime;
}

// Start the stopwatch
function startStopwatch() {
    if (isRunning) return; // Prevent multiple intervals
    isRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    lapButton.disabled = false;

    timerInterval = setInterval(function() {
        milliseconds += 10;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        formatTime();
    }, 10);
}

// Pause the stopwatch
function pauseStopwatch() {
    if (!isRunning) return; // Prevent pausing when already paused
    isRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
    clearInterval(timerInterval);
}

// Reset the stopwatch
function resetStopwatch() {
    isRunning = false;
    clearInterval(timerInterval);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCount = 0;
    laps = [];
    formatTime();
    lapList.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
}

// Record a lap time
function recordLap() {
    if (!isRunning) return; // Prevent laps when not running
    lapCount++;
    const lapTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
    laps.push(lapTime);

    const lapItem = document.createElement("li");
    lapItem.classList.add("lap");
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    // Add alternating background colors for readability
    if (lapCount % 2 === 0) {
        lapItem.style.backgroundColor = "#f1f1f1";
    } else {
        lapItem.style.backgroundColor = "#e0e0e0";
    }
    lapList.appendChild(lapItem);
}

// Event listeners
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

// Apply black text color to button text
document.querySelectorAll(".control-btn").forEach(button => {
    button.style.color = "black";
});
