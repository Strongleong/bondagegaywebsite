let baby;
let base_x, base_y, size, speed;
let width, height;
let b_up, b_left;
let do_offset

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

    b_up   = size * 2;
    b_left = size * 2;

    base_x = -b_up;
    base_y = -b_left;

    baby = loadImage('img/babyface.png');

    createCanvas(width, height);
}

function draw() {
    clear();
    background(255,165,0);

    base_x = base_x - speed;
    base_y = base_y + speed;

    if (base_x <= -b_left) {
        base_x = width + b_left // + (-size - base_x);
    }
    if (base_y >= height + b_up) {
        base_y = -b_up + base_y - height;
    }

    for (let y = base_y; y <= height + b_up; y += size) {
        let do_offset = false
        for (let x = base_x; x <= width + b_left; x += size) {
            image(baby, x, y + (do_offset ? size / 2 : 0), size, size);
            do_offset = !do_offset
        }

        do_offset = false
        for (let x = base_x; x >= -b_up; x -= size) {
            image(baby, x, y + (do_offset ? size / 2 : 0), size, size);
            do_offset = !do_offset
        }
    }

    for (let y = base_y; y >= -b_left; y -= size) {
        do_offset = false
        for (let x = base_x; x <= width + b_up; x += size) {
            image(baby, x, y + (do_offset ? size / 2 : 0), size, size);
            do_offset = !do_offset
        }

        do_offset = false
        for (let x = base_x; x >= -b_up; x -= size) {
            image(baby, x, y + (do_offset ? size / 2 : 0), size, size);
            do_offset = !do_offset
        }
    }

    noFill();
    stroke(255);
    ellipse(base_x, base_y, size, size);
}