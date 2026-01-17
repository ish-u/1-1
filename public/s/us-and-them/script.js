/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const US_AND_THEM = (p5, el) => {
    class Ball {
        x;
        y;
        s;
        speed;
        constructor(s) {
            this.s = s;
            this.x = p5.random(0, p5.width);
            this.y = p5.random(0, p5.height);
            this.speed = p5.random(1, 2);
        }

        draw() {
            if (this.x > p5.width) {
                this.x = -this.s;
                this.y = p5.random(0, p5.height);
            }
            p5.push();
            p5.fill(this.x >= p5.width / 2 ? 0 : 255);
            p5.circle(this.x + this.s / 2, this.y, this.s);
            this.x += this.speed;
            p5.pop();
        }
    }

    let balls = [];

    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
        for (let i = 0; i < 128; i++) {
            balls.push(new Ball(p5.random(10, 50)));
        }
        p5.noStroke();
    };

    p5.draw = () => {
        p5.background(0);
        p5.rect(p5.height / 2, 0, p5.width / 2, p5.height);
        for (const ball of balls) {
            ball.draw();
        }
    };

};

new p5((p) => US_AND_THEM(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);