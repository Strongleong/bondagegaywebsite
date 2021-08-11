class BabiesController {
    
    constructor(speed, direction, image) {
        this.offset_x = 0;
        this.offset_y = 0;
        this.direction = direction;
        this.image = image;

        this.set_direction(direction);
        this.set_speed(speed);
    }

    set_direction(direction) {
        this.direction = direction === 'random' ? Directions[floor(random(0, Directions.length))] : direction;
    }

    set_speed(speed) {
        this.speed = (speed === "random" ? floor(random(1, 5)) : speed) * size / 125;
    }

    update() {
        if (["UP_LEFT", "UP", "UP_RIGHT"].includes(this.direction)) {
            this.offset_y = this.offset_y - this.speed;
            if (this.offset_y <= -border_y) this.offset_y = -this.offset_y;
        }

        if (["DOWN_LEFT", "DOWN","DOWN_RIGHT"].includes(this.direction)) {
            this.offset_y = this.offset_y + this.speed;
            if (this.offset_y >= border_y) this.offset_y = -this.offset_y;
        }

        if  (["UP_RIGHT", "RIGHT", "DOWN_RIGHT"].includes(this.direction)) {
            this.offset_x = this.offset_x + this.speed;
            if (this.offset_x >= border_x) this.offset_x = -this.offset_x;
        }

        if (["UP_LEFT", "LEFT", "DOWN_LEFT"].includes(this.direction)) {
            this.offset_x = this.offset_x - this.speed;
            if (this.offset_x <= -border_x) this.offset_x = -this.offset_x;
        }
    }

    draw() {
        for (let y = -size * 5; y <= height + size * 5; y += size) {
            let do_checkerboard = false
            for (let x = -size * 5; x <= width + size * 5; x += size) {
                let final_x = x + this.offset_x;
                let final_y = y + (do_checkerboard ? size / 2 : 0) + this.offset_y;

                image(this.image, final_x, final_y, size, size);
                do_checkerboard = !do_checkerboard
            }
        }
    }

}