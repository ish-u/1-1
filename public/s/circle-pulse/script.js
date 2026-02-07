/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const CIRCLE_PULSE = (p5, el) => {
    let rows;
    let cols;
    let rectSize = 0;
    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height, p5.WEBGL);
        rectSize = height / 8;
        rows = p5.floor(p5.height / rectSize);
        cols = p5.floor(p5.height / rectSize);
        p5.angleMode(p5.DEGREES);
        p5.noFill();
    }


    p5.draw = () => {
        p5.background(0);

        p5.scale(0.75);
        p5.rotateX(p5.cos(p5.frameCount) * 6);
        p5.rotateY(p5.sin(p5.frameCount) * 12);
        p5.rotateZ(p5.frameCount / 16);

        p5.translate(-p5.height / 2, -p5.width / 2, 0);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let x = i * rectSize + rectSize / 2;
                let y = j * rectSize + rectSize / 2;


                for (let k = 1; k <= 7; k++) {
                    p5.stroke((i + j) % 2 === 0 ? 20 * k : k * 40);
                    p5.strokeWeight(2);
                    p5.push();
                    p5.translate(x, y, (p5.height / 100) * k);
                    p5.circle(
                        0,
                        0,
                        p5.abs(
                            (i + j) % 2 === 0
                                ? p5.sin(p5.frameCount + k * 7)
                                : p5.cos(p5.frameCount + k * 7)
                        ) *
                        rectSize *
                        1
                    );
                    p5.pop();
                }
            }
        }
    }

};

new p5((p) => CIRCLE_PULSE(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);