var tempX, tempY, tempSpeedX, tempSpeedY;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // temp setup
  tempX = windowWidth / 2;
  tempY = windowHeight / 2;
  tempSpeedX = 3;
  tempSpeedY = 3;
}

function draw() {
  background(51);
  temp();
}


function temp() {
  textSize(100);
  textAlign(CENTER);
  fill(255, 0, 150);
  text("Work in Progress", tempX, tempY);

  tempX += tempSpeedX;
  tempY += tempSpeedY;

  if (tempX >= windowWidth - 400 || tempX <= 400) {
    tempSpeedX *= -1;
  }
  if (tempY >= windowHeight - 50 || tempY <= 50) {
    tempSpeedY *= -1
  }
}