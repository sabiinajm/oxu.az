const text1 = document.getElementById('movingText1');
const text2 = document.getElementById('movingText2');
let position = 100;

function moveText() {
    position -= .3;
    text1.style.left = position + '%';
    text2.style.left = position + '%';

    if (position < -100) {
        position = 100;
    }
}

setInterval(moveText, 20);