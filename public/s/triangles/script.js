/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const TRIANGLES = (p5, el) => {
  const PALETTE = ["#049DBF", "#03A6A6", "#048C3F", "#F2A516", "#D92525"];

  class POINT {
    constructor(x, y, maxOffset) {
      this.originalX = x;
      this.originalY = y;
      this.x = x;
      this.y = y;
      this.offset = p5.random(maxOffset / 2, maxOffset);
      this.axis = p5.random(0, 1) <= 0.5 ? "X" : "Y";
    }

    update() {
      p5.push();
      switch (this.axis) {
        case "X":
          this.x =
            this.originalX + this.offset * p5.sin(p5.frameCount - this.offset);
          break;
        case "Y":
          this.y =
            this.originalY - this.offset * p5.sin(p5.frameCount + this.offset);
          break;
      }
      p5.pop();
    }
  }

  class TRIANGLE {
    constructor(A, B, C) {
      this.A = A;
      this.B = B;
      this.C = C;
      this.color = p5.color(p5.random(PALETTE));
      this.color.setAlpha(p5.random(100, 255));

      this.colorOneIdx = p5.floor(p5.random(PALETTE.length));
      do {
        this.colorTwoIdx = p5.floor(p5.random(PALETTE.length));
      } while (this.colorTwoIdx === this.colorOneIdx && PALETTE.length > 1);
      this.transitioning = false;
      this.transitionT = 1;
      this.transitionTime = p5.ceil(p5.random(120, 240));
      this.alpha = p5.random(100, 255);
    }

    draw() {
      if (p5.frameCount % this.transitionTime == 0) {
        this.colorOneIdx = this.colorTwoIdx;
        do {
          this.colorTwoIdx = p5.floor(p5.random(PALETTE.length));
        } while (this.colorTwoIdx === this.colorOneIdx && PALETTE.length > 1);
        this.transitionT = 0;
        this.transitioning = true;
      }

      let colorOne = p5.color(PALETTE[this.colorOneIdx]);
      colorOne.setAlpha(this.alpha);
      let colorTwo = p5.color(PALETTE[this.colorTwoIdx]);
      colorTwo.setAlpha(this.alpha);
      let triangleColor = p5.lerpColor(colorOne, colorTwo, this.transitionT);
      p5.fill(triangleColor);

      p5.triangle(this.A.x, this.A.y, this.B.x, this.B.y, this.C.x, this.C.y);

      if (this.transitioning) {
        this.transitionT += 1 / (this.transitionTime - 1);
        if (this.transitionT > 1) {
          this.transitionT = 1;
          this.transitioning = false;
        }
      }
    }
  }

  const POINTS_MATRIX = [];
  const TRIANGLE_ARRAY = [];

  p5.setup = () => {
    const { height, width } = el.getBoundingClientRect();
    const dim = width > height ? height : width;
    p5.createCanvas(dim, dim);
    let SIZE = p5.height / 24;
    let ROWS = p5.height / SIZE;
    let COLS = p5.height / SIZE;
    for (let i = 0; i <= COLS; i++) {
      let ROW = [];
      for (let j = 0; j <= ROWS; j++) {
        let offset = j % 2 === 0 ? SIZE / 2 : 0;
        const p = new POINT(i * SIZE - offset, j * SIZE, SIZE / 2);
        ROW.push(p);
      }
      POINTS_MATRIX.push(ROW);
    }
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        if (j % 2 === 0) {
          let A = POINTS_MATRIX[i][j];
          let B = POINTS_MATRIX[i + 1][j];
          let C = POINTS_MATRIX[i][j + 1];
          let D = POINTS_MATRIX[i + 1][j + 1];
          TRIANGLE_ARRAY.push(new TRIANGLE(A, B, C));
          TRIANGLE_ARRAY.push(new TRIANGLE(B, C, D));
        } else {
          let A = POINTS_MATRIX[i][j];
          let B = POINTS_MATRIX[i + 1][j];
          let C = POINTS_MATRIX[i][j + 1];
          let D = POINTS_MATRIX[i + 1][j + 1];
          TRIANGLE_ARRAY.push(new TRIANGLE(A, C, D));
          TRIANGLE_ARRAY.push(new TRIANGLE(A, B, D));
        }
      }
    }
    p5.smooth();
    p5.noFill();
    p5.angleMode(p5.DEGREES);
    p5.frameRate(30);
  };

  p5.draw = () => {
    p5.background(0);
    p5.translate(p5.height / 2, p5.width / 2);
    p5.scale(0.9);
    p5.translate(-p5.height / 2, -p5.width / 2);

    for (let row of POINTS_MATRIX) {
      for (let p of row) {
        p.update();
      }
    }

    for (let T of TRIANGLE_ARRAY) {
      T.draw();
    }
  };
};

new p5(
  (p) => TRIANGLES(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
