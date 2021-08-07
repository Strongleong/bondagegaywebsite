let baby;
let base_x, base_y, size, speed;
let width, height;

function setup() {
    width = windowWidth - ((windowWidth / 100) * 30);
    height = windowHeight - ((windowHeight / 100) * 30);

    speed = 3;

    if (width < height) {
        size = width / 4;
        speed *= width / 500;
    }
    else {
        size = height / 4;
        speed *= height / 500;
    }

    base_x = -size;
    base_y = -size;

    baby = loadImage('img/babyface.png');

    createCanvas(width, height);
}

function draw() {
    clear();
    background(255,165,0);

    base_x = base_x - speed;
    base_y = base_y + speed;

    if (base_x <= -size) {
        base_x = width + size // + (-size - base_x);
    }
    if (base_y >= height + size) {
        base_y = -size + base_y - height;
    }

    for (let x = base_x; x <= width + size; x += size) {
        let do_offset = false
        for (let y = base_y; y <= height + size; y += size) {
            image(baby, x, y + (do_offset ? size / 2 : 0), size, size);
            //do_offset = !do_offset
        }

        for (let y = base_y; y >= -size; y -= size) {
            image(baby, x , y+ (do_offset ? size / 2 : 0), size, size);
            //do_offset = !do_offset
        }
    }

    for (let x = base_x; x >= -size; x -= size) {
        let do_offset = false
        for (let y = base_y; y <= height + size; y += size) {
            image(baby, x, y + (do_offset ? size / 2 : 0), size, size);
            //do_offset = !do_offset
        }

        for (let y = base_y; y >= -size; y -= size) {
            image(baby, x, y + (do_offset ? size / 2 : 0), size, size);
            //do_offset = !do_offset
        }
    }

    noFill();
    stroke(255);
    ellipse(base_x, base_y, size, size);
}