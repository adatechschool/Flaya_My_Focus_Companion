const titles = document.querySelector('h1');
const images = document.querySelector('img');
const font = document.querySelector('p')

const switchColors = () => {
    if (titles) {
        titles.style.color = "green"
    }
    if (images) {
        images.style.backgroundColor = "red";
    }

    if(font) {
        font.style.fontSize = '200px'
    }
    }
    switchColors()