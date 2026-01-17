/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const TIME = (p5, el) => {
    let angle = 0;
    let circleSize = 144;
    let offsets = [];
    let camX = 0;
    let camY = 0;

    let cols = Math.ceil(p5.width / circleSize) + 2;
    let rows = Math.ceil(p5.height / circleSize) + 2;

    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
        p5.angleMode(p5.DEGREES);

        cols = Math.ceil(p5.width / circleSize) + 2;
        rows = Math.ceil(p5.height / circleSize) + 2;

        for (let i = 0; i < cols; i++) {
            let row = [];
            for (let j = 0; j < rows; j++) {
                row.push(p5.random(0, 360));
            }
            offsets.push(row);
        }
    };

    p5.draw = () => {
        p5.background(0);

        let startCol = Math.floor(camX / circleSize);
        let startRow = Math.floor(camY / circleSize);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let tileX = startCol + i;
                let tileY = startRow + j;

                let x = tileX * circleSize - camX;
                let y = tileY * circleSize - camY;

                let ix = ((tileX % cols) + cols) % cols;
                let iy = ((tileY % rows) + rows) % rows;

                let offset = 100 + offsets[ix][iy];

                p5.push();
                p5.translate(x + circleSize / 2, y + circleSize / 2);

                p5.circle(0, 0, circleSize - 20);

                p5.push();
                p5.fill(0);
                p5.circle(0, 0, circleSize / 12);
                p5.pop();

                p5.push();
                p5.fill(0);
                p5.rotate(offset * 2 + angle);
                p5.rectMode(p5.CENTER);
                p5.rect(circleSize / 4 - 5, 0, circleSize / 2 - 10, 0.5);
                p5.pop();

                p5.push();
                p5.fill(0);
                p5.rotate(offset + angle / 25);
                p5.rectMode(p5.CENTER);
                p5.rect(circleSize / 4 - 7.5, 0, circleSize / 2 - 15, 2);
                p5.pop();

                p5.push();
                p5.fill(0);
                p5.rotate(offset / 2 + angle / 50);
                p5.rectMode(p5.CENTER);
                p5.rect(circleSize / 4 - 10, 0, circleSize / 2 - 20, 4);
                p5.pop();

                p5.pop();
            }
        }

        camX += 0.5;
        camY += 0.5;
        angle += 0.25;
    };


};

new p5((p) => TIME(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);