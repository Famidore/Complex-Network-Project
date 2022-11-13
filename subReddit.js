class subReddit {

    constructor(x, y, r, ID, name, members, thumbnail) {
        this.openWindow = false;
        this.x = x;
        this.y = y;
        this.ID = ID;
        this.r = r

        this.name = name
        this.members = members
        this.thumbnail = thumbnail

        this.pfp = new Image()
        this.pfp.src = this.thumbnail
    }

    display() {
        noStroke();
        drawingContext.drawImage(this.pfp, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
    }

    makePath() {
        if (count > 1) {
            if (this.openWindow) {
                stroke(255, 0, 255);
            } else {
                stroke(255, 0, 0);
            }
            line(this.x, this.y, subs[abs(this.ID - 1)].x, subs[abs(this.ID - 1)].y)
        };
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
            text(this.members + " members", this.x + 100, this.y + 50);
        }
    }


}