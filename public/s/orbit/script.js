/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const ORBIT = (p5, el) => {
    let spacing = 3
    let circleSize = 10

    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
        p5.angleMode(p5.DEGREES)
        p5.stroke(255)
    }

    p5.draw = () => {
        p5.background(0);
        p5.translate(p5.width / 2, p5.height / 2);
        for (let k = 0; k < p5.width / 2; k += 10) {
            for (let i = 0; i < 360; i += 72 / (k / 10)) {
                let r = spacing * k;
                let direction = (k / 10) % 2 === 0 ? -p5.frameCount : p5.frameCount
                let speed = 10 / k
                let x = r * p5.cos(i + direction * speed);
                let y = r * -p5.sin(i + direction * speed);
                p5.circle(x, y, k / 15 + circleSize);
            }
        }

        p5.circle(0, 0, circleSize)

    }
};

new p5((p) => ORBIT(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);