class subReddit {

    constructor(x, y, r, ID) {
        this.openWindow = false;
        this.x = x;
        this.y = y;
        this.ID = ID;
        this.r = r
    }

    display() {
        fill(0, 255, 0, 150);
        noStroke();
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    makePath() {
        if (count > 1) {
            stroke(255, 0, 0);
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
            textAlign(CENTER, CENTER)
            text(input.value(), this.x + 100, this.y + 50);
        }
    }

}