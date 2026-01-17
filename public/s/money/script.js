/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const MONEY = (p5, el) => {
    let captured = false;
    let spacing = 3;
    let circleSize = 24;
    let currencies = ["$", "€", "£", "¥", "₹", "₿"];
    let currencyGraphics = [];

    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height);
        p5.angleMode(p5.DEGREES);
        p5.smooth();
        for (const currency of currencies) {
            let currencyGraphic = p5.createGraphics(64, 64);
            currencyGraphic.textAlign(p5.CENTER, p5.CENTER);
            currencyGraphic.textSize(32);
            currencyGraphic.noStroke();
            currencyGraphic.fill("#8A6F1D");
            currencyGraphic.circle(32, 32, 64);
            currencyGraphic.fill(212, 175, 55);
            currencyGraphic.circle(32, 32, 56);
            currencyGraphic.fill("#8A6F1D");
            currencyGraphic.text(currency, 32, 32);
            currencyGraphics.push(currencyGraphic);
        }
        p5.imageMode(p5.CENTER);
    };

    p5.draw = () => {
        p5.background(0);
        p5.translate(p5.width / 2, p5.height / 2);
        let idx = 0;
        for (let k = 10; k < p5.width / 4; k += 10) {
            if (idx >= currencyGraphics.length) {
                idx = 0;
            }
            let moneyGraphic = currencyGraphics[idx];
            idx++;

            for (let i = 0; i < 360; i += 72 / (k / 10)) {
                let r = spacing * k;
                let direction = (k / 10) % 2 === 0 ? -p5.frameCount : p5.frameCount;
                let speed = 10 / k;
                let x = r * p5.cos(i + direction * speed);
                let y = r * -p5.sin(i + direction * speed);
                let s = k / 18 + circleSize;
                p5.image(moneyGraphic, x, y, s, s);
            }
        }
        if (!captured && p5.frameCount > 100) {
            p5.saveCanvas('firstFrame', 'png'); // capture the canvas
            captured = true; // prevent further captures
            console.log('Captured first frame!');
        }
    };

};

new p5((p) => MONEY(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);