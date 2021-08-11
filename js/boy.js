class Boy {

    constructor(x, y, ax, ay, img, sound, id) {
        this.position = createVector(x, y);
        this.velocity = createVector(ax, ay);
        this.img = loadImage('img/' + img);
        this.make_id(id);
        this.make_audio(sound);
    }

    make_id(id) {
        let i = '';
        do {
            this.id = id + i;
            i++;
        } while (document.getElementById(this.id));
    }

    make_audio(sound) {
        let fragment = document.createDocumentFragment();
        let temp = document.createElement('div');
        temp.innerHTML = '<audio src="/audio/' + sound + '" class="audio" id="' + this.id + '"></audio>';
        while (temp.firstChild) {
            fragment.appendChild(temp.firstChild);
        }
        document.body.insertBefore(fragment, document.body.childNodes[0]);

        let audio = document.getElementById(this.id);
        audio.addEventListener('ended', function() {
            audio.parentNode.removeChild(audio);
        }, false);
        audio.volume = 0.5;
        audio.play();
    }

    update() {
        this.velocity.add(createVector(0, 0.5));
        this.position.add(this.velocity);

        if (this.position.x <= 0 || this.position.x >= width - size) {
            this.velocity = createVector(-this.velocity.x, this.velocity.y);
        }
    }

    draw() {
        stroke(0);
        strokeWeight(2);
        fill(255,127);
        image(this.img, this.position.x, this.position.y, size, size);
    }
}
