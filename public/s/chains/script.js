/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const CHAINS = (p5, el) => {
    let palette = ["64A6BD", "90A8C3"].map((c) => "#" + c);
    let paletteSquares = ["26547c", "ef476f", "ffd166", "06d6a0"].map(
        (c) => "#" + c
    );

    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
        p5.stroke(128);
        p5.strokeWeight(0.5);
    }

    p5.draw = () => {
        p5.clear();
        p5.background(
            p5.lerpColor(
                p5.color(palette[0]),
                p5.color(palette[1]),
                (1 - p5.cos(p5.millis() * 0.001)) * 0.5
            )
        );

        let spacing = 50;

        p5.push();

        p5.rectMode(p5.CENTER);
        for (let i = 0; i < p5.width + spacing; i += spacing) {
            for (let j = 0; j < p5.height + spacing; j += spacing) {
                p5.push();
                p5.translate(i, j);
                let offset = (p5.frameCount / 2 % spacing) - 10;

                p5.fill(paletteSquares[(i / spacing) % paletteSquares.length]);
                if (i / spacing % 2 === 0) {
                    p5.translate(0, offset);
                    p5.rotate(p5.QUARTER_PI);
                } else {
                    p5.translate(0, -offset);
                    p5.rotate(p5.QUARTER_PI);
                }

                p5.square(0, 0, spacing / 2);
                p5.pop();
            }
        }
    }
};

new p5((p) => CHAINS(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);