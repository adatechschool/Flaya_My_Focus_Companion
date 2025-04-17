
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "changeColor") {
        const overlay = document.createElement("div");
        document.body.appendChild(overlay);

        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.display = 'block';
        overlay.style.position = 'fixed';
        overlay.style.backgroundColor = 'black';
        overlay.style.zIndex = '1000';

        document.body.style.backgroundColor = "blue";

        
    }
  });
  