const startButton = document.querySelector("#start-button");
const focusTime = document.querySelector("#focus-time");
const bigBreak = document.querySelector("#break-time");
const form = document.querySelector("#form")
const taskUser = document.querySelector("#task-user");
const timer = document.querySelector("#timer");
const focusTimer = document.querySelector("#focus-timer");



// function timerDisplay(userTime) {
//     let minutes = userTime;
//     let secondes = 60;


//     const timing = setInterval(() => {
//         if (secondes == 0) {
//             minutes--
//             secondes = 60
//         }

//         secondes--

//         if (minutes === 0 && secondes === 0) {
//             clearInterval(timing);
//         }
//         timer.innerText = `${minutes - 1}  : ${secondes - 1} `

//     }, 1000)
//     return timer.innerText = `${minutes - 1}  : ${secondes - 1} `

// }


// function displaySecondPopup(userTask) {
//     form.style.display = "none";
//     focusTimer.style.display = "block";
//     taskUser.innerText = userTask;
//     timer.innerText = `Il reste ${focusTime.value} minutes`
//     setTimeout(() => {
//         timer.innerText = timerDisplay(focusTime.value);
//     }, 1000);

//     /*function gros timer*/
// }



// startButton.addEventListener("click", (element) => {
//     element.preventDefault();
//     const task = document.querySelector("#task").value;
//     displaySecondPopup(task);

// })


/* 
Le chrono ne reste pas quand on ferme la popup.
Voir comment faire 

*/

/******************* */

let timing; // Pour pouvoir clearInterval plus tard

function startTimer(endTime) {
    clearInterval(timing);

    timing = setInterval(() => {
        const now = Date.now();
        const diff = endTime - now;

        if (diff <= 0) { /*lancement du breaktime a faire*/
            clearInterval(timing);
            chrome.storage.local.remove(['endTime']);
            return;
        }

        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor((diff / 1000) % 60);

        timer.innerText = `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}

function displaySecondPopup(userTask) {
    form.style.display = "none";
    focusTimer.style.display = "block";
    taskUser.innerText = userTask;

    const durationMinutes = focusTime.value;

    const endTime = Date.now() + durationMinutes * 60 * 1000;
    const task = document.querySelector("#task").value;

    chrome.storage.local.set({ endTime: endTime, task: task}, () => {
        startTimer(endTime);
    });
}


startButton.addEventListener("click", (element) => {
    element.preventDefault();
    const task = document.querySelector("#task").value;
    displaySecondPopup(task);
});

// Quand on ouvre/recharge la page, vérifier s'il y a un timer en cours
chrome.storage.local.get(['endTime', 'task'], (result) => {
    if (result.endTime && result.task) {
        const now = Date.now();

        if (result.endTime > now) {
            form.style.display = "none";
            focusTimer.style.display = "block";
            taskUser.innerText = result.task;
            startTimer(result.endTime);
        } else {
            chrome.storage.local.remove(['endTime', 'task']);
        }
    }
});


