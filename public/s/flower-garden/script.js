/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const FLOWER_GARDEN = (p5, el) => {
    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);

        for (let i = 0; i < 25; i++) {
            flowers.push({
                X: p5.random(10, height),
                Y: p5.random(10, height),
                size: p5.random(25, 100),
                flowerColor: [p5.random(0, 255), p5.random(0, 255), p5.random(0, 255)]
            })
        }
    }


    let flowers = []

    p5.draw = () => {
        p5.background(200)

        flowers = flowers.filter(flower => flower.size > 0)

        for (let flower of flowers) {
            drawFlower(flower.X, flower.Y, flower.size, flower.flowerColor)
            flower.size -= 1;

        }

        if (p5.mouseIsPressed === true) {
            p5.frameRate(10);
            flowers.push({
                X: p5.mouseX,
                Y: p5.mouseY,
                size: 100,
                flowerColor: [p5.random(0, 255), p5.random(0, 255), p5.random(0, 255)]
            })

        } else {
            p5.frameRate(24)
        }
    }

    function drawFlower(X, Y, size, flowerColor) {
        p5.noStroke()
        p5.fill(...flowerColor)
        p5.ellipse(X, Y, size / 2, size);
        p5.ellipse(X, Y, size, size / 2);
        p5.fill(255, 204, 0);
        p5.circle(X, Y, size / 2)

    }
};

new p5((p) => FLOWER_GARDEN(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);