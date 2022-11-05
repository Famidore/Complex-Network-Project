var tempX, tempY, tempSpeedX, tempSpeedY;
let snowflakes = [];



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
    if (mouseIsPressed) {
        cursor(HAND)
    } else {
        cursor(ARROW)
    }
}

function misc() {
    textSize(20);
    textAlign(LEFT);
    fill(255, 0, 150, 200)
    text('Paste a reddit community link below', input.x, input.y - 20);
}

function inputSetup() {
    input = createInput('Enter link here', 'text');
    input.style('color', '#8400ff');
    input.position(50, windowHeight - 50);

    button = createButton('submit');
    button.style('background-color', color(200));
    button.position(input.x + input.width, windowHeight - 50);
    button.mousePressed(gatherURL);
}