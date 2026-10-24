/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const ANOTHER_ORBIT = (p5, el) => {
  const PALETTE = ["#049DBF", "#03A6A6", "#048C3F", "#F2A516", "#D92525"];

  class Box {
    constructor(i, j, size) {
      this.i = i;
      this.j = j;
      this.x = i * size + size / 2;
      this.y = j * size + size / 2;
      this.size = size;
      this.phase = p5.random(0, 360);
      this.direction = p5.random() < 0.5 ? -1 : 1;
      this.color = p5.random(PALETTE);
    }

    draw() {
      p5.push();

      p5.stroke(this.color);
      p5.translate(this.x, this.y);
      p5.scale(0.9 + 0.1 * p5.sin(p5.frameCount + this.phase * 2));
      p5.square(0, 0, this.size - this.size / 8, p5.PI);

      p5.noStroke();
      p5.fill(this.color);
      p5.circle(0, 0, this.size / 6);
      for (let p = 0; p < 7; p++) {
        p5.circle(
          (p5.sin(this.direction * p5.frameCount + this.phase * p) *
            this.size) /
            p5.PI,
          -(
            (p5.cos(this.direction * p5.frameCount + this.phase * p) *
              this.size) /
            p5.PI
          ),
          this.size / 12,
        );
      }

      p5.pop();

      this.y += 1;
      if (this.y - this.size / 2 >= p5.height) {
        this.y -= p5.height + this.size;
        this.color = p5.random(PALETTE);
        this.phase = p5.random(0, 720);
        this.direction = p5.random() < 0.5 ? -1 : 1;
      }
    }
  }

  const BOXES = [];
  p5.setup = () => {
    const { height, width } = el.getBoundingClientRect();
    const dim = width > height ? height : width;
    p5.createCanvas(dim, dim);
    const SIZE = p5.height / 7;
    const ROWS = p5.height / SIZE;
    const COLS = p5.height / SIZE;
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j <= ROWS; j++) {
        BOXES.push(new Box(i, j, SIZE));
      }
    }
    p5.angleMode(p5.DEGREES);
    p5.rectMode(p5.CENTER);
    p5.strokeWeight(2.71828);
    p5.noFill();
    p5.smooth();
  };

  p5.draw = () => {
    p5.background(0);
    for (const b of BOXES) {
      b.draw();
    }
  };
};

new p5(
  (p) => ANOTHER_ORBIT(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
