const startButton = document.querySelector("#start-button");
const focusTime = document.querySelector("#focus-time");
const bigBreak = document.querySelector("#break-time");
const form = document.querySelector("#form")
const taskUser = document.querySelector("#task-user");
const timer = document.querySelector("#timer");
const focusTimer = document.querySelector("#focus-timer");



function timerDisplay(userTime) {
    let minutes = userTime;
    let secondes = 60;


    const timing = setInterval(() => {
        if (secondes == 0) {
            minutes--
            secondes = 60
        }

        secondes--

        if (minutes === 0 && secondes === 0) {
            clearInterval(timing);
        }
        timer.innerText = `${minutes - 1}  : ${secondes - 1} `

    }, 1000)
    return timer.innerText = `${minutes - 1}  : ${secondes - 1} `

}


function displaySecondPopup(userTask) {
    form.style.display = "none";
    focusTimer.style.display = "block";
    taskUser.innerText = userTask;
    timer.innerText = `Il reste ${focusTime.value} minutes`
    setTimeout(() => {
        timer.innerText = timerDisplay(focusTime.value);
    }, 1000);

    /*function gros timer*/
}



startButton.addEventListener("click", (element) => {
    element.preventDefault();
    const task = document.querySelector("#task").value;
    displaySecondPopup(task);

})


/* 
Le chrono ne reste pas quand on ferme la popup.
Voir comment faire 

*/

