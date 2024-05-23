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

const babies_state = {
    offset: {
        x: 0, y: 0,
    },
    speed: 0,
    speedPx: 0,
    image: '',
    direction: Directions[0],
}

function babies_setup() {
    babies_state.image = loadImage(config.babies.image);

    babies_state.direction = config.babies.direction === 'random'
                             ? arr_get_random(Directions)
                             : config.babies.direction;

    babies_state.speed = config.babies.speed === 'random'
                         ? floor(random(1, 5))
                         : config.babies.speed;
    babies_refresh();
}

function babies_refresh() {
    babies_state.speedPx = babies_state.speed * size / 125;
}

function babies_update() {
    const border_y = size * 2;
    const border_x = size * 2;

    if (["UP_LEFT", "UP", "UP_RIGHT"].includes(babies_state.direction)) {
        babies_state.offset.y -= babies_state.speedPx;
        if (babies_state.offset.y <= -border_y) babies_state.offset.y = -babies_state.offset.y;
    }

    if (["DOWN_LEFT", "DOWN","DOWN_RIGHT"].includes(babies_state.direction)) {
        babies_state.offset.y += babies_state.speedPx;
        if (babies_state.offset.y >= border_y) babies_state.offset.y = -babies_state.offset.y;
    }

    if  (["UP_RIGHT", "RIGHT", "DOWN_RIGHT"].includes(babies_state.direction)) {
        babies_state.offset.x += babies_state.speedPx;
        if (babies_state.offset.x >= border_x) babies_state.offset.x = -babies_state.offset.x;
    }

    if (["UP_LEFT", "LEFT", "DOWN_LEFT"].includes(babies_state.direction)) {
        babies_state.offset.x -= babies_state.speedPx;
        if (babies_state.offset.x <= -border_x) babies_state.offset.x = -babies_state.offset.x;
    }

    babies_draw();
}

function babies_draw() {
    for (let y = -size * 5; y <= height + size * 5; y += size) {
        let do_checkerboard = false
        for (let x = -size * 5; x <= width + size * 5; x += size) {
            let final_x = x + babies_state.offset.x;
            let final_y = y + (do_checkerboard ? size / 2 : 0) + babies_state.offset.y;

            image(babies_state.image, final_x, final_y, size, size);
            do_checkerboard = !do_checkerboard
        }
    }
}
