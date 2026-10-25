/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const GEM_WALKER = (p5, el) => {
  const PALETTE = ["#049DBF", "#03A6A6", "#048C3F", "#F2A516", "#D92525"];

  class BOX {
    constructor(i, j, size) {
      this.x = i * size;
      this.y = j * size;
      this.size = size;
      this.color = p5.random(PALETTE);
    }

    draw() {
      p5.push();
      p5.rectMode(p5.CENTER);
      p5.translate(this.x, this.y);
      p5.rotate(p5.QUARTER_PI * p5.sin(p5.map(this.x, 0, p5.width, 0, p5.PI)));
      p5.fill(this.color);
      p5.rect(
        0,
        0,
        this.size - this.size / 4,
        this.size - this.size / 4,
        p5.abs(
          (this.size / 16) * p5.sin(p5.map(this.x, 0, p5.width, 0, p5.PI)),
        ),
      );

      p5.pop();

      this.x -= 1;
      if (this.x <= -this.size / 2) {
        this.x += p5.width + this.size;
        this.color = p5.random(PALETTE);
      }
    }
  }
  const BOXES_ARRAY = [];

  p5.setup = () => {
    const { height, width } = el.getBoundingClientRect();
    const dim = width > height ? height : width;
    p5.createCanvas(dim, dim);
    let SIZE = p5.height / 16;
    let ROWS = p5.height / SIZE;
    let COLS = p5.height / SIZE;
    for (let i = 0; i <= COLS; i++) {
      for (let j = 0; j <= ROWS; j++) {
        BOXES_ARRAY.push(new BOX(i, j, SIZE, ROWS, COLS));
      }
    }
    p5.noStroke();
    p5.smooth();
  };

  p5.draw = () => {
    p5.background(0);
    for (let BOX of BOXES_ARRAY) {
      BOX.draw();
    }
  };
};

new p5(
  (p) => GEM_WALKER(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
