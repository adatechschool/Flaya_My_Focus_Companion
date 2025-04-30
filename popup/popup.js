const startButton = document.querySelector("#start-button");
const focusTime = document.querySelector("#focus-time");
const bigBreak = document.querySelector("#break-time");
const form = document.querySelector("#form")
const taskUser = document.querySelector("#task-user");
const timer = document.querySelector("#timer");
const focusTimer = document.querySelector("#focus-timer");

let timing;

function startTimer(timeUser) {
    clearInterval(timing);

    timing = setInterval(() => {
        const now = Date.now();
        const diff = timeUser - now;

        if (diff <= 0) {
            clearInterval(timing);
            return;
        }

        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor((diff / 1000) % 60);

        timer.innerText = `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}

function displayTimerPopup(userTask) {
    form.style.display = "none";
    focusTimer.style.display = "block";
    taskUser.innerText = userTask;

    const durationMinutes = focusTime.value;
    const durationBigBreak = bigBreak.value;

    const endTime = Date.now() + durationMinutes * 60 * 1000;
    const task = document.querySelector("#task").value;

    chrome.storage.local.set({ endTime: endTime, task: task, time: durationMinutes, timer: timer, bigBreak: durationBigBreak }, () => {
        startTimer(endTime);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "startFocusTimer" });
        });
    });
}

startButton.addEventListener("click", () => {
    const task = document.querySelector("#task").value;
    displayTimerPopup(task);
});

chrome.storage.local.get(['endTime', 'task'], (result) => {
    if (result.endTime) {
        const now = Date.now();

        if (result.endTime > now) {
            form.style.display = "none";
            focusTimer.style.display = "block";
            taskUser.innerText = result.task;
            startTimer(result.endTime);
        }
    }
});
