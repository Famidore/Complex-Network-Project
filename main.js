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

  for (let j = 0; j <= count - 1; j++) {
    elements = (splitTokens(d[j], "'").length - 1) / 6
    let parent = split(splitTokens(d[j], ". ")[2], 'com/')[1]
    let parentId = subs.length
    print(parent, parentId)
    // Add parent here
      names.push(parent)
      subs.push(new subReddit(width / 2 + j * 750, height / 2, 20, parentId, parent, null, null, null, null, []))
    

    for (let i = 0; i < elements * 6; i += 6) {
      let index = subs.length
      if (!(checkIfInside(names, splitTokens(d[j], "'")[i + 1]))) {
        //let index = (i / 6) + parentId + 1
        var tempName = splitTokens(d[j], "'")[i + 1]
        var tempMembers = splitTokens(d[j], "'")[i + 3]
        var tempThumbnail = splitTokens(d[j], "'")[i + 5]


        subs.push(new subReddit(random(300, 500), random(300, 500), 20, index, tempName, tempMembers, tempThumbnail, parent, parentId, []))
        subs[parentId].children.push(index)
        names.push(splitTokens(d[j], "'")[i + 1])
      };
      
    };
  }
  print(subs)
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



