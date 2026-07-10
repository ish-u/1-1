/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const CELLS = (p5, el) => {
  let ROWS = 0;
  let COLS = 0;
  let SIZE = 36;
  let PADDING = SIZE / 3;
  let SQUARES = [];

  class Square {
    constructor(x, y, size, padding, offset) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.padding = padding;
      this.offset = offset;
      this.angle = 0;
      this.col = 128 + (p5.sin(this.offset) + p5.cos(this.offset)) * 127;
    }

    draw() {
      p5.push();
      p5.translate(this.x + this.size / 2, this.y + this.size / 2);

      p5.rectMode(p5.CENTER);
      p5.rotate(
        this.angle * (Math.floor(this.offset) % 2 === 0 ? 2 : -1) + this.offset,
      );
      p5.rect(
        0,
        0,
        this.size - this.padding + (p5.sin(p5.frameCount) * SIZE) / 2,
        this.size - this.padding + (p5.cos(p5.frameCount) * SIZE) / 2,
        SIZE / 4,
      );
      this.angle += 0.75;

      p5.stroke(this.col / 4);
      p5.fill(this.col);
      p5.circle(0, 0, SIZE / 4.5);

      p5.pop();
    }
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowHeight, p5.windowHeight);
    p5.angleMode(p5.DEGREES);
    ROWS = p5.height / SIZE;
    COLS = p5.height / SIZE;

    let idx = 0;
    for (let i = -ROWS / 4; i < ROWS + ROWS / 4; i++) {
      for (let j = -COLS / 4; j < COLS + COLS / 4; j++) {
        SQUARES.push(new Square(SIZE * i, SIZE * j, SIZE, PADDING, idx));
        idx += i + j + 1 + p5.sin(i + j + 1 + idx);
      }
    }

    p5.strokeWeight(2);
    p5.smooth();
  };

  p5.draw = () => {
    p5.background(255);
    p5.push();

    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate(p5.frameCount / 24);
    p5.translate(-p5.width / 2, -p5.height / 2);
    for (const sqr of SQUARES) {
      sqr.draw();
    }
    p5.pop();
  };
};

new p5(
  (p) => CELLS(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
