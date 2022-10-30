var tempX, tempY, tempSpeedX, tempSpeedY;


function tempSetup(sizeX, sizeY) {
    canvas.mouseWheel(e => Controls.zoom(controls).worldZoom(e))

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

    if (mouseIsPressed) {
        cursor(HAND)
    } else {
        cursor(ARROW)
    }
}

function misc() {
    textSize(20);
    textAlign(LEFT);
    text('Paste a video link below', input.x, input.y - 20);
}

function inputSetup() {
    input = createInput();
    input.style('color', '#8400ff');
    input.position(50, windowHeight - 50);

    button = createButton('submit');
    button.style('background-color', color(200));
    button.position(input.x + input.width, windowHeight - 50);
    button.mousePressed(gatherURL);
}


