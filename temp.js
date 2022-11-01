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
    noStroke();
    for (let i = 0; i < random(5); i++) {
        snowflakes.push(new snowflake()); // append snowflake object
    }

    for (let flake of snowflakes) {
        flake.update(t); // update snowflake position
        flake.display(); // draw snowflake
    }

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
    text('Paste a reddit community link below', input.x, input.y - 20);
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


function snowflake() {
    this.posX = 0;
    this.posY = random(-50, 0);
    this.initialangle = random(0, 2 * PI);
    this.size = random(2, 5);

    this.radius = sqrt(random(pow(width / 2, 2)));

    this.update = function (time) {
        let w = 0.6;
        let angle = w * time + this.initialangle;
        this.posX = width / 2 + this.radius * sin(angle);

        this.posY += pow(this.size, 0.5);

        if (this.posY > height) {
            let index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
        }
    };

    this.display = function () {
        ellipse(this.posX, this.posY, this.size);
    };
}