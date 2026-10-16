/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const CELL_WAVE = (p5, el) => {
  const palette = ["#049DBF", "#03A6A6", "#048C3F", "#F2A516", "#D92525"];
  const CELLS = [];

  class Cell {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.width = this.size + p5.random(0, this.size / 4);
      this.height = this.size / 2;
      this.phase = p5.random(0, 360);
      this.colorOneIdx = p5.floor(p5.random(palette.length));
      this.colorTwoIdx = p5.floor(p5.random(palette.length));
      this.transitioning = false;
      this.transitionT = 1;
      this.transitionTime = p5.ceil(p5.random(120, 240));
    }

    draw() {
      let x = this.x;
      let y = this.y + this.height / 2;
      let maxOffset = (1 / p5.PI) * this.size;
      x = this.x + maxOffset * p5.sin(2 * p5.frameCount + this.phase);

      if (p5.frameCount % this.transitionTime == 0) {
        this.colorOneIdx = this.colorTwoIdx;
        this.colorTwoIdx = p5.floor(p5.random(palette.length));
        this.transitionT = 0;
        this.transitioning = true;
      }

      let circleColor = p5.lerpColor(
        p5.color(palette[this.colorOneIdx]),
        p5.color(palette[this.colorTwoIdx]),
        this.transitionT,
      );
      p5.fill(circleColor);
      p5.rect(x, y, this.width, this.height);

      if (this.transitioning) {
        this.transitionT += 1 / (this.transitionTime - 1);
        if (this.transitionT > 1) {
          this.transitionT = 1;
          this.transitioning = false;
        }
      }
    }
  }

  p5.setup = () => {
    const { height, width } = el.getBoundingClientRect();
    const dim = width > height ? height : width;
    p5.createCanvas(dim, dim);
    let SIZE = height / 32;
    let ROWS = height / SIZE;
    let COLS = height / SIZE;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        CELLS.push(new Cell(i * SIZE, j * SIZE, SIZE));
      }
    }
    p5.angleMode(p5.DEGREES);
    p5.stroke(0);
    p5.strokeWeight(2.71828);
  };

  p5.draw = () => {
    p5.background(0);
    for (const c of CELLS) {
      c.draw();
    }
  };
};

new p5(
  (p) => CELL_WAVE(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
