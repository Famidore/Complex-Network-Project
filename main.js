let button, input, canvas, t;
let subs = [];
let path = 'pythonWebscrapper/data.txt'
let count, elements
let names = [];


function preload() {
  d = loadStrings(path)
}


function setup() {
  count = d.length - 1;
  canvas = createCanvas(windowWidth, windowHeight);
  tempSetup(windowWidth, windowHeight);
  inputSetup();

  for (let j = 0; j <= 1; j++) {
    elements = (splitTokens(d[j], "'").length - 1) / 6
    let parent = split(splitTokens(d[j], ". ")[2], 'com/')[1]
    let parentId = j * 100
    names.push(parent)
    print(names)
    subs.push(new subReddit(random(100, 200), random(100, 200), 20, parentId, split(splitTokens(d[0], ". ")[2], 'com/')[1], null, null, []))
    print(subs)
    // Add parent here
    for (let i = 0; i <= elements * 6; i += 6) {
      if ((splitTokens(d[j], "'")[i + 1])) {
        let index = (i / 6) + parentId + 1
        names.push(splitTokens(d[j], "'")[i + 1])
        subs.push(new subReddit(random(300, 500), random(300, 500), 20, index, splitTokens(d[j], "'")[i + 1], splitTokens(d[j], "'")[i + 3], splitTokens(d[j], "'")[i + 5], parent, parentId))
        if (!(names.includes(splitTokens(d[j], "'")[i + 1]))) {
        }
      };
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

  }
  for (let i = 0; i < subs.length; i++) {
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



