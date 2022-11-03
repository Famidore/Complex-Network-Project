let button, input, canvas, t;
let b;


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  tempSetup(windowWidth, windowHeight);
  b = new Blob(1, 25);
  inputSetup();
}

function draw() {
  background(51);
  t = frameCount / 60;
  misc();

  translate(controls.view.x, controls.view.y);
  scale(controls.view.zoom)
  b.display();

  //temp();
}

function gatherURL() {
  print(input.value());
}



