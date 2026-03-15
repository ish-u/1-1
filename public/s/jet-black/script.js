/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const JET_BLACK = (p5, el) => {
  let CIRCLE_SIZE_OSC;
  let ORBIT_OSC_SIZE;
  let TIME;
  const PHI = 1.1618;

  p5.setup = () => {
    const { height } = el.getBoundingClientRect();
    p5.createCanvas(height, height);
    CIRCLE_SIZE_OSC = height / 16;
    ORBIT_OSC_SIZE = height / 12;
    p5.noStroke();
  };

  p5.draw = () => {
    p5.background(255, 255, 255, 200);
    p5.translate(p5.width / 2, p5.height / 2);
    TIME = p5.frameCount / (50 * PHI);
    for (let i = 1; i <= 32; i++) {
      branch(p5.width);
      p5.rotate(i * (p5.PI / 16));
    }
  };

  function branch(h) {
    if (h > 1) {
      p5.push();
      const x = ORBIT_OSC_SIZE * p5.sin(TIME) + h;
      const y = ORBIT_OSC_SIZE * -p5.cos(TIME) + h;
      p5.fill(28, 40, 38, p5.map(h, 0, p5.height, 225, 255));
      p5.circle(x, y, -CIRCLE_SIZE_OSC * p5.sin(TIME) + h / PHI / 4);
      p5.pop();
      branch(h / PHI);
    }
  }
};

new p5(
  (p) => JET_BLACK(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
