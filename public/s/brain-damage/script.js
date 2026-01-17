/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const BRAIN_DAMAGE = (p5, el) => {
    let rows;
    let cols;
    let tileSize = 0;
    let tileType = [];
    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
        tileSize = height / 24;
        rows = p5.floor(height / tileSize);
        cols = p5.floor(height / tileSize);

        for (let i = 0; i <= rows; i++) {
            const row = [];
            for (let j = 0; j <= cols; j++) {
                row.push(p5.floor(p5.random(2)));
            }
            tileType.push(row);
        }

        p5.angleMode(p5.DEGREES);
        p5.noFill();
        p5.stroke(255);
        p5.strokeWeight(3.6);
    };

    p5.draw = () => {
        p5.background(0);

        for (let i = 0; i <= rows; i++) {
            for (let j = 0; j <= cols; j++) {
                let x = tileSize * i;
                let y = tileSize * j;

                p5.push();
                p5.translate(x, y);
                p5.rotate(p5.frameCount / 2);
                if (tileType[i][j] === 0) {
                    p5.push();
                    p5.arc(0, 0, tileSize, tileSize, 0, 90);
                    p5.arc(tileSize, tileSize, tileSize, tileSize, 180, 270);
                    p5.pop();
                } else {
                    p5.push();
                    p5.arc(tileSize, 0, tileSize, tileSize, 90, 180);
                    p5.arc(0, tileSize, tileSize, tileSize, 270, 360);
                    p5.pop();
                }
                p5.pop();
            }
        }
    };
};

new p5((p) => BRAIN_DAMAGE(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);