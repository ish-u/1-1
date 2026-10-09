/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const BOXES = (p5, el) => {
  const MAX_STEPS = 7;
  const palette = ["#049DBF", "#03A6A6", "#048C3F", "#F2A516", "#D92525"];
  const BOXES = [];

  class Box {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.phase = p5.random(0, 360);
      this.color = p5.random(palette);
    }

    draw() {
      p5.rectMode(p5.CENTER);
      let size = this.size;
      let x = this.x;
      let y = this.y;
      p5.push();
      p5.stroke(this.color);
      p5.square(x, y, size);
      for (let i = 1; i <= MAX_STEPS; i++) {
        size = this.size - this.size * (i / MAX_STEPS);
        let maxOffset = ((i / 2.5) * size) / 7;
        x = this.x + maxOffset * p5.sin(2 * p5.frameCount + this.phase);
        y = this.y + maxOffset * -p5.cos(2 * p5.frameCount + this.phase);
        p5.square(x, y, size);

        if (i === MAX_STEPS - 1) {
          p5.fill(this.color);
          p5.circle(x, y, size / 2);
        }
      }
      p5.pop();
    }
  }

  p5.setup = () => {
    const { height, width } = el.getBoundingClientRect();
    const dim = width > height ? height : width;
    p5.createCanvas(dim, dim);
    let SIZE = p5.height / 7;
    let ROWS = p5.height / SIZE;
    let COLS = p5.height / SIZE;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        BOXES.push(new Box(i * SIZE + SIZE / 2, j * SIZE + SIZE / 2, SIZE));
      }
    }
    p5.angleMode(p5.DEGREES);
    p5.noFill();
  };

  p5.draw = () => {
    p5.background(0);
    for (const b of BOXES) {
      b.draw();
    }
  };
};

new p5(
  (p) => BOXES(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
