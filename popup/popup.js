const startButton = document.querySelector("#start-button");
const focusTime = document.querySelector("#focus-time");
const bigBreak = document.querySelector("#break-time");
const form = document.querySelector("#form")
const taskUser = document.querySelector("#task-user");
const timer = document.querySelector("#timer");
const focusTimer = document.querySelector("#focus-timer");


function displaySecondPopup(userTask) {
    form.style.display = "none";
    focusTimer.style.display  = "block";
    taskUser.innerText = userTask;
    timer.innerText = focusTime.value + " minutes";
    /*function gros timer*/
}



startButton.addEventListener("click", (element) => {
    element.preventDefault();
    const task = document.querySelector("#task").value;
    displaySecondPopup(task);
})



