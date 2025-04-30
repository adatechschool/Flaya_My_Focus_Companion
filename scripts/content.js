
let timing;

function startTimer(endTime, type) {
    clearInterval(timing);
    
    timing = setInterval(() => {
        const now = Date.now();
        const diff = endTime - now;
        
        if (diff <= 0 && type === 1) {
            clearInterval(timing);
            showOverlay();
            return;
        }
            
        if (diff <= 0 && type === 2) {
            clearInterval(timing);
            showOverlayEndBreak();
        }

    }, 1000);
}
    
window.addEventListener("load", () => {
    chrome.storage.local.get(['endTime'], (result) => {
        console.log(result.endTime)
        if (result.endTime) {
            const now = Date.now();
            console.log(result.endTime)
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
     
function showOverlay() {
    const overlayBreak = document.createElement("div");
    overlayBreak.classList.add("my-overlay");
    document.body.appendChild(overlayBreak);
    
    const overlayPopupBreak = document.createElement("div");
    overlayPopupBreak.classList.add("my-overlay-popup-blocked");
    document.body.appendChild(overlayPopupBreak);
    
    const overlayMessageBreak = document.createElement("p");
    overlayMessageBreak.classList.add("my-overlay-message");
    overlayMessageBreak.innerText = `X minutes have passed, have you finished your task?`;
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
        chrome.storage.local.set({ endTime: breakEndTime, task: "Break Time" }, () => {
            startTimer(breakEndTime, 2);
        });

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
        chrome.storage.local.get(['endTime', 'time'], (result) => {
            const newTime = Date.now() + result.time * 60 * 1000;
            startTimer(newTime, 1);
        })
    })
    //     /**lancer timer de focus avec le focusTime.value de l'utilisateur**/

    //     overlayBreak.style.display = "none";
    //     overlayPopupBreak.style.display = "none";
    //     overlayMessageBreak.style.display = "none";
    //     overlayButtonBreakFinished.style.display = "none";
    //     overlayImageBreak.style.display = "none";
    // })
};
                
              









                // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                    //     if (request.action === "breakTime") {
                        //         const overlayBreak = document.createElement("div");
                        //         overlayBreak.classList.add("my-overlay");
                        //         document.body.appendChild(overlayBreak);
                        //         console.log("coucou")
                        //         const overlayPopupBreak = document.createElement("div");
                        //         overlayPopupBreak.classList.add("my-overlay-popup-blocked");
                        //         document.body.appendChild(overlayPopupBreak);
                        
                        //         const overlayMessageBreak = document.createElement("p");
                        //         overlayMessageBreak.classList.add("my-overlay-message");
                        //         overlayMessageBreak.innerText = `X minutes have passed, have you finished your task?`;
                        //         overlayPopupBreak.appendChild(overlayMessageBreak);
                        
                        //         const overlayButtonFinished = document.createElement("button");
                        //         overlayButtonFinished.classList.add("my-overlay-button-finished");
                        //         overlayButtonFinished.innerText = "Yes";
                        //         overlayPopupBreak.appendChild(overlayButtonFinished);
                        
                        //         const overlayButtonNotFinished = document.createElement("button");
                        //         overlayButtonNotFinished.classList.add("my-overlay-button-not-finished");
                        //         overlayButtonNotFinished.innerText = "No";
                        //         overlayPopupBreak.appendChild(overlayButtonNotFinished);
                        
                        //         const overlayImageBreak = document.createElement("img");
                        //         overlayImageBreak.classList.add("my-overlay-image");
                        //         overlayImageBreak.src = chrome.runtime.getURL("scripts/dragon_icon.png");
                        //         overlayPopupBreak.appendChild(overlayImageBreak);
                        
                        //         overlayButtonNotFinished.addEventListener("click", () => {
//             const breakEndTime = Date.now() + 5 * 60 * 1000;

//             chrome.storage.local.set({ endtime: breakEndTime, task: "Break Time" }, () => {
    //             });
    //             overlayBreak.style.display = "none";
    //             overlayPopupBreak.style.display = "none";
    //             overlayMessageBreak.style.display = "none";
    //             overlayButtonFinished.style.display = "none";
    //             overlayButtonNotFinished.style.display = "none";
    //             overlayImageBreak.style.display = "none";
    //         });
    
    //     }
    // });
    
    
    // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //     if (request.action === "blockedSite") {
    
    //         const overlayBlocked = document.createElement("div");
    //         overlayBlocked.classList.add("my-overlay");
    //         document.body.appendChild(overlayBlocked);
    
    //         const overlayPopupBlocked = document.createElement("div");
    //         overlayPopupBlocked.classList.add("my-overlay-popup-blocked");
    //         document.body.appendChild(overlayPopupBlocked);
    
    //         const overlayMessageBlocked = document.createElement("p");
    //         overlayMessageBlocked.classList.add("my-overlay-message-blocked");
    //         overlayMessageBlocked.innerText = "Hold on, your break is coming soon!"
    //         overlayPopupBlocked.appendChild(overlayMessageBlocked);
    
    //         const overlayImageBlocked = document.createElement("img");
    //         overlayImageBlocked.classList.add("my-overlay-image-blocked");
    //         overlayImageBlocked.src = chrome.runtime.getURL("scripts/dragon_icon.png");
    //         overlayPopupBlocked.appendChild(overlayImageBlocked);
    //     }
    // });