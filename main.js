let button, input, canvas, t;
let subs = [];
let path = 'pythonWebscrapper/exampleData.txt'
let count, elements


function preload() {
  d = loadStrings(path)
}


function setup() {
  count = d.length - 1;
  canvas = createCanvas(windowWidth, windowHeight);
  tempSetup(windowWidth, windowHeight);
  inputSetup();
  for (let j = 0; j <= count; j++) {
    elements = (splitTokens(d[j], "'").length - 1) / 6
    print(elements)
    for (let i = 0; i < elements * 6; i += 6) {
      subs.push(new subReddit(random(-width, width*2), random(-height, height*2), 20, i/6, splitTokens(d[j], "'")[i + 1], splitTokens(d[j], "'")[i + 3], splitTokens(d[j], "'")[i + 5]))
    };
  }



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
  }
  for (let i = 0; i < subs.length; i++) {
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



