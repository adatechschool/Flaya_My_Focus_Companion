
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
            showOverlayEndBigBreak();
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

chrome.runtime.onMessage.addListener((request) => {
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

    let divBlur = displayBlur();

    const overlayPopupBreak = document.createElement("div");
    overlayPopupBreak.classList.add("my-overlay-popup-blocked");
    document.body.appendChild(overlayPopupBreak);

    const overlayMessageBreak = document.createElement("p");
    overlayMessageBreak.classList.add("my-overlay-message");
    chrome.storage.local.get(['time'], (result) => {
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

    displayImage(overlayPopupBreak);

    overlayButtonNotFinished.addEventListener("click", () => {

        const breakEndTime = Date.now() + 0.5 * 60 * 1000;
        chrome.storage.local.set({ endTime: breakEndTime, task: "Mini Break" }, () => {
            startTimer(breakEndTime, 2);
        });

        divBlur.style.display = "none";
        overlayPopupBreak.style.display = "none";
    });

    overlayButtonFinished.addEventListener("click", () => {
        chrome.storage.local.get(['bigBreak'], (result) => {
            const bigBreakEndTime = Date.now() + result.bigBreak * 60 * 1000;
            chrome.storage.local.set({ endTime: bigBreakEndTime, task: "Big Break" }, () => {
                startTimer(bigBreakEndTime, 3);
            });
        })

        divBlur.style.display = "none";
        overlayPopupBreak.style.display = "none";
    });

}

function showOverlayEndBreak() {
    let divBlur = displayBlur();
    let divBlockText = displayBlockText(`Your break is over, time to start again ? `);

    const overlayButtonBreakFinished = document.createElement("button");
    overlayButtonBreakFinished.classList.add("my-overlay-button-finished");
    overlayButtonBreakFinished.innerText = "Yes";
    divBlockText.appendChild(overlayButtonBreakFinished);

    displayImage(divBlockText);

    overlayButtonBreakFinished.addEventListener("click", () => {

        chrome.storage.local.get(['endTime', 'task', 'time'], (result) => {
            const breakEndTime = Date.now() + result.time * 60 * 1000;

            chrome.storage.local.set({ endTime: breakEndTime, task: "Keep working on your task, you're almost there!" }, () => {
                startTimer(breakEndTime, 1);
            });
        });

        divBlur.style.display = "none";
        divBlockText.style.display = "none"
    })
};

function showOverlayEndBigBreak() {
    let divBlur = displayBlur();
    let divBlockText = displayBlockText(`Your big break is over, do you want to start a new task? `);
    displayImage(divBlockText);

    window.addEventListener("click", () => {
        divBlur.style.display = "none";
        divBlockText.style.display = "none";
    })
}

function displayBlur() {
    const overlayBreak = document.createElement("div");
    overlayBreak.classList.add("my-overlay");
    document.body.appendChild(overlayBreak);

    return overlayBreak;
}

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

function displayImage(div) {
    const overlayImageBreak = document.createElement("img");
    overlayImageBreak.classList.add("my-overlay-image");
    overlayImageBreak.src = chrome.runtime.getURL("scripts/dragon_icon.png");
    div.appendChild(overlayImageBreak);
}
