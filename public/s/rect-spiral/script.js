/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const RECT_SPIRAL = (p5, el) => {
    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
    }

    p5.draw = () => {
        p5.background(0);

        p5.translate(p5.height / 2, p5.height / 2);

        p5.push();
        p5.angleMode(p5.DEGREES);
        p5.rectMode(p5.CENTER);
        p5.noFill();

        for (let i = 0; i < 360 * 4; i += 18) {
            p5.push();
            p5.rotate(i / 5.4);
            p5.rotate((p5.frameCount * i) / 720);
            p5.stroke(255, 255, 255, (1080 * 36) / i);
            p5.strokeWeight(1.8);
            p5.rect(0, 0, i, i);
            p5.pop();
        }
        p5.pop();
    }
};

new p5((p) => RECT_SPIRAL(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);