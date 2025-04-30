
let timing;

function startTimer(endTime, type) {
    clearInterval(timing);
    
    timing = setInterval(() => {
        const now = Date.now();
        const diff = endTime - now;
        
        if (diff <= 0 && type === 1) {
            clearInterval(timing);
            showOverlayEndFocus();
            return;
        }
            
        if (diff <= 0 && type === 2) {
            clearInterval(timing);
            showOverlayEndBreak();
        }

        if (diff <= 0 && type === 3) {
            clearInterval(timing); 
        }

    }, 1000);
}
    
window.addEventListener("load", () => {
    chrome.storage.local.get(['endTime'], (result) => {
        if (result.endTime) {
            const now = Date.now();

            if (result.endTime > now) {
                startTimer(result.endTime, 1);
            }
        }
    });
});
    
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startFocusTimer") {
        chrome.storage.local.get(['endTime'], (result) => {
            if (result.endTime) {
                const now = Date.now();
                if (result.endTime > now) {
                    startTimer(result.endTime, 1);
                }
            }
        })
    }
});
     
function showOverlayEndFocus() {

    const overlayBreak = document.createElement("div");
    overlayBreak.classList.add("my-overlay");
    document.body.appendChild(overlayBreak);
    
    const overlayPopupBreak = document.createElement("div");
    overlayPopupBreak.classList.add("my-overlay-popup-blocked");
    document.body.appendChild(overlayPopupBreak);
    
    const overlayMessageBreak = document.createElement("p");
    overlayMessageBreak.classList.add("my-overlay-message");
    chrome.storage.local.get([ 'time'], (result) => {
        overlayMessageBreak.innerText = `${result.time} minutes have passed, have you finished your task?`;
    });
    overlayPopupBreak.appendChild(overlayMessageBreak);
    
    const overlayButtonFinished = document.createElement("button");
    overlayButtonFinished.classList.add("my-overlay-button-finished");
    overlayButtonFinished.innerText = "Yes";
    overlayPopupBreak.appendChild(overlayButtonFinished);
    
    const overlayButtonNotFinished = document.createElement("button");
    overlayButtonNotFinished.classList.add("my-overlay-button-not-finished");
    overlayButtonNotFinished.innerText = "No";
    overlayPopupBreak.appendChild(overlayButtonNotFinished);
    
    const overlayImageBreak = document.createElement("img");
    overlayImageBreak.classList.add("my-overlay-image");
    overlayImageBreak.src = chrome.runtime.getURL("scripts/dragon_icon.png");
    overlayPopupBreak.appendChild(overlayImageBreak);
    
    overlayButtonNotFinished.addEventListener("click", () => {
        
        const breakEndTime = Date.now() + 0.1 * 60 * 1000;
        chrome.storage.local.set({ endTime: breakEndTime, task: "Mini Break" }, () => {
            startTimer(breakEndTime, 2);
        });

        overlayBreak.style.display = "none";
        overlayPopupBreak.style.display = "none";
        overlayMessageBreak.style.display = "none";
        overlayButtonFinished.style.display = "none";
        overlayButtonNotFinished.style.display = "none";
        overlayImageBreak.style.display = "none";
    });   

    overlayButtonFinished.addEventListener("click", () => {
        chrome.storage.local.get(['bigBreak'], (result) => {
            const bigBreakEndTime = Date.now() + result.bigBreak * 60 * 1000;
            chrome.storage.local.set({ endTime: bigBreakEndTime, task: "Big Break" }, () => {
                startTimer(bigBreakEndTime, 3);
            });
        })
        

        overlayBreak.style.display = "none";
        overlayPopupBreak.style.display = "none";
        overlayMessageBreak.style.display = "none";
        overlayButtonFinished.style.display = "none";
        overlayButtonNotFinished.style.display = "none";
        overlayImageBreak.style.display = "none";
    }); 

}
    
function showOverlayEndBreak() {
    const overlayBreak = document.createElement("div");
    overlayBreak.classList.add("my-overlay");
    document.body.appendChild(overlayBreak);
    
    const overlayPopupBreak = document.createElement("div");
    overlayPopupBreak.classList.add("my-overlay-popup-blocked");
    document.body.appendChild(overlayPopupBreak);
    
    const overlayMessageBreak = document.createElement("p");
    overlayMessageBreak.classList.add("my-overlay-message");
    overlayMessageBreak.innerText = `Your break is over, time to start again ? `;
    overlayPopupBreak.appendChild(overlayMessageBreak);
    
    const overlayButtonBreakFinished = document.createElement("button");
    overlayButtonBreakFinished.classList.add("my-overlay-button-finished");
    overlayButtonBreakFinished.innerText = "Yes";
    overlayPopupBreak.appendChild(overlayButtonBreakFinished);
    
    const overlayImageBreak = document.createElement("img");
    overlayImageBreak.classList.add("my-overlay-image");
    overlayImageBreak.src = chrome.runtime.getURL("scripts/dragon_icon.png");
    overlayPopupBreak.appendChild(overlayImageBreak);
    
    overlayButtonBreakFinished.addEventListener("click", () => {

        chrome.storage.local.get(['endTime', 'task', 'time'], (result) => {
            const breakEndTime = Date.now() + result.time * 60 * 1000;
            
            chrome.storage.local.set({ endTime: breakEndTime, task: "Keep working on your task, you're almost there!" }, () => {
                startTimer(breakEndTime, 1);
            });
        });
        
        overlayBreak.style.display = "none";
        overlayPopupBreak.style.display = "none";
        overlayMessageBreak.style.display = "none";
        overlayButtonBreakFinished.style.display = "none";
        overlayImageBreak.style.display = "none";
    })
};
                
            