/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const CYAN_TEAL = (p5, el) => {
  p5.setup = () => {
    const { height } = el.getBoundingClientRect();
    p5.createCanvas(height, height);
    p5.angleMode(p5.DEGREES);
  };

  p5.draw = () => {
    p5.background(0);

    p5.translate(p5.height / 2, p5.width / 2);

    p5.scale(
      1 + 0.5 * p5.sin(p5.frameCount * 0.5) * p5.cos(p5.frameCount * 0.5),
    );

    for (let i = 1; i <= 75; i++) {
      let x = 10 * i * p5.cos(p5.frameCount);
      let y = 10 * i * -p5.sin(p5.frameCount);

      p5.rotate(
        5 * p5.sin(p5.frameCount * 0.25) * p5.cos(p5.frameCount * 0.25),
      );

      p5.push();

      p5.rectMode(p5.CENTER);

      p5.stroke(0, 255 - i * 2, 180 + i, 255 - i * 6);
      p5.fill(0, 200 - i, 150 + i, 30 - i * 0.5);

      p5.rect(x, y, (10 + i) * i);

      p5.pop();
    }
  };
};

new p5(
  (p) => CYAN_TEAL(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
