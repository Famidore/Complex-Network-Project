var tempX, tempY, tempSpeedX, tempSpeedY;


function tempSetup(sizeX, sizeY) {
    // temp setup
    sX = sizeX;
    sY = sizeY;
    tempX = sizeX / 2;
    tempY = sizeY / 2;
    tempSpeedX = 3;
    tempSpeedY = 3;
}

function temp() {
    textSize(100);
    textAlign(CENTER);
    fill(255, 0, 150);
    text("Work in Progress", tempX, tempY);

    tempX += tempSpeedX;
    tempY += tempSpeedY;

    if (tempX >= sX - 400 || tempX <= 400) {
        tempSpeedX *= -1;
    }
    if (tempY >= sY - 50 || tempY <= 50) {
        tempSpeedY *= -1
    }
}