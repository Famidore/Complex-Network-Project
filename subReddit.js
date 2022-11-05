class subReddit {
    constructor() {
        this.x = random(width);
        this.y = random(height);
    }

    display() {
        fill(0, 255, 0, 150);
        noStroke();
        ellipse(this.x, this.y, 25, 25);
    }

}