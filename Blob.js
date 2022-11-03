class Blob {
    cunstructor(name, size) {
        this.name = name;
        this.size = size;
        let x = width / 2;
        let y = height / 2;

    }

    display() {
        fill(0, 255, 0);
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);
    }
}