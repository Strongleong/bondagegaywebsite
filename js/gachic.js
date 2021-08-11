class Boy {
    constructor(x, y, size, ax, ay, img, sound, id) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(ax, ay);

        this.w = size;
        this.h = size;

        this.img = loadImage('img/' + img);

        let i = 0;
        this.id = id;

        while (document.getElementById(this.id)) {
            i++;
            this.id = id + i;
        }

        if (document.getElementById(this.id)) this.id += '1';

        let fragment = create('<audio src="/audio/' + sound + '" ' +
            'class="audio" id="' + this.id + '"></audio>');

        document.body.insertBefore(fragment, document.body.childNodes[0]);

        let audio = document.getElementById(this.id);

        audio.addEventListener('ended', function() {
            audio.parentNode.removeChild(audio);
        }, false);

        audio.volume = 0.5;
        audio.play();
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.add(createVector(0, 0.5));
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        if (this.position.x <= 0 || this.position.x >= width - size) {
            this.velocity = createVector(-this.velocity.x, this.velocity.y);
        }
    }

    draw() {
        stroke(0);
        strokeWeight(2);
        fill(255,127);
        image(this.img, this.position.x, this.position.y, this.h, this.w);
    }
}

function create(htmlStr) {
    let frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}