let button, input, canvas, t;
let subs = [];
let path = 'pythonWebscrapper/data.json'
let path2 = 'pythonWebscrapper/fullData.json'

const count = 10;

function preload() {
  d = loadJSON(path)
  d2 = loadJSON(path2)
  console.log(d2)
  

}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  tempSetup(windowWidth, windowHeight);
  inputSetup();
  for (let i = 0; i < count; i++) {
    subs.push(new subReddit(random(width), random(height), 10, i))
  };
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



