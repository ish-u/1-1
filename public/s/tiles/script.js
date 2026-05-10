/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const TILES = (p5, el) => {
  let cols = 10;
  let rows = 10;
  let spacing = 120;

  p5.setup = () => {
    const { height } = el.getBoundingClientRect();
    p5.createCanvas(height, height, p5.WEBGL);
    p5.camera(p5.height / 2, -p5.height / 2, p5.height / 2);
    p5.ortho();

    cols = 20;
    rows = 20;
  };

  p5.draw = () => {
    p5.background(0);

    p5.scale(1.2);
    p5.ambientLight(10);
    p5.ambientMaterial(255, 213, 255);
    p5.specularMaterial(229, 107, 111);
    p5.pointLight(37, 61, 91, 0, -p5.height / 2, 0);
    p5.pointLight(34, 124, 157, p5.height / 4, p5.height / 4, p5.height / 4);

    let totalZ = rows * spacing;
    let offset = p5.frameCount;

    for (let i = 0; i < cols; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        let x = (i - cols / 2) * spacing;
        let z = (j - rows / 2) * spacing + offset;
        z = ((z + totalZ / 2) % totalZ) - totalZ / 2;

        p5.push();
        p5.translate(x, 0, z);
        let h =
          p5.noise(i * 0.3, j * 0.3, p5.frameCount / 100) * spacing +
          spacing / 8;

        p5.box(spacing - 20, h, spacing - 20);
        p5.pop();
      }
    }
  };
};

new p5(
  (p) => TILES(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
