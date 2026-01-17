/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const BREATH_IN_THE_AIR = (p5, el) => {
    let palette = [
        [128, 0, 128], // V
        [2, 197, 242], // B
        [103, 206, 0], // G
        [255, 255, 0], // Y
        [255, 128, 0], // O
        [255, 0, 0], // R
    ];

    class Walker {
        x;
        y;
        c;
        constructor(c) {
            this.x = 0;
            this.y = 0;
            this.c = c;
        }

        move() {
            this.x += p5.random(-2, 2);
            this.y += p5.random(-2, 2);
            p5.stroke(p5.color(this.c[0], this.c[1], this.c[2]));
            p5.strokeWeight(10);
            p5.point(this.x, this.y);
            if (this.x > p5.height / 2 || this.x < -p5.height / 2) {
                this.x = 0;
            }

            if (this.y > p5.height / 2 || this.y < -p5.height / 2) {
                this.y = 0;
            }
        }
    }

    const walkers = [];

    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
        p5.background(0);
        for (let i = 0; i < 6; i++) {
            walkers.push(new Walker(palette[i]));
        }
    };

    p5.draw = () => {
        p5.translate(p5.height / 2, p5.width / 2);
        for (const walker of walkers) {
            walker.move();
        }
    };

};

new p5((p) => BREATH_IN_THE_AIR(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);