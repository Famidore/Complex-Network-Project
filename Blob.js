class Blob {
    constructor() {
        this.x = 5;
        this.y = 10;
    }

    display() {
        fill(0, 255, 0);
        noStroke();
        ellipse(this.x, this.y, 25, 25);
    }
}