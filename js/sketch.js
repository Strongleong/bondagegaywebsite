let baby;
let offset_x, offset_y, size, speed;
let width, height;
let border_y, border_x;

function setup() {
    width = windowWidth - ((windowWidth / 100) * 30);
    height = windowHeight - ((windowHeight / 100) * 20);

    speed = 3;

    if (width < height) {
        size = width / 4;
        speed *= width / 500;
    }
    else {
        size = height / 4;
        speed *= height / 500;
    }

    border_y = size;
    border_x = size * 2;

    offset_x = -border_x;
    offset_y = -border_y;

    baby = loadImage('img/babyface.png');

    createCanvas(width, height);
}

function draw() {
    clear();
    background(255,165,0);

    draw_babies();
}

function draw_babies() {
    offset_x = offset_x - speed;
    offset_y = offset_y + speed;

    if (offset_x <= -border_x - size * 2) offset_x = -border_x;
    if (offset_y >= border_y - size) offset_y = -border_y + offset_y;

    for (let y = -border_y; y <= height + border_y; y += size) {
        let do_checkerboard = false
        for (let x = -border_x; x <= width + border_x * 2; x += size) {
            let final_x = x + offset_x;
            let final_y = y + (do_checkerboard ? size / 2 : 0) + offset_y;

            image(baby, final_x, final_y, size, size);
            do_checkerboard = !do_checkerboard
        }
    }
}