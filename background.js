let focusTimerInterval;
let breakTimerInterval;
let savedFocusDuration = 25; // Durée par défaut du focus, peut être modifiée dynamiquement

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startFocusTimer") {
        const { endTime, task, focusDuration } = request;
        savedFocusDuration = focusDuration || 25;
        chrome.storage.local.set({ endTime, task }, () => {
            startFocusTimer(endTime);
        });
    }

    if (request.action === "breakTime") {
        startBreakTimer();
    }

    if (request.action === "finishBreak") {
        // Relancer automatiquement le focus après la pause
        const newFocusEndTime = Date.now() + savedFocusDuration * 60 * 1000;
        chrome.storage.local.set({ endTime: newFocusEndTime, task: "Nouvelle tâche" }, () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: "startFocusTimer", endTime: newFocusEndTime });
            });
        });
    }
});

// Fonction pour démarrer le focus timer
function startFocusTimer(endTime) {
    clearInterval(focusTimerInterval);

    focusTimerInterval = setInterval(() => {
        const now = Date.now();
        const diff = endTime - now;

        if (diff <= 0) {
            clearInterval(focusTimerInterval);
            chrome.storage.local.remove(['endTime']);
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: "breakTime" });
            });
            return;
        }

        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor((diff / 1000) % 60);
        chrome.storage.local.set({ remainingTime: { minutes, seconds } });
    }, 1000);
}

// Fonction pour démarrer le break timer
function startBreakTimer() {
    const breakEndTime = Date.now() + 5 * 60 * 1000;
    chrome.storage.local.set({ breakEndTime });

    clearInterval(breakTimerInterval);
    breakTimerInterval = setInterval(() => {
        const now = Date.now();
        const diff = breakEndTime - now;

        if (diff <= 0) {
            clearInterval(breakTimerInterval);
            chrome.storage.local.remove(['breakEndTime']);
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: "finishBreak" });
            });
        }

        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor((diff / 1000) % 60);
        chrome.storage.local.set({ breakRemainingTime: { minutes, seconds } });
    }, 1000);
}
