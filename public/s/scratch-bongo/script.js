/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const SCRATCH_BONGO = (p5, el) => {
    let shapeSize = 20;
    let palettes = [
        ["#000501", "#73ab84", "#99d19c", "#79c7c5"],
        ["#5e2bff", "#c04cfd", "#fc6dab", "#f7f6c5"],
        ["#e4572e", "#17bebb", "#ffc914", "#2e282a"],
        ["#02111b", "#3f4045", "#30292f", "#5d737e"],
        ["#c96480", "#b47978", "#b1ae91", "#95bf8f"],
        ["#d0cfec", "#6a8e7f", "#989572", "#c6ae82"]

    ];
    let currentPalette = 0;
    let palette = palettes[0];
    let colors = [];
    let oldColors = [];

    let x = 0.1;
    let y = 0.07;
    let z = 0;

    let transitioning = false;
    let transitionT = 1;

    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
        p5.noStroke();

        for (let i = 0; i < p5.width; i += shapeSize) {
            let row = [];
            for (let j = 0; j < p5.width; j += shapeSize) {
                row.push(p5.random(palette));
            }
            colors.push(row);
        }
        oldColors = structuredClone(colors);
        p5.smooth();
    }

    p5.draw = () => {
        p5.background(255);
        p5.color(0);

        if (transitioning) {
            transitionT += 0.015;
            if (transitionT >= 1) {
                transitionT = 1;
                transitioning = false;
            }
        }

        if (p5.frameCount % 300 === 0) {
            currentPalette = (currentPalette + 1) % palettes.length;
            resetColors();
        }

        p5.rectMode(p5.CENTER);
        for (let i = 0; i < p5.width; i += shapeSize) {
            for (let j = 0; j < p5.width; j += shapeSize) {
                let color = p5.lerpColor(
                    p5.color(oldColors[i / shapeSize][j / shapeSize]),
                    p5.color(colors[i / shapeSize][j / shapeSize]),
                    transitionT
                );
                p5.fill(color);

                let size =
                    1.5 * shapeSize * p5.noise((i * x) / shapeSize, (j * y) / shapeSize, z);
                p5.circle(i + shapeSize / 2, j + shapeSize / 2, size);
            }
        }

        z = p5.frameCount * 0.01;
    }

    function resetColors() {
        oldColors = structuredClone(colors);
        colors = [];
        for (let i = 0; i < p5.width; i += shapeSize) {
            let row = [];
            for (let j = 0; j < p5.width; j += shapeSize) {
                row.push(p5.random(palettes[currentPalette]));
            }
            colors.push(row);
        }
        transitionT = 0;
        transitioning = true;
    }

};

new p5((p) => SCRATCH_BONGO(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);