let baby, direction;
let offset_x, offset_y, size, speed;
let width, height;
let border_y, border_x;

function setup() {
    width = windowWidth - ((windowWidth / 100) * 30);
    height = windowHeight - ((windowHeight / 100) * 20);

    let longest_screen_line = (width < height) ? width : height;
    size = longest_screen_line / 4;
    speed = random(1, 5) * longest_screen_line / 500;

    border_y = size;
    border_x = size * 2;
    offset_x = -border_x;
    offset_y = -border_y;

    direction = 0;

    baby = loadImage('img/babyface.png');
    createCanvas(width, height);
}

function draw() {
    clear();
    background(255,165,0);

    draw_babies();
}

function draw_babies() {
    switch (direction) {
        case 0:
            offset_y = offset_y - speed;
            break;
        case 1:
            offset_x = offset_x + speed;
            offset_y = offset_y - speed;
			break;
        case 2:
            offset_x = offset_x + speed;
            break;
        case 3:
            offset_x = offset_x + speed;
            offset_y = offset_y + speed;
			break;
        case 4:
            offset_y = offset_y + speed;
            break;
        case 5:
            offset_x = offset_x - speed;
            offset_y = offset_y + speed;
			break;
        case 6:
            offset_x = offset_x - speed;
            break;
        case 7:
            offset_x = offset_x - speed;
            offset_y = offset_y - speed;
			break;
    }

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