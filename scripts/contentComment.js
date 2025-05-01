
let timing;

//Fonction qui prend 2 paramètres : H de fin du minuteur et le type de minuteur
//1 : Focus; 2 : Petite pause;  3 : grande pause.
function startTimer(endTime, type) {
    //annule tout intervalle existant
    clearInterval(timing);
    
    //Timer qui s'exécute chaque seconde.
    timing = setInterval(() => {
        const now = Date.now();
        //calcul à chaque itération la diff entre l'heure de fin et actuelle
        const diff = endTime - now;
        
        //affiche Overlay de fin de session de concentration
        if (diff <= 0 && type === 1) {
            clearInterval(timing);
            showOverlayEndFocus();
            return;
        }
            
        //affiche l'overlay de fin de petite pause 
        if (diff <= 0 && type === 2) {
            clearInterval(timing);
            showOverlayEndBreak();
        }

        //affiche l'overlay de fin de grande pause
        if (diff <= 0 && type === 3) {
            clearInterval(timing); 
            showOverlayEndBigBreak();
        }

    }, 1000);
}

//s'éxécute au chargement de la page : vérifie si dans le stockage local endTime existe
window.addEventListener("load", () => {
    chrome.storage.local.get(['endTime'], (result) => {
        if (result.endTime) {
            const now = Date.now();

            //Si H de fin > actuelle on startTimer type 1 : focus
            if (result.endTime > now) {
                startTimer(result.endTime, 1);
            }
        }
    });
});
    
//Ecoute de messages de la popup
chrome.runtime.onMessage.addListener((request) => {
    //si on reçoit bien "startFocusTimer" depuis la popup, on récupère l'heure de fin dans le storage
    if (request.action === "startFocusTimer") {
        chrome.storage.local.get(['endTime'], (result) => {
            //si H de fin existe..
            if (result.endTime) {
                const now = Date.now();
                //..et qu'elle est > H actuelle, on démare le minuteur Focus
                if (result.endTime > now) {
                    startTimer(result.endTime, 1);
                }
            }
        })
    }
});
     
//Affiche l'Overlay d'une fin de session de concentration
function showOverlayEndFocus() {

    //Floute la page
    let divBlur = displayBlur();
    
    //Construction de la fenêtre sur la page
    const overlayPopupBreak = document.createElement("div");
    overlayPopupBreak.classList.add("my-overlay-popup-blocked");
    document.body.appendChild(overlayPopupBreak);
    
    const overlayMessageBreak = document.createElement("p");
    overlayMessageBreak.classList.add("my-overlay-message");
    //Get durationMinute pour l'afficher dans le texte de la fenêtre
    chrome.storage.local.get([ 'time'], (result) => {
        overlayMessageBreak.innerText = `${result.time} minutes have passed, have you finished your task?`;
    });
    overlayPopupBreak.appendChild(overlayMessageBreak);
    
    //création des boutons YES / NO
    const overlayButtonFinished = document.createElement("button");
    overlayButtonFinished.classList.add("my-overlay-button-finished");
    overlayButtonFinished.innerText = "Yes";
    overlayPopupBreak.appendChild(overlayButtonFinished);
    
    const overlayButtonNotFinished = document.createElement("button");
    overlayButtonNotFinished.classList.add("my-overlay-button-not-finished");
    overlayButtonNotFinished.innerText = "No";
    overlayPopupBreak.appendChild(overlayButtonNotFinished);
    
    //petit Dragon
    displayImage(overlayPopupBreak);
    
    //quand on clique sur NO
    overlayButtonNotFinished.addEventListener("click", () => {

        //heure actuelle + temps petite pause
        const breakEndTime = Date.now() + 0.5 * 60 * 1000;
        //Stockage breakEndTime et texte "petite pause" 
        chrome.storage.local.set({ endTime: breakEndTime, task: "Mini Break" }, () => {
            //démarage minuteur 2
            startTimer(breakEndTime, 2);
        });

        //enlève le flou et l'overlay fin de session Focus
        divBlur.style.display = "none";
        overlayPopupBreak.style.display = "none";
    });   

    //Quand on a finit la tâche : clique sur YES
    overlayButtonFinished.addEventListener("click", () => {
        //on récupere dans le storage la valeur bigBreak
        chrome.storage.local.get(['bigBreak'], (result) => {
            //Définition de l'heure de fin de la grande pause..
            const bigBreakEndTime = Date.now() + result.bigBreak * 60 * 1000;
            //..et enregistrement de cette valeur dans le storage et texte grande pause.
            chrome.storage.local.set({ endTime: bigBreakEndTime, task: "Big Break" }, () => {
                //on démarre le timer type 3 : grande pause
                startTimer(bigBreakEndTime, 3);
            });
        })
        
        //cacher l'overlay
        divBlur.style.display = "none";
        overlayPopupBreak.style.display = "none";
    }); 

}
    
//Overlay fin de petite pause
function showOverlayEndBreak() {
    //Flou et message
    let divBlur = displayBlur();
    let divBlockText = displayBlockText(`Your break is over, time to start again ? `);

    //création bouton de reprise de la concentration
    const overlayButtonBreakFinished = document.createElement("button");
    overlayButtonBreakFinished.classList.add("my-overlay-button-finished");
    overlayButtonBreakFinished.innerText = "Yes";
    divBlockText.appendChild(overlayButtonBreakFinished);

    //Dragon
    displayImage(divBlockText);
    
    //bouton YES
    overlayButtonBreakFinished.addEventListener("click", () => {
        //récupération des 3 valeurs : tâche , durée, temps de fin
        chrome.storage.local.get(['endTime', 'task', 'time'], (result) => {
            //Calul temps de fin
            const breakEndTime = Date.now() + result.time * 60 * 1000;
            
            //Stockage du temps de fin avec le texte correspondant
            chrome.storage.local.set({ endTime: breakEndTime, task: "Keep working on your task, you're almost there!" }, () => {
                //relance le Timer 1 : concentration
                startTimer(breakEndTime, 1);
            });
        });

        //cache l'overlay
        divBlur.style.display = "none";
        divBlockText.style.display = "none"
    })
};

//affiche overlay après la grande pause
function showOverlayEndBigBreak() {
    let divBlur = displayBlur();
    let divBlockText = displayBlockText(`Big Break over - Do you want to start a new task? `);
    displayImage(divBlockText);

    //écoute le clique sur la fenêtre puis efface l'overlay (fin du cycle)
    window.addEventListener("click", () => {
        divBlur.style.display = "none";
        divBlockText.style.display = "none";
    })
}


//fonction floutage de la fenêtre
function displayBlur() {
    const overlayBreak = document.createElement("div");
    overlayBreak.classList.add("my-overlay");
    document.body.appendChild(overlayBreak);

    return overlayBreak;
}

//Affiche la fenêtre avec le message correspondant
function displayBlockText(text) {
    const overlayPopupBreak = document.createElement("div");
    overlayPopupBreak.classList.add("my-overlay-popup-blocked");
    document.body.appendChild(overlayPopupBreak);
    
    const overlayMessageBreak = document.createElement("p");
    overlayMessageBreak.classList.add("my-overlay-message");
    overlayMessageBreak.innerText = text;
    overlayPopupBreak.appendChild(overlayMessageBreak);

    return overlayPopupBreak;
}

//affichage du petit Dragon
function displayImage(div) {
    const overlayImageBreak = document.createElement("img");
    overlayImageBreak.classList.add("my-overlay-image");
    overlayImageBreak.src = chrome.runtime.getURL("scripts/dragon_icon.png");
    div.appendChild(overlayImageBreak);
}
            