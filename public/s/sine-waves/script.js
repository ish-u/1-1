/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const SINE_WAVES = (p5, el) => {
  const LINES_ARRAY = [];

  class LINE {
    constructor(x, y, h) {
      this.x = x;
      this.y = y;
      this.h = h;
    }

    draw() {
      p5.push();
      p5.translate(this.x, this.y);
      const a = p5.map(this.x, 0, p5.width, 0, 720);
      const p = p5.map(this.y, 0, p5.height, 0, 540);
      p5.rotate(2 * this.h * p5.sin(a + p + p5.frameCount));
      const x1 = this.h / 2;
      const y1 = 0;
      const x2 = this.h / 2;
      const y2 = this.h * (3 / 4);
      p5.line(x1, y1, x2, y2);
      p5.pop();
    }
  }

  p5.setup = () => {
    const { height, width } = el.getBoundingClientRect();
    const dim = width > height ? height : width;
    p5.createCanvas(dim, dim);
    const SIZE = p5.height / 32;
    const ROWS = p5.height / SIZE;
    const COLS = (2 * p5.height) / SIZE;
    for (let i = 0; i <= COLS; i++) {
      for (let j = 0; j <= ROWS; j++) {
        LINES_ARRAY.push(new LINE((i * SIZE) / 2, j * SIZE, SIZE));
      }
    }
    p5.stroke(0);
    p5.smooth();
    p5.frameRate(30);
    p5.strokeWeight(SIZE / 8);
    p5.angleMode(p5.DEGREES);
    p5.rectMode(p5.CENTER);
  };

  p5.draw = () => {
    p5.background(255);
    for (const L of LINES_ARRAY) {
      L.draw();
    }
  };
};

new p5(
  (p) => SINE_WAVES(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
