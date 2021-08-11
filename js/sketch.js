let baby, direction;
let offset_x, offset_y, size, speed, init_speed;
let width, height, extend;
let border_y, border_x;
let config;
let boys_next_door;
let frame;
let start_gachi;

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
    config = {
        "speed"     : "random",
        "direction" : "random"
    }

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", '/config.json', false);
    xmlhttp.send();
    if (xmlhttp.status === 200) {
       config = xmlhttp.responseText;
    }

    config = JSON.parse(config);

    init_speed = config['speed'] === 'random' ? floor(random(1, 5)) : config['speed'];
    extend = 5;

    let index = config['direction'] === 'random' ? floor(random() * Object.keys(Directions).length) : config['direction'];
    direction = Directions[Object.keys(Directions)[index]];

    update_screen();

    border_y = size * 2;
    border_x = size * 2;

    offset_x = 0;
    offset_y = 0;

    frame = 0;
    start_gachi = false;

    boys_next_door = [];

    baby = loadImage('img/babyface.png');
    createCanvas(width, height);
}

function draw() {
    clear();
    background(255,165,0);
    draw_babies();

    if (start_gachi) {
        if (floor(random(0, 1000)) === 1) {
            bornBoy();
        }

        frame++;
        if (frame >= 100) {
            frame = 0;
            bornBoy();
        }
    }

    boys_next_door.forEach(function(boy, i, boys_next_door) {
        boy.update();
        boy.draw();

        if (boy.position.y >= height + size) {
            boys_next_door.splice(i, 1);
        }
    });
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

function update_screen(){
    width = windowWidth - ((windowWidth / 100) * 30);
    height = windowHeight - ((windowHeight / 100) * 20);

    let longest_screen_line = (width < height) ? width : height;
    size = longest_screen_line / 4;
    speed = init_speed * longest_screen_line / 500;
}

function windowResized() {
    update_screen();
    resizeCanvas(width, height);
}

function deviceTurned() {
    update_screen();
    resizeCanvas(width, height);
}

function bornBoy() {
    let x = random(size, width - size);
    let y = height + size;
    let ax = random(-10, 10);
    let ay = random(-35, -16);

    let boys = config['boys'];
    let boy;

    do {
        boy = boys[floor(random(0, boys.length - 1))];
    } while(boys_next_door.includes(boy));

    let img = boy.imgs[floor(random(0, boy.imgs.length - 1))];
    let sound;

    do {
        sound = boy.sounds[floor(random(0, boy.sounds.length - 1))];
    } while (document.getElementById(boy['id'] + sound));

   boys_next_door.push(new Boy(x, y, size, ax, ay, img, sound, boy['id']));
}
