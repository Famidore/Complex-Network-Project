var tempX, tempY, tempSpeedX, tempSpeedY;
let snowflakes = [];



function tempSetup(sizeX, sizeY) {
    canvas.mouseWheel(e => Controls.zoom(controls).worldZoom(e))

    // temp setup
    sX = sizeX;
    sY = sizeY;
    tempX = sizeX / 2;
    tempY = sizeY / 2;
    tempSpeedX = 3;
    tempSpeedY = 3;
}

function temp() {
    if (mouseIsPressed) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }
}

function misc() {
    textSize(20);
    textAlign(LEFT);
    fill(255, 0, 150, 200);
    noStroke();
    text('Paste a reddit community link below', input.x, input.y - 20);
}


// Setup for input box
function inputSetup() {
    input = createInput().attribute('placeholder', 'Enter link here');
    input.style('color', '#8400ff');
    input.position(50, windowHeight - 50);

    button = createButton('Submit');
    button.position(input.x + input.width, windowHeight - 50);
    button.mousePressed(gatherURL);
}

function checkIfInside(array, item) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == item) {
            return true
        }
    }
    return false
}


// Transfer sub's parameters
function exchangeInfo(sub1, sub2) {
    if (sub1.members && sub1.thumbnail && sub1.parent && sub1.parentID) {
        sub1.members = sub2.members
        sub1.thumbnail = sub2.thumbnail
        sub1.parent = sub2.parent
        sub1.parentID = sub2.parentID
        sub1.x = sub2.x
        sub1.y = sub2.y
    }
}


// Return sub's object searching by name
function findByName(arrayOfSubs, n) {
    for (let i = 0; i < arrayOfSubs.length; i++) {
        if (arrayOfSubs[i].name == n) {
            return arrayOfSubs[i]
        }
    }
}


// Transfer the sub's children and give them the new parent
function inheritChildren(first, target) {
    if (first.ID != 0 && first != target) {
        target.children = first.children
        first.hidden = true
        for (let i = 0; i < target.children.length; i++){
            findByName(subs, target.children[i]).parentID = target.ID
        }
    }
}