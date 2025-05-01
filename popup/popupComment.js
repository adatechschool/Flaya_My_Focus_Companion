//Récupération des éléments du Document Object Model
const startButton = document.querySelector("#start-button");
const focusTime = document.querySelector("#focus-time");
const bigBreak = document.querySelector("#break-time");
const form = document.querySelector("#form")
const taskUser = document.querySelector("#task-user");
const timer = document.querySelector("#timer");
const focusTimer = document.querySelector("#focus-timer");

//déclaration variable timing qui stocke un intervalle
let timing;

//déclaration d'une fonction qui gère le Timer
function startTimer(timeUser) {
    //Arrête tout timer si existant
    clearInterval(timing);

    //création Timer qui s'éxécute chaque seconde
    timing = setInterval(() => {
        //récupère l'heure actuelle en ms
        const now = Date.now();
        //Différence entre l'heure de fin et l'heure actuelle en ms
        const diff = timeUser - now;

        //condition d'arrêt du timer : timeUser = now
        if (diff <= 0) {
            clearInterval(timing);
            return;
        }

        //Conversion des ms en miutes et sc
        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor((diff / 1000) % 60);

        timer.innerText = `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}

//Déclaration de la fonction affichant le Timer
function displayTimerPopup(userTask) {
    //cache la popup 1
    form.style.display = "none";
    //affiche le timer 
    focusTimer.style.display = "block";
    //affiche la tâche en cours
    taskUser.innerText = userTask;

    //valeurs de temps de concentration et grande pause, séléctionnées par l'utilisateur ice
    const durationMinutes = focusTime.value;
    const durationBigBreak = bigBreak.value;

    //Calcul heure de fin : now + durationMinutes en ms
    const endTime = Date.now() + durationMinutes * 60 * 1000;
    const task = document.querySelector("#task").value;

    //Stocke les données dans le local storage de chrome : temps de fin du minuteur ; la tâche ; durée de concentration ; élément timer DOM ; durée pause.
    chrome.storage.local.set({ endTime: endTime, task: task, time: durationMinutes, timer: timer, bigBreak: durationBigBreak }, () => {
        //Démarre le minuteur startTimer
        startTimer(endTime);
        //Envoie un message à l'onglet actif : "startFocusTimer".
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "startFocusTimer" });
        });
    });
}

//écoute du bouton Start
startButton.addEventListener("click", () => {
    //récupère la tâche
    const task = document.querySelector("#task").value;
    //Appel displayTimerPopup : affichage du timer dans la popup
    displayTimerPopup(task);
});

//On vérifie dans le local storage si il y a endTime et task : fin timer 
//Cela permet de conserver l'affichage du minuteur même si on ferme et réouvre la popup.
chrome.storage.local.get(['endTime', 'task'], (result) => {
    if (result.endTime) {
        const now = Date.now();

        //si le temps de fin de concentration n'est pas atteint..
        if (result.endTime > now) {
            //cache le formulaire
            form.style.display = "none";
            //affiche le timer et la tâche
            focusTimer.style.display = "block";
            taskUser.innerText = result.task;
            //relance le minuteur avec l'heure de fin envoyée
            startTimer(result.endTime);
        }
    }
});
