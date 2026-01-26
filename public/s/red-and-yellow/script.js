/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const RED_AND_YELLOW = (p5, el) => {
    let rows;
    let cols;
    let rectSize = 0;
    let isCaptured = false;

    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
        rectSize = height / 32;
        rows = p5.floor(height / rectSize);
        cols = p5.floor(height / rectSize);
        p5.noStroke();
        p5.rectMode(p5.CENTER);
    }

    p5.draw = () => {
        p5.background("#EA3546");

        for (let i = -2; i < rows; i++) {
            for (let j = -2; j < cols; j++) {
                let x = i * rectSize + rectSize / 2;
                let y = j * rectSize + rectSize / 2;

                p5.push();

                let d = p5.dist(i, j, rows / 2, cols / 2);
                let maxD = p5.dist(0, 0, rows / 2, cols / 2);
                let a = p5.map(d, 0, maxD, 255, 180, true);
                p5.fill(249, 200, 14, a);

                p5.translate(x, y);

                let dir = (i + j) % 2 === 0 ? 1 : -1;
                p5.rotate(dir * p5.sin(p5.frameCount * 0.03));

                let angle = p5.atan2(j - rows / 2, i - cols / 2);
                p5.rotate(angle + p5.sin(p5.frameCount * 0.02));

                p5.rect(0, 0, rectSize * ((i + j) % 2 === 0 ? 0.75 : 1.25), rectSize * 0.1);

                p5.pop();
            }
        }
        if(!isCaptured && p5.frameCount % 512 === 0) {
            isCaptured = true;
            p5.saveCanvas('red-and-yellow', 'png');
        }
    }
};

new p5((p) => RED_AND_YELLOW(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);