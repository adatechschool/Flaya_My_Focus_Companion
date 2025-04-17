
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "changeColor") {
        
        const overlay = document.createElement("div");
        overlay.classList.add("my-overlay");
        document.body.appendChild(overlay);
        
        const overlayPopupBlocked = document.createElement("div");
        overlayPopupBlocked.classList.add("my-overlay-popup-blocked");
        document.body.appendChild(overlayPopupBlocked);
        
        const overlayMessageBlocked = document.createElement("p");
        overlayMessageBlocked.classList.add("my-overlay-message-blocked");
        overlayMessageBlocked.innerText = "Hold on, your break is coming soon!"
        overlayPopupBlocked.appendChild(overlayMessageBlocked);

        const overlayImageBlocked = document.createElement("img");
        overlayImageBlocked.classList.add("my-overlay-image-blocked");
        overlayImageBlocked.src = chrome.runtime.getURL("scripts/dragon_icon.png");
        overlayPopupBlocked.appendChild(overlayImageBlocked);
    }
});
