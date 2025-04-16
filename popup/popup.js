const startButton = document.querySelector("#start-button");
const task = document.querySelector("#task").value;
const focusTime = document.querySelector("#focus-time");
const bigBreak = document.querySelector("#break-time");
const popup = document.querySelector("body");
const test = document.querySelector("h1");

function displaySecondPopup() {
    popup.style.display = "none";
    test.innerText = task;
}


startButton.addEventListener("click", () => {
    displaySecondPopup();
    /*
    clear
    charge tache
    fonction recup input focus time (to min)
    fonction recup input focus time (to min)
    charge timer
    */
})


