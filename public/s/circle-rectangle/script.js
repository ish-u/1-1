/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const CIRCLE_RECTANGLE = (p5, el) => {
  let offset;
  let rows;
  let cols;
  let size = 0;
  let padding = 0;

  p5.setup = () => {
    const { height } = el.getBoundingClientRect();
    p5.createCanvas(height, height);
    offset = 0;
    size = p5.height / 24;
    padding = size / 6;
    rows = Math.floor(p5.height / size);
    cols = Math.floor(p5.height / size);
    p5.noStroke();
  };

  p5.draw = () => {
    p5.background(0);
    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= cols; j++) {
        let offset = (p5.frameCount % size) - size / 2;

        let x = size * i;
        let y = size * j + offset;

        p5.push();
        p5.translate(x, y);

        let t = p5.map(y, 0, p5.height, 0, 1);
        let borderRadius = (p5.sq(p5.sin(t * p5.PI)) * size) / 2;

        p5.fill(255, 255, 255, (borderRadius / 12) * 55 + 225);

        p5.rectMode(p5.CENTER);
        p5.rect(
          0,
          0,
          size - padding - borderRadius / 12,
          size - padding - borderRadius / 12,
          borderRadius,
        );

        p5.pop();
      }
    }
  };
};

new p5(
  (p) => CIRCLE_RECTANGLE(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
