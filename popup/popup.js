
const focusTime = document.querySelector("#focus-time");
const bigBreak = document.querySelector("#break-time");
const form = document.querySelector("#form")
const taskUser = document.querySelector("#task-user");
const timer = document.querySelector("#timer");
const focusTimer = document.querySelector("#focus-timer");
const startButton = document.querySelector("#start-button");

function displaySecondPopup(userTask) {
    form.style.display = "none";
    focusTimer.style.display  = "block";
    taskUser.innerText = userTask;
    timer.innerText = focusTime.value + " minutes";
}

// startButton.addEventListener("click", (element) => {
//     element.preventDefault();
//     const task = document.querySelector("#task").value;
//     displaySecondPopup(task);
// })

startButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "changeColor" });
    });
  });






