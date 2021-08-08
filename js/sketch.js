let baby, direction;
let offset_x, offset_y, size, speed, init_speed;
let width, height, extend;
let border_y, border_x;
const Directions = {
    UP : "UP",
    UP_RIGHT: "UP_RIGHT",
    RIGHT: "RIGHT",
    DOWN_RIGHT: "DOWN_RIGHT",
    DOWN: "DOWN",
    DOWN_LEFT: "DOWN_LEFT",
    LEFT: "LEFT",
    UP_LEFT: "UP_LEFT"
};

function setup() {
    width = windowWidth - ((windowWidth / 100) * 30);
    height = windowHeight - ((windowHeight / 100) * 20);

    init_speed = floor(random(1, 5));
    extend = 5;

    let longest_screen_line = (width < height) ? width : height;
    size = longest_screen_line / 4;
    speed = init_speed * longest_screen_line / 500;

    let rand = floor(random() * Object.keys(Directions).length);
    direction = Directions[Object.keys(Directions)[rand]];

    border_y = size * 2;
    border_x = size * 2;

    offset_x = 0;
    offset_y = 0;

    baby = loadImage('img/babyface.png');
    createCanvas(width, height);
}

function draw() {
    clear();
    background(255,165,0);

    draw_babies();
}

function draw_babies() {
    if (direction === Directions.UP_LEFT || direction === Directions.UP || direction === Directions.UP_RIGHT) {
        offset_y = offset_y - speed;
        if (offset_y <= -border_y) offset_y = -offset_y;
    }
    
    if (direction === Directions.DOWN_LEFT || direction === Directions.DOWN ||direction === Directions.DOWN_RIGHT) {
        offset_y = offset_y + speed;
        if (offset_y >= border_y) offset_y = -offset_y;
    }

    if  (direction === Directions.UP_RIGHT || direction === Directions.RIGHT || direction === Directions.DOWN_RIGHT) {
        offset_x = offset_x + speed;
        if (offset_x >= border_x) offset_x = -offset_x;
    }

    if (direction === Directions.UP_LEFT || direction === Directions.LEFT || direction === Directions.DOWN_LEFT) {
        offset_x = offset_x - speed;
        if (offset_x <= -border_x) offset_x = -offset_x;
    }

    for (let y = -size * extend; y <= height + size * extend; y += size) {
        let do_checkerboard = false
        for (let x = -size * extend; x <= width + size * extend; x += size) {
            let final_x = x + offset_x;
            let final_y = y + (do_checkerboard ? size / 2 : 0) + offset_y;

            image(baby, final_x, final_y, size, size);
            do_checkerboard = !do_checkerboard
        }
    }
}

function windowResized() {
    width = windowWidth - ((windowWidth / 100) * 30);
    height = windowHeight - ((windowHeight / 100) * 20);

    let longest_screen_line = (width < height) ? width : height;
    size = longest_screen_line / 4;
    speed = init_speed * longest_screen_line / 500;

    resizeCanvas(width, height);
}