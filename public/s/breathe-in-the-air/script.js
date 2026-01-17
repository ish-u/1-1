/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const BREATH_IN_THE_AIR = (p5, el) => {
    let shapeSize = 25;
    let palette = [
        [128, 0, 128], // V
        [2, 197, 242], // B
        [103, 206, 0], // G
        [255, 255, 0], // Y
        [255, 128, 0], // O
        [255, 0, 0], // R
    ];
    let colors = [];
    let oldColors = [];

    let x = 0.1;
    let y = 0.07;
    let z = 0;

    let transitioning = false;
    let transitionT = 1;

    function resetColors() {
        oldColors = structuredClone(colors);
        colors = [];
        for (let i = 0; i < p5.width; i += shapeSize) {
            let row = [];
            for (let j = 0; j < p5.width; j += shapeSize) {
                row.push(p5.random(palette));
            }
            colors.push(row);
        }
        transitionT = 0;
        transitioning = true;
    }

    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);

        for (let i = 0; i < p5.width; i += shapeSize) {
            let row = [];
            for (let j = 0; j < p5.width; j += shapeSize) {
                row.push(p5.random(palette));
            }
            colors.push(row);
        }

        oldColors = structuredClone(colors);
    };

    p5.draw = () => {
        p5.background(0);

        if (transitioning) {
            transitionT += 0.015;
            if (transitionT >= 1) {
                transitionT = 1;
                transitioning = false;
            }
        }

        if (p5.frameCount % 300 === 0) {
            resetColors();
        }

        for (let i = 0; i < p5.width; i += shapeSize) {
            for (let j = 0; j < p5.width; j += shapeSize) {
                let color = p5.lerpColor(
                    p5.color(
                        oldColors[i / shapeSize][j / shapeSize][0],
                        oldColors[i / shapeSize][j / shapeSize][1],
                        oldColors[i / shapeSize][j / shapeSize][2]
                    ),
                    p5.color(
                        colors[i / shapeSize][j / shapeSize][0],
                        colors[i / shapeSize][j / shapeSize][1],
                        colors[i / shapeSize][j / shapeSize][2]
                    ),
                    transitionT
                );
                p5.stroke(color);
                p5.strokeWeight(2);
                p5.noFill();
                let size =
                    shapeSize * p5.noise((i * x) / shapeSize, (j * y) / shapeSize, z);

                size /= 1.25;

                let cX = i + shapeSize / 2;
                let cY = j + shapeSize / 2;

                let x1 = size * p5.cos(0);
                let y1 = size * p5.sin(0);

                let x2 = size * p5.cos((2 * p5.PI) / 3);
                let y2 = size * p5.sin((2 * p5.PI) / 3);

                let x3 = size * p5.cos((4 * p5.PI) / 3);
                let y3 = size * p5.sin((4 * p5.PI) / 3);

                p5.push();
                p5.translate(cX, cY);

                if (i % 2 === 0) {
                    p5.rotate(p5.PI / 2);
                } else {
                    p5.rotate(-p5.PI / 2);
                }

                p5.triangle(x1, y1, x2, y2, x3, y3);
                p5.pop();
            }
        }
        z = p5.frameCount * 0.01;
    };

};

new p5((p) => BREATH_IN_THE_AIR(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);