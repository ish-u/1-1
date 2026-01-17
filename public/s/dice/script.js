/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const DICE = (p5, el) => {
    let size;

    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height, p5.WEBGL);
        size = height / 2.5;
        p5.noStroke();
    }

    p5.draw = () => {
        p5.background(0);
        p5.orbitControl();

        p5.directionalLight(255, 255, 255, -0.5, 0, 0);
        p5.directionalLight(255, 255, 255, 0, -0.5, 0);
        p5.directionalLight(255, 255, 255, 0, 0, -0.5);

        p5.ambientLight(100);

        p5.rotateX(p5.frameCount / 300);
        p5.rotateY(p5.frameCount / 200);
        p5.rotateZ(p5.frameCount / 50);

        p5.rectMode(p5.CENTER);



        p5.push();
        p5.translate(0, 0, size / 2);
        p5.rect(0, 0, size, size, 20);
        p5.fill("red");
        p5.translate(0, 0, 0.5);
        sharpCircle(0, 0, size / 2);
        p5.pop();

        p5.push();
        p5.translate(0, 0, -size / 2);
        p5.rotateX(p5.PI);
        p5.rect(0, 0, size, size, 20);
        p5.fill("blue");
        p5.translate(0, 0, 0.5);
        let sixFaceSize = size / 4;
        sharpCircle(size / 6, 0, sixFaceSize);
        sharpCircle(-size / 6, 0, sixFaceSize);
        sharpCircle(size / 6, size / 3, sixFaceSize);
        sharpCircle(-size / 6, size / 3, sixFaceSize);
        sharpCircle(size / 6, -size / 3, sixFaceSize);
        sharpCircle(-size / 6, -size / 3, sixFaceSize);
        p5.pop();

        p5.push();
        p5.translate(0, -size / 2, 0);
        p5.rotateX(p5.HALF_PI);
        p5.rect(0, 0, size, size, 20);
        p5.fill("blue");
        p5.translate(0, 0, 0.5);
        let fiveFaceSize = size / 4;
        sharpCircle(0, 0, fiveFaceSize);
        sharpCircle(size / 4, size / 4, fiveFaceSize);
        sharpCircle(-size / 4, size / 4, fiveFaceSize);
        sharpCircle(size / 4, -size / 4, fiveFaceSize);
        sharpCircle(-size / 4, -size / 4, fiveFaceSize);
        p5.pop();

        p5.push();
        p5.translate(0, size / 2, 0);
        p5.rotateX(-p5.HALF_PI);
        p5.rect(0, 0, size, size, 20);
        p5.translate(0, 0, 0.5);
        let twoFaceSize = size / 4;
        p5.fill("blue");
        sharpCircle(0, size / 4, twoFaceSize);
        sharpCircle(0, -size / 4, twoFaceSize);
        p5.pop();

        p5.push();
        p5.translate(size / 2, 0, 0);
        p5.rotateY(p5.HALF_PI);
        p5.rect(0, 0, size, size, 20);
        p5.translate(0, 0, 0.5);
        let threeFaceSize = size / 4;
        p5.fill("blue");
        sharpCircle(-size / 4, size / 4, threeFaceSize);
        sharpCircle(0, 0, threeFaceSize);
        sharpCircle(size / 4, -size / 4, threeFaceSize);
        p5.pop();

        p5.push();
        p5.translate(-size / 2, 0, 0);
        p5.rotateY(-p5.HALF_PI);
        p5.rect(0, 0, size, size, 20);
        p5.fill("red");
        p5.translate(0, 0, 0.5);
        let fourFaceSize = size / 3.75;
        sharpCircle(size / 4, size / 4, fourFaceSize);
        sharpCircle(-size / 4, size / 4, fourFaceSize);
        sharpCircle(size / 4, -size / 4, fourFaceSize);
        sharpCircle(-size / 4, -size / 4, fourFaceSize);
        p5.pop();
    }

    function sharpCircle(x, y, r, detail = 80) {
        p5.push();
        p5.translate(x, y, 0);
        r = r / 2;
        p5.beginShape();
        for (let a = 0; a < p5.TWO_PI; a += p5.TWO_PI / detail) {
            p5.vertex(p5.cos(a) * r, p5.sin(a) * r);
        }
        p5.endShape(p5.CLOSE);
        p5.pop();
    }
};

new p5((p) => DICE(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);