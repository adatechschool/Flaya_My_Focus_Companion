
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "breakTime") {
        
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
            chrome.storage.local.set({ restartTimer: true }, () => {
            });
            overlayBreak.style.display = "none";
            overlayPopupBreak.style.display = "none";
            overlayMessageBreak.style.display = "none";
            overlayButtonFinished.style.display = "none";
            overlayButtonNotFinished.style.display = "none";
            overlayImageBreak.style.display = "none";
        });
        
    }
});

