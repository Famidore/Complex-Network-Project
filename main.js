let button, input;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tempSetup(windowWidth, windowHeight);
  inputSetup();

}

function draw() {
  background(51);
  temp();
  
  textSize(20);
  textAlign(LEFT);
  text('Paste a video link below', input.x, input.y - 20);
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

function gatherURL() {
  
  print('hello');

}