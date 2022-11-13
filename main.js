let button, input, canvas, t;
let subs = [];
let path = 'pythonWebscrapper/data.txt'

const count = 10;

function preload() {
  d = loadStrings(path)
  console.log(random(d))
  

}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  tempSetup(windowWidth, windowHeight);
  inputSetup();
  for (let i = 0; i < count; i++) {
    subs.push(new subReddit(random(width), random(height), 10, i))
  };
  console.log(split(d[0], ' ')[0])

}

function draw() {
  background(51);
  t = frameCount / 60;
  misc();

  translate(controls.view.x, controls.view.y);
  scale(controls.view.zoom);
  for (let i = 0; i < subs.length; i++) {
    subs[i].makePath();
    subs[i].display();
    subs[i].windowOpen();
  }
  temp();
}

function gatherURL() {
  print(input.value());
}

function mouseClicked() {
  for (let i = 0; i < subs.length; i++) {
    subs[i].interact();
  }
}



