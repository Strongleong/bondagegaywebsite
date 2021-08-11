let babies;
let size, speed;
let width, height;
let border_y, border_x;
let config;
let boys_next_door;
let start_gachi;
let max_boys;

const Directions = [
     "UP",
    "UP_RIGHT",
    "RIGHT",
    "DOWN_RIGHT",
    "DOWN",
    "DOWN_LEFT",
    "LEFT",
    "UP_LEFT"
];

function setup() {
    start_gachi = false;

    update_screen();
    config = load_config('/config.json');

    max_boys = 3;

    border_y = size * 2;
    border_x = size * 2;

    babies = new BabiesController(config['speed'], config['direction'], loadImage('img/babyface.png'));
    boys_next_door = [];

    createCanvas(width, height);
}

function draw() {
    clear();
    background(255,165,0);
    babies.update();
    babies.draw();

    if (start_gachi && boys_next_door.length < max_boys) {
        if (floor(random(0, 1)) > 0.01 || frameCount % 100 === 0) {
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

function update_screen(){
    width = windowWidth - ((windowWidth / 100) * 30);
    height = windowHeight - ((windowHeight / 100) * 20);
    size = min(width, height) / 4;
    resizeCanvas(width, height);
}

function windowResized() {
    update_screen();
    babies.set_speed(config['speed']);
}

function deviceTurned() {
    update_screen();
    babies.set_speed(config['speed']);
}

function load_config(config_file) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", config_file, false);
    xmlhttp.send();
    let config;
    if (xmlhttp.status === 200) {
        config = JSON.parse(xmlhttp.responseText);
    } else {
        config = {
            "speed": "random",
            "direction": "random"
        }
    }

    return config;
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
