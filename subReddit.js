class subReddit {

    constructor(x, y, r, ID, name, members, thumbnail, parent, parentID, children) {
        this.hidden = false
        this.openWindow = false;
        this.x = x;
        this.y = y;
        this.ID = ID;
        this.r = r

        this.name = name
        this.members = members
        this.thumbnail = thumbnail

        if (this.thumbnail) {
            this.pfp = new Image()
            this.pfp.src = this.thumbnail
        }

        this.parent = parent;
        this.parentID = parentID
        this.children = children
    }

    display() {
        if (!(this.hidden)) {
            noStroke();
            if (this.pfp != null) {
                drawingContext.drawImage(this.pfp, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
            } else {
                fill(255, 0, 150)
                textAlign(CENTER, CENTER)
                textSize(50)
                text(this.name, this.x, this.y)
            }
            this.constructWeb()
            //this.moveParent()
        }
    }

    makePath() {
        if (!(this.hidden)) {
            if (count > 1) {
                if (this.openWindow) {
                    stroke(255, 0, 255);
                } else {
                    stroke(255, 0, 0);
                }
                if (this.children.length > 0) {
                    for (let i = 0; i < this.children.length; i++) {
                        stroke(0)
                        line(this.x, this.y, subs[findByName(subs, this.children[i]).ID].x, subs[findByName(subs, this.children[i]).ID].y)

                    }
                }
            }
        }
    }

    interact() {
        if ((dist((mouseX - controls.view.x) / controls.view.zoom, (mouseY - controls.view.y) / controls.view.zoom, this.x, this.y) <= this.r)) {
            this.openWindow = true;
        } else {
            this.openWindow = false;
        }
    }

    windowOpen() {
        if (this.openWindow) {
            fill(0, 100);
            rect(this.x, this.y, 200, 100, 25);
            fill(255, 200);
            noStroke();
            textSize(20)
            textAlign(CENTER, BASELINE)
            text(this.name, this.x + 100, this.y + 40);
            textAlign(CENTER, TOP)
            if (this.parent) {
                text(this.members + " members", this.x + 100, this.y + 50);
                text("parent: " + this.parent, this.x + 100, this.y + 75)
                text("children: " + this.children, this.x + 100, this.y + 100)
                text("ID: " + this.ID, this.x + 100, this.y + 125)
            }

        }
    }

    constructWeb() {
        if (this.parentID >= 1 && subs[this.parentID] && subs[this.parentID].children || this.parentID == 0) {
            this.parentX = subs[this.parentID].x
            this.parentY = subs[this.parentID].y

            this.childLen = subs[this.parentID].children.length
            this.x = this.parentX;
            this.y = this.parentY + 150;

            for (let i = 0; i < this.childLen; i++) {
                if (this.ID == findByName(subs, subs[this.parentID].children[i]).ID) {
                    this.x += (floor(this.childLen / 2) - i) * 50
                }
            }
        }
    }
}