let button, input, canvas, t;
let subs = [];
//let path = 'pythonWebscrapper/data.txt'
let path = 'pythonWebscrapper/exampleData.txt'
let count, elements
let names = [];
let parentArray = []


// Load the data
function preload() {
  d = loadStrings(path)
}


function setup() {
  // Do all the setups
  count = d.length - 1;
  canvas = createCanvas(windowWidth, windowHeight);
  tempSetup(windowWidth, windowHeight);
  inputSetup();

  for (let j = 0; j <= count - 1; j++) {
    elements = (splitTokens(d[j], "'").length - 1) / 6
    let parent = split(splitTokens(d[j], ". ")[2], 'com/')[1]
    let parentId = subs.length
    // Add parent
    names.push(parent)
    subs.push(new subReddit(width / 2, height / 2 + j * 50, 20, parentId, parent, null, null, null, null, [], random(1,3)))
    parentArray.push(parent)

    // Add child here
    for (let i = 0; i < elements * 6; i += 6) {
      let index = subs.length

      // Verify if the sub is already added
      if (!(checkIfInside(names, splitTokens(d[j], "'")[i + 1]))) {

        var tempName = splitTokens(d[j], "'")[i + 1]
        var tempMembers = splitTokens(d[j], "'")[i + 3]
        var tempThumbnail = splitTokens(d[j], "'")[i + 5]

        subs.push(new subReddit(random(300, 500), random(300, 500), 20, index, tempName, tempMembers, tempThumbnail, parent, parentId, [], random(1, 3)))
        subs[parentId].children.push(tempName)
        //names.push(tempName)
      };
    };
  }

  // Transfer children to main parent
  for (let i = 0; i < subs.length; i++) {
    for (let j = 0; j < parentArray.length; j++) {
      if (subs[i].name == parentArray[j]) {
        inheritChildren(subs[i], findByName(subs, parentArray[j]))
      }
    }
  }
  
  
  console.log(subs)
}

function draw() {
  background(51);
  t = frameCount / 60;
  misc();


  // Translate and zoom screen
  translate(controls.view.x, controls.view.y);
  scale(controls.view.zoom);

  // Connect subs with lines
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
  //console.log(subs)

  for(let i = 0; i < subs.length; i++){
    if (!(subs[i].connected)){
      subs[i].hidden = true
    }
  }
  
}


// TODO: let user choose his sub
function gatherURL() {
  console.log(input.value());
}

function mouseClicked() {
  for (let i = 0; i < subs.length; i++) {
    subs[i].interact();
  }
}



