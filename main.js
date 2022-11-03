let button, input, canvas, t, b;


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  tempSetup(windowWidth, windowHeight);
  b = new Blob();
  inputSetup();
}

function draw() {
  background(51);
  t = frameCount / 60;
  misc();

  translate(controls.view.x, controls.view.y);
  scale(controls.view.zoom);
  b.show();

  temp();
}

function gatherURL() {
  print(input.value());
}



