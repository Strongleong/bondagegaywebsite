const cache = {};

class Boy {
    constructor(position, velocity, boy_config) {
        this.audio_ready = false;
        this.position    = createVector(position.x, position.y);
        this.velocity    = createVector(velocity.x, velocity.y);
        this.id          = this.make_unique_id(boy_config.id);
        this.img         = this.get_image(arr_get_random(boy_config.imgs));
        this.audio       = this.get_audio(arr_get_random(boy_config.sounds));
    }

    static make_random() {
        const position = {
            x: random(size, width - size),
            y: height + size,
        };

        const velociy = {
            x: random(-width / 130, width / 130),
            y: random((-2 * size + gravity) / 10, (height - gravity) / -25),
        };

        const boy_config = arr_get_random(config.boys);
        return new Boy(position, velociy, boy_config);
    }

    get_image(path) {
        if (!cache[path]) {
            cache[path] = loadImage("/img/" + path);
        }

        return cache[path];
    }

    make_unique_id(id) {
        return id + Date.now();
    }

    get_audio(sound) {
        if (!cache[sound]) {
            cache[sound] = createAudio("/audio/" + sound, () => this.audio_ready = true);
        } else {
            this.audio_ready = true;
        }

        return cache[sound];
    }

    update() {
        if (this.audio_ready) {
            this.audio.play();
            this.audio_ready = false;
        };

        this.velocity.add(createVector(0, gravity));
        this.position.add(this.velocity);

        if (this.position.x <= 0 || this.position.x >= width - size) {
            this.velocity = createVector(-this.velocity.x, this.velocity.y);
        }
    }

    draw() {
        stroke(0);
        strokeWeight(2);
        fill(255,127);
        const ratio = this.img.width / this.img.height;
        image(this.img, this.position.x, this.position.y, size, size);
    }
}


let boys_next_door = [];

function boys_update() {
    if (start_gachi) {
        const enoughRoomForBoy = boys_next_door.length < 3;
        const randomChanceSucceeded = random(0, 1) <= 0.008;
        const isTooManyFramesPassed = frameCount % 100 === 0;

        if (enoughRoomForBoy && (randomChanceSucceeded || isTooManyFramesPassed)) {
            boys_next_door.push(Boy.make_random());
        }
    }

    const for_deletion = [];

    boys_next_door.forEach(boy => {
        boy.update();
        boy.draw();

        if (boy.position.y >= height + size) {
            for_deletion.push(boy.id);
        }
    });

    boys_next_door = boys_next_door.filter(boy => !for_deletion.includes(boy.id));
}
