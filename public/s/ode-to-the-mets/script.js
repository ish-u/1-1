/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const ODE_TO_THE_METS = (p5, el) => {
  const PALETTE = ["#049DBF", "#03A6A6", "#048C3F", "#F2A516", "#D92525"];
  const BOXES_ARRAY = [];
  const BOX_MATRIX = [];

  class BOX {
    constructor(i, j, size) {
      this.i = i;
      this.j = j;
      this.x = i * size;
      this.y = j * size;
      this.size = size;
      this.color = p5.random(PALETTE);
      this.moving = false;
      this.diffDenominator = p5.random(1, 1.168);
      this.nextX = null;
      this.nextY = null;
      this.nextI = null;
      this.nextJ = null;
      this.diffX = 0;
      this.diffY = 0;
    }

    draw() {
      p5.push();
      p5.translate(this.x, this.y);
      p5.fill(this.color);
      p5.rect(
        0,
        0,
        this.size - this.size / 4,
        this.size - this.size / 4,
        p5.abs(this.size / 24),
      );
      p5.pop();

      if (!this.moving) {
        const nextPositions = [
          { i: this.i + 1, j: this.j, diffX: 1, diffY: 0 },
          { i: this.i - 1, j: this.j, diffX: -1, diffY: 0 },
          { i: this.i, j: this.j + 1, diffX: 0, diffY: 1 },
          { i: this.i, j: this.j - 1, diffX: 0, diffY: -1 },
        ];
        const validPositions = [];
        for (const pos of nextPositions) {
          if (
            pos.i >= 0 &&
            pos.j >= 0 &&
            pos.i < BOX_MATRIX.length &&
            pos.j < BOX_MATRIX[0].length &&
            BOX_MATRIX[pos.i][pos.j] === 0
          ) {
            validPositions.push(pos);
          }
        }
        if (validPositions.length) {
          const nextPos = p5.random(validPositions);
          this.moving = true;
          this.nextX = nextPos.i * this.size;
          this.nextY = nextPos.j * this.size;
          this.diffX = nextPos.diffX;
          this.diffY = nextPos.diffY;
          BOX_MATRIX[nextPos.i][nextPos.j] = -1;
          this.nextI = nextPos.i;
          this.nextJ = nextPos.j;
        }
      } else {
        if (
          p5.floor(this.x) !== p5.floor(this.nextX) ||
          p5.floor(this.y) !== p5.floor(this.nextY)
        ) {
          this.x += this.diffX / this.diffDenominator;
          this.y += this.diffY / this.diffDenominator;
        } else {
          this.moving = false;
          this.nextX = null;
          this.nextY = null;
          this.diffX = 0;
          this.diffY = 0;
          BOX_MATRIX[this.i][this.j] = 0;
          this.i = this.nextI;
          this.j = this.nextJ;
          BOX_MATRIX[this.i][this.j] = 1;
          this.x = this.i * this.size;
          this.y = this.j * this.size;
        }
      }
    }
  }

  p5.setup = () => {
    const { height, width } = el.getBoundingClientRect();
    const dim = width > height ? height : width;
    p5.createCanvas(dim, dim);
    let SIZE = p5.height / 16;
    let ROWS = p5.height / SIZE;
    let COLS = p5.height / SIZE;
    for (let i = 0; i <= COLS; i++) {
      const ROW = [];
      for (let j = 0; j <= ROWS; j++) {
        if (p5.random(0, 1) > 0.25) {
          BOXES_ARRAY.push(new BOX(i, j, SIZE));
          ROW.push(1);
        } else {
          ROW.push(0);
        }
      }
      BOX_MATRIX.push(ROW);
    }
    p5.noStroke();
    p5.smooth();
    p5.rectMode(p5.CENTER);
  };

  p5.draw = () => {
    p5.background(0);
    for (let B of BOXES_ARRAY) {
      B.draw();
    }
  };
};

new p5(
  (p) => ODE_TO_THE_METS(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
