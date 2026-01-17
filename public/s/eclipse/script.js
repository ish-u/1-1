/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const ECLIPSE = (p5, el) => {
    let isCaptured = false;
    class Moon {
        x;
        y;
        s;
        phase;
        constructor(x, y, s) {
            this.x = x;
            this.y = y;
            this.s = s;
            this.phase = 0;
        }

        show() {
            this.phase = ((p5.frameCount / 100 + p5.PI / 2) % p5.PI) - p5.PI / 2;
            p5.circle(this.x, this.y, this.s);
            p5.push();
            p5.fill(0);
            p5.circle(this.x + p5.sin(this.phase) * this.s, this.y, this.s);
            p5.pop();
        }
    }

    let moons = [];
    let circleSize = 0;

    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
        circleSize = height / 4;
        let rows = p5.floor(height / circleSize);
        let cols = p5.floor(height / circleSize);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let x = circleSize * i;
                let y = circleSize * j;
                let moon = new Moon(
                    x + circleSize / 2,
                    y + circleSize / 2,
                    circleSize / 2
                );
                moons.push(moon);
            }
        }
    };

    p5.draw = () => {
        p5.background(0);
        for (const moon of moons) {
            moon.show();
        }
        if (!isCaptured && p5.frameCount > 100) {
            p5.saveCanvas('eclipse', 'png'); // capture the canvas
            isCaptured = true; // prevent further captures
            console.log('Captured first frame!');
        }
    };

};

new p5((p) => ECLIPSE(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);