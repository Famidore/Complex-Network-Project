class subReddit {

    constructor(x, y, ID) {
        this.x = x;
        this.y = y;
        this.ID = ID;
    }

    display() {
        fill(0, 255, 0, 150);
        noStroke();
        ellipse(this.x, this.y, 25, 25);
    }

    makePath() {
        stroke(255, 0, 0);
        line(this.x, this.y, subs[abs(this.ID - 1)].x, subs[abs(this.ID - 1)].y)
    }

}