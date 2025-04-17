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
    
    
    const timing = setInterval(() => {
    if (secondes == 0) {
            minutes--
            secondes = 60
        }

        secondes-- 

        if (minutes === 0 && secondes === 0) {
            clearInterval(timing);
        }
        timer.innerText = `Il reste ${minutes-1} minutes et ${secondes} secondes`

    }, 1000)
        return timer.innerText = `Il reste ${minutes-1} minutes et ${secondes} secondes`

}


function displaySecondPopup(userTask) {
    form.style.display = "none";
    focusTimer.style.display  = "block";
    taskUser.innerText = userTask;
    // timer.innerText = `Il reste ${focusTime.value} minutes`
    timer.innerText = timerDisplay(focusTime.value);

    /*function gros timer*/
}



startButton.addEventListener("click", (element) => {
    element.preventDefault();
    const task = document.querySelector("#task").value;
    displaySecondPopup(task);
    
})


/* 
Dans notre second popup 
on veut afficher timerDisplay quand on click sur start.

*/


