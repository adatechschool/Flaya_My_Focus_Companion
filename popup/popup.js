const startButton = document.querySelector("#start-button");
const focusTime = document.querySelector("#focus-time");
const bigBreak = document.querySelector("#break-time");
const form = document.querySelector("#form")
const taskUser = document.querySelector("#task-user");
const timer = document.querySelector("#timer");
const focusTimer = document.querySelector("#focus-timer");


 
function timerDisplay(userTime) {
    let minutes = userTime;
    let secondes =  60;

    testTimer.innerText = `Il reste ${minutes} minutes`
    
    const timing = setInterval(() => {
    if (secondes == 0) {
            minutes--
            secondes = 60
        }

        secondes-- 

        if (minutes === 0 && secondes === 0) {
            clearInterval(timing);
        }
        testTimer.innerText = `Il reste ${minutes-1} minutes et ${secondes} secondes`

    }, 1000)

}


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



