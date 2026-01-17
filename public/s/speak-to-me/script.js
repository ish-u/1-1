/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const ECLIPSE = (p5, el) => {
    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
    };

    p5.draw = () => {
        p5.background(0);

        p5.translate(p5.width / 2, p5.height / 1.5);

        let x1 = -p5.width / 4;
        let y1 = 0;
        let x2 = p5.width / 4;
        let y2 = 0;
        let x3 = 0;
        let y3 = -p5.height / 2.25;

        let A = p5.createVector(x2, y2);
        let B = p5.createVector(x3, y3);
        let mid = A.copy().add(B.copy()).mult(0.5);
        let dir = B.copy().sub(A.copy()).normalize();
        let innerTriangleTop = mid.copy().add(dir.copy().mult(mid.mag() / 3));
        let innerTriangleBottom = mid.copy().add(dir.copy().mult(-mid.mag() / 6));

        // RIGHT RAYS
        let rightRaysColors = [
            [128, 0, 128], // V
            [2, 197, 242], // B
            [103, 206, 0], // G
            [255, 255, 0], // Y
            [255, 128, 0], // O
            [255, 0, 0], // R
        ];
        rightRaysColors.reverse();
        let rayWidth =
            innerTriangleTop.copy().sub(innerTriangleBottom.copy()).mag() /
            rightRaysColors.length;
        for (let i = 0; i < rightRaysColors.length; i++) {
            let rayColor = rightRaysColors[i];
            p5.push();
            p5.noStroke();
            p5.fill(rayColor[0], rayColor[1], rayColor[2]);
            p5.translate(innerTriangleTop.copy().add(dir.copy().mult(-rayWidth * i)));
            p5.rotate(-p5.PI / 2.25);
            p5.rect(-rayWidth, 0, rayWidth / 1.2, p5.height);
            p5.pop();
        }

        // MAIN TRIANGLE
        p5.push();
        p5.noStroke();
        p5.triangle(x1, y1, x2, y2, x3, y3);
        p5.fill(0);
        p5.drawingContext.filter = "blur(15px)";
        p5.triangle(x1 + 10, y1 - 5, x2 - 10, y2 - 5, x3, y3 + 10);
        p5.pop();

        // INNER TRIANGLE
        p5.push();
        let gradient = p5.drawingContext.createLinearGradient(
            (x1 + x3) / 2,
            (y1 + y3) / 2,
            innerTriangleTop.x,
            innerTriangleTop.y,

            innerTriangleBottom.x,
            innerTriangleBottom.y
        );
        gradient.addColorStop(0.25, "rgb(254 255 255 / 80%)");
        gradient.addColorStop(0.5, "rgb(100 130 140 / 50%)");
        gradient.addColorStop(1, "rgb(0 0 0 / 25%)");
        p5.drawingContext.fillStyle = gradient;
        p5.noStroke();
        p5.triangle(
            (x1 + x3) / 2,
            (y1 + y3) / 2,
            innerTriangleTop.x,
            innerTriangleTop.y,
            innerTriangleBottom.x,
            innerTriangleBottom.y
        );
        p5.pop();

        // LEFT RAYS
        p5.push();
        p5.noStroke();
        p5.fill(255);
        p5.translate((x1 + x3) / 2, (y1 + y3) / 2);
        p5.rotate(p5.PI / 2.75);
        p5.rect(0.5, -5, 2.5, p5.height);
        p5.pop();

        // Overlay
        p5.push();
        p5.noFill();
        p5.stroke(100, 130, 140);
        p5.strokeWeight(p5.height / 100);
        p5.drawingContext.filter = "blur(12.5px)";
        p5.triangle(x1 + 20, y1 - 10, x2 - 20, y2 - 10, x3, y3 + 20);
        p5.pop();

    };

    p5.windowResized = () => {
        const { height } = el.getBoundingClientRect();
        p5.resizeCanvas(height, height);
    };
};

new p5((p) => ECLIPSE(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);