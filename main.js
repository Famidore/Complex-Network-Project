let button, input, canvas, t;
let blobs = [];
const count = 10;


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  tempSetup(windowWidth, windowHeight);
  inputSetup();
  for (let i = 0; i < count; i++) {
    blobs.push(new Blob())
  }
}

function draw() {
  background(51);
  t = frameCount / 60;
  misc();

  translate(controls.view.x, controls.view.y);
  scale(controls.view.zoom);
  for (let i = 0; i < blobs.length; i++) {
    blobs[i].display();
  }

  //temp();
}

function gatherURL() {
  print(input.value());
}



