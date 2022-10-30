let button, input, canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  tempSetup(windowWidth, windowHeight);
  inputSetup();
}

function draw() {
  background(51);
  misc();

  translate(controls.view.x, controls.view.y);
  scale(controls.view.zoom)

  temp();
}

function gatherURL() {
  print('hello');
}



