let button, input, canvas, t;
let subs = [];
let path = 'pythonWebscrapper/data.txt'
let count, elements
let names = [];
let parentArray = []


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
    // Add parent here
    names.push(parent)
    subs.push(new subReddit(width / 2, height / 2 + j * 250, 20, parentId, parent, null, null, null, null, []))
    parentArray.push(parent)


    for (let i = 0; i < elements * 6; i += 6) {
      let index = subs.length
      if (!(checkIfInside(names, splitTokens(d[j], "'")[i + 1]))) {
        //add child subs here
        var tempName = splitTokens(d[j], "'")[i + 1]
        var tempMembers = splitTokens(d[j], "'")[i + 3]
        var tempThumbnail = splitTokens(d[j], "'")[i + 5]

        subs.push(new subReddit(random(300, 500), random(300, 500), 20, index, tempName, tempMembers, tempThumbnail, parent, parentId, []))
        subs[parentId].children.push(tempName)
        names.push(tempName)
      };
    };
  }
  for (let i = 0; i < subs.length; i++){
    for (let j = 0; j < parentArray.length; j++){
      if (subs[i].name == parentArray[j]){
        inheritChildren(subs[i], findByName(subs, parentArray[j]))
      }
    }
  }
}
function draw() {
  background(51);
  t = frameCount / 60;
  misc();


  translate(controls.view.x, controls.view.y);
  scale(controls.view.zoom);
  for (let i = 0; i < subs.length; i++) {
    if (subs[i]) {
      subs[i].makePath();
    }
  }
  for (let i = 0; i < subs.length; i++) {
    if (subs[i]) {
      subs[i].display();
      subs[i].windowOpen();
    }
  }

  temp();
  //print(subs)
  // if(t > 1/2){
  //   noLoop()
  // }
}

function gatherURL() {
  print(input.value());
}

function mouseClicked() {
  for (let i = 0; i < subs.length; i++) {
    subs[i].interact();
  }
}



