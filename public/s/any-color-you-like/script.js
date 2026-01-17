/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const ANY_COLOR_YOU_LIKE = (p5, el) => {
    let palette = [
        [128, 0, 128], // V
        [2, 197, 242], // B
        [103, 206, 0], // G
        [255, 255, 0], // Y
        [255, 128, 0], // O
        [255, 0, 0], // R
    ].reverse();

    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
    };

    p5.draw = () => {
        p5.background(0);
        p5.translate(p5.height / 2, p5.height / 2);
        let idx = 0;

        p5.push();
        p5.blendMode(p5.ADD);
        p5.angleMode(p5.DEGREES);
        p5.rectMode(p5.CENTER);
        for (let i = 18; i < 360 * 4; i += 18) {
            if (idx >= palette.length) {
                idx = 0;
            }
            let c = palette[idx];
            p5.fill(c[0], c[1], c[2], 1 / i);
            p5.push();
            p5.rotate(i / 5.4);
            p5.rotate((p5.frameCount * i) / 720);
            p5.stroke(c[0], c[1], c[2], (1080 * 36) / i);
            p5.strokeWeight(1.8);
            p5.rect(0, 0, i, i);
            p5.pop();
            idx++;
        }
        p5.pop();
    };

};

new p5((p) => ANY_COLOR_YOU_LIKE(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);