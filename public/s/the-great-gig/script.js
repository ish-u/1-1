/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const THE_GREAT_GIG = (p5, el) => {
    let t = 0;

    function drawSpiral(phi) {
        p5.rotate(p5.frameCount);

        p5.beginShape();
        for (let i = 0; i < 360 * 4; i++) {
            let a = 1.8 * 16.18;
            let radius = a * p5.pow(phi, i / 90);
            let x = radius * p5.cos(i);
            let y = radius * -p5.sin(i);
            p5.vertex(x, y);
            if (i === 0) {
                p5.push();
                p5.fill(255);
                p5.circle(x, y, 16.8 / 3);
                p5.pop();
            }
        }
        p5.endShape();
        p5.fill(255);
        p5.circle(0, 0, 16.18);
    }

    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
        p5.angleMode(p5.DEGREES);
    };

    p5.draw = () => {
        p5.background(0);
        p5.stroke(255);
        p5.strokeWeight(2.5);
        p5.noFill();

        p5.translate(p5.width / 2, p5.height / 2);

        for (let r = 0; r < 10; r++) {
            p5.push();
            p5.scale(1 + t * 0.2);
            p5.rotate(r * 36);
            drawSpiral(1 + p5.sqrt(5) / 2);
            p5.pop();
        }

        t += 0.0001;
    };

};

new p5((p) => THE_GREAT_GIG(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);