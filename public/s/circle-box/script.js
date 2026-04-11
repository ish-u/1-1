/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const CIRCLE_BOX = (p5, el) => {
    const palette = ["#e4572e", "#17bebb", "#ffc914", "#2e282a"];

    class Ball {
        constructor(x, y, r) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.dirX = p5.random(-1, 1);
            this.dirY = p5.random(-1, 1);
            this.speed = p5.random(5, 10);
            this.c = p5.random(palette);
        }

        draw() {
            this.x += this.speed * this.dirX;
            this.y += this.speed * this.dirY;

            if (this.x - this.r / 2 <= 0) {
                this.x = this.r / 2;
                this.dirX *= -1;
                this.c = p5.random(palette);
            }
            if (this.x + this.r / 2 >= p5.width) {
                this.x = p5.width - this.r / 2;
                this.dirX *= -1;
                this.c = p5.random(palette);
            }
            if (this.y - this.r / 2 <= 0) {
                this.y = this.r / 2;
                this.dirY *= -1;
                this.c = p5.random(palette);
            }
            if (this.y + this.r / 2 >= p5.height) {
                this.y = p5.height - this.r / 2;
                this.dirY *= -1;
                this.c = p5.random(palette);
            }


            p5.noStroke();
            p5.fill(this.c);
            p5.circle(this.x, this.y, this.r + (this.r / 4) * p5.sin(p5.frameCount / 100));

        }
    }

    let balls = [];
    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
        for (let i = 0; i < 50; i++) {
            balls.push(new Ball(p5.random(0, p5.width), p5.random(0, p5.height), p5.random(25, 100)));
        }
    }

    p5.draw = () => {
        p5.background(255, 36);
        for (const ball of balls) {
            ball.draw();
        }
    }
};

new p5((p) => CIRCLE_BOX(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);