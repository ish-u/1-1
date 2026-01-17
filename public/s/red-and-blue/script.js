/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const RED_AND_BLUE = (p5, el) => {
    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
    }

    p5.draw = () => {
        p5.background(0);
        p5.noStroke()
        p5.blendMode(p5.BLEND)

        let spacing = 25;

        p5.push();
        p5.rectMode(p5.CENTER);
        p5.fill('#FDFFFC')
        for (let i = 0; i < p5.width + spacing; i += spacing) {
            for (let j = 0; j < p5.height + spacing; j += spacing) {
                p5.square(i + spacing / 2, j + spacing / 2, spacing);
            }
        }
        p5.pop();

        p5.push();
        p5.rectMode(p5.CENTER);
        for (let i = 0; i < p5.width + spacing; i += spacing) {
            for (let j = 0; j < p5.height + spacing; j += spacing) {
                p5.push();

                p5.translate(i * 2, j * 2);
                p5.rotate(p5.QUARTER_PI);

                p5.fill('#ED1C24')
                p5.square(0, 0, spacing / 2);

                p5.pop();
            }
        }
        p5.pop();

        p5.push();
        p5.rectMode(p5.CENTER);
        for (let i = 0; i < p5.width + spacing; i += spacing) {
            for (let j = 0; j < p5.height + spacing; j += spacing) {
                p5.push();

                p5.translate(i, j);
                p5.rotate(p5.HALF_PI);

                p5.fill('#235789')
                p5.rect(0, 0, spacing / 4);

                p5.fill('#F1D302')
                p5.circle(0, 0, spacing / 8);

                p5.pop();
            }
        }
        p5.pop();
    }
};

new p5((p) => RED_AND_BLUE(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);