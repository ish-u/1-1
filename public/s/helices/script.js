/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const HELICES = (p5, el) => {
  let a;
  let b;

  class Helix {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    draw() {
      p5.push();
      p5.translate(this.x, 0, this.y);
      p5.strokeWeight(2);
      p5.rotateX(p5.PI / 2);
      p5.noFill();
      p5.beginShape();
      const limit = p5.floor(p5.height / 2);
      for (let i = 0; i < limit; i++) {
        let t = i * 0.075;
        let x = a * p5.cos(t + p5.frameCount / 24);
        let y = a * p5.sin(t + p5.frameCount / 24);
        let z = b * t;
        p5.vertex(x, y, z);

        if (i === 0 || i === limit - 1) {
          p5.push();
          p5.noStroke();
          p5.fill(0);
          p5.translate(x, y, z);
          p5.sphere(a / 12);
          p5.pop();
        }
      }
      p5.endShape();
      p5.pop();
    }
  }

  const HELIXS = [];
  let ROWS = 0;
  let COLS = 0;
  let SIZE = a;
  let PADDING = SIZE / 3;

  p5.setup = () => {
    const { height } = el.getBoundingClientRect();
    p5.createCanvas(height, height, p5.WEBGL);
    p5.camera(height / 2, -height / 2, height / 2);
    p5.ortho();

    a = p5.height / 16;
    b = a / 16;

    PADDING = a * 2.25;
    SIZE = a * 1.75 + PADDING;

    ROWS = p5.floor(height / SIZE);
    COLS = p5.floor(height / SIZE);

    // center the grid: shift so it spans symmetrically around 0
    const startX = -((COLS - 1) * SIZE) / 2;
    const startY = -((ROWS - 1) * SIZE) / 2;

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        HELIXS.push(new Helix(startX + i * SIZE, startY + j * SIZE));
      }
    }
  };

  p5.draw = () => {
    p5.background(255);
    p5.scale(0.75);

    for (const helix of HELIXS) {
      helix.draw();
    }
  };
};

new p5(
  (p) => HELICES(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
