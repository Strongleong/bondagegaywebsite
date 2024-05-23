let size;
let width, height;
let start_gachi;
let gravity;

function setup() {
    start_gachi = false;
    update_size();
    // music_setup();
    babies_setup();
    createCanvas(width, height);
}

function draw() {
    clear();
    background(255, 165, 0);
    babies_update();
    // music_update();
    // boys_update();
}

function update_size() {
    const rect = document.getElementById('main').getBoundingClientRect();
    width      = rect.width;
    height     = rect.height;
    size       = min(width, height) / 4;
    gravity    = height / 1481;
}

function windowResized() {
    update_size();
    resizeCanvas(width, height);
    babies_refresh();
}
