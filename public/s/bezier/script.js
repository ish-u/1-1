/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const BEZIER = (p5, el) => {
  const palette = ["#049DBF", "#03A6A6", "#048C3F", "#F2A516", "#D92525"];
  const curveFillColors = {};
  p5.setup = () => {
    const { height } = el.getBoundingClientRect();
    p5.createCanvas(height, height);
    p5.smooth();
    let idx = 0;
    for (let i = 0; i < p5.width; i += 25) {
      curveFillColors[i] = palette[idx];
      idx = (idx + 1) % palette.length;
    }
    p5.blendMode(p5.BLEND);
  };

  p5.draw = () => {
    p5.background(0);

    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate(p5.frameCount * 0.0015);
    p5.scale(1.4);
    p5.noFill();
    p5.strokeWeight(2.71828);

    for (let i = 0; i < p5.width; i += 25) {
      let x1 = i - p5.width / 2;
      let y1 = -p5.height / 2;

      let x2 = p5.width / 4;
      let y2 =
        p5.height / 4 - i + (p5.sin(p5.frameCount * 0.01) * p5.height) / 4;

      let x3 =
        p5.width / 4 - i - (p5.cos(p5.frameCount * 0.01) * p5.height) / 4;
      let y3 = p5.height / 4;

      let x4 = i - p5.width / 2;
      let y4 = p5.height / 2;

      let c = p5.color(curveFillColors[i]);
      p5.stroke(c);
      p5.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
    }
  };
};

new p5(
  (p) => BEZIER(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
