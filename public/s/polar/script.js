/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const POLAR = (p5, el) => {
    // Ref -  https://en.wikipedia.org/wiki/Rose_(mathematics)
    class Rose {
        constructor(x, y, k, s) {
            this.x = x;
            this.y = y
            this.k = k;
            this.s = s;
            this.points = []
            this.build();
        }

        build() {
            for (let i = 0; i < 360 * 8; i += 1) {
                let radius = this.s / 4 * (p5.cos(this.k * i))
                let x = radius * p5.cos(i);
                let y = -radius * p5.sin(i);
                this.points.push({
                    x,
                    y
                });
            }
        }

        show() {

            p5.push()
            p5.stroke(255, 255, 255, 8)
            p5.rect(this.x, this.y, this.s)
            p5.pop()

            p5.push()

            p5.stroke(255)
            p5.translate(this.x + this.s / 2, this.y + this.s / 2)
            p5.rotate(p5.frameCount * 0.25)
            p5.beginShape()
            for (let point of this.points) {
                p5.vertex(point.x, point.y)
            }
            p5.endShape()

            p5.pop();

            p5.push();
            p5.translate(this.x + this.s / 2, this.y + this.s / 2)
            p5.noStroke()
            let i = p5.frameCount * 0.75;
            let radius = this.s / 4 * (p5.cos(this.k * i))
            let x = radius * p5.cos(i);
            let y = -radius * p5.sin(i);
            p5.fill("red")
            p5.rotate(p5.frameCount * 0.25)
            p5.circle(x, y, this.s / 24);
            p5.pop()
        }
    }

    let roses = []

    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);

        p5.angleMode(p5.DEGREES);
        p5.noFill()
        p5.strokeWeight(2.4)
        p5.stroke(255)
        p5.background(0)

        let roseSize = height / 8;
        let rows = p5.floor(height / roseSize);
        let cols = p5.floor(height / roseSize);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let rose = new Rose(roseSize * i, roseSize * j, (i + 1) / (j + 1), roseSize)
                roses.push(rose)
            }
        }
    };

    p5.draw = () => {
        p5.background(0)
        for (let rose of roses) {
            rose.show();
        }

    }
};

new p5((p) => POLAR(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);