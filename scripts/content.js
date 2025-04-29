
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

let timing;
function startTimer(endTime) {
    clearInterval(timing);

    timing = setInterval(() => {
        const now = Date.now();
        const diff = endTime - now;

        if (diff <= 0) {
            clearInterval(timing);
            //chrome.storage.local.remove(['endTime']);
            /**overlay finish or not**/
            // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            //     chrome.tabs.sendMessage(tabs[0].id, { action: "breakTime" });
            // });
            showOverlay();
            return;
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

                startTimer(result.endTime);
            }
            // } else {
            //     chrome.storage.local.remove(['endTime']);
            // }
        }
    }
    );
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startFocusTimer") {
        chrome.storage.local.get(['endTime'], (result) => {
            console.log(result.endTime)
            if (result.endTime) {
                const now = Date.now();
                console.log(result.endTime)
                if (result.endTime > now) {
    
                    startTimer(result.endTime);
                }
                // } else {
                //     chrome.storage.local.remove(['endTime']);
                // }
            }
        }
        );
     }
})


function showOverlay() {
    const overlayBreak = document.createElement("div");
    overlayBreak.classList.add("my-overlay");
    document.body.appendChild(overlayBreak);
    console.log("coucou")
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
        const breakEndTime = Date.now() + 0.2 * 60 * 1000;

        chrome.storage.local.set({ endTime: breakEndTime, task: "Break Time" }, () => {
            startTimer(breakEndTime);
        });
        overlayBreak.style.display = "none";
        overlayPopupBreak.style.display = "none";
        overlayMessageBreak.style.display = "none";
        overlayButtonFinished.style.display = "none";
        overlayButtonNotFinished.style.display = "none";
        overlayImageBreak.style.display = "none";
    });

}

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

