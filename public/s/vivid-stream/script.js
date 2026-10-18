/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const VIVID_STREAM = (p5, el) => {
  const PALETTE = ["#049DBF", "#03A6A6", "#048C3F", "#F2A516", "#D92525"];

  class Line {
    constructor(x, y, size) {
      this.x = x * size;
      this.y = y * size;
      this.size = size;
      this.leftToRight = p5.random(0, 1) >= 0.5;
      this.color = p5.random(PALETTE);
    }

    draw() {
      p5.stroke(this.color);
      p5.fill(this.color);

      if (this.leftToRight) {
        p5.line(this.x, this.y, this.x + this.size, this.y + this.size);
        p5.circle(this.x, this.y, this.size / 8);
        p5.circle(this.x + this.size, this.y + this.size, this.size / 8);
      } else {
        p5.line(this.x + this.size, this.y, this.x, this.y + this.size);
        p5.circle(this.x + this.size, this.y, this.size / 8);
        p5.circle(this.x, this.y + this.size, this.size / 8);
      }

      this.x -= 1;
      if (this.x <= -this.size) {
        this.x += p5.width + this.size;
        this.leftToRight = p5.random(0, 1) >= 0.5;
        this.color = p5.random(PALETTE);
      }
    }
  }

  const LINES_ARRAY = [];

  p5.setup = () => {
    const { height, width } = el.getBoundingClientRect();
    const dim = width > height ? height : width;
    p5.createCanvas(dim, dim);
    let SIZE = p5.height / 16;
    let ROWS = p5.height / SIZE;
    let COLS = p5.height / SIZE;
    for (let i = 0; i <= COLS; i++) {
      const LINE_ROW = [];
      for (let j = 0; j <= ROWS; j++) {
        LINES_ARRAY.push(new Line(i, j, SIZE));
      }
    }
    p5.strokeWeight(p5.PI);
    p5.smooth();
  };

  p5.draw = () => {
    p5.background(0);
    for (let LINE of LINES_ARRAY) {
      LINE.draw();
    }
  };
};

new p5(
  (p) => VIVID_STREAM(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
