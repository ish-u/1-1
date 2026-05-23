/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const HORIZON = (p5, el) => {
  let rows = 0;
  let cols = 0;
  let size = 50;
  let stars = [];
  let scene;

  p5.setup = () => {
    const { height } = el.getBoundingClientRect();
    p5.createCanvas(height, height);
    size = (p5.height / p5.width) * 50;
    rows = p5.height / size;
    cols = p5.height / size;
    scene = p5.createGraphics(p5.height, p5.height, p5.WEBGL);
    scene.perspective(p5.PI / 2, scene.width / scene.height, 0.2, 5000);
    scene.camera(0, -100, scene.height, 0, 0, -2000, 0, 1, 0);

    for (let i = 0; i < 1000; i++) {
      stars.push({
        x: p5.random(-p5.height, p5.height),
        y: p5.random(-p5.height, p5.height),
        size: p5.random(1, 10),
      });
    }
  };

  p5.draw = () => {
    p5.background(255);

    p5.beginClip();
    p5.circle(p5.height / 2, p5.height / 2, p5.height / 1.25);
    p5.endClip();

    grid();
    p5.image(scene, 0, 0);
  };

  function grid() {
    scene.background(0);

    for (let star of stars) {
      scene.push();
      scene.noStroke();
      scene.resetMatrix();
      scene.noLights();
      scene.translate(star.x, star.y - p5.height - 50, -p5.height / 3);
      scene.circle(0, 0, star.size);
      scene.pop();
    }

    let offset = p5.frameCount % size;

    scene.push();
    scene.translate(-scene.height / 2, -scene.height / 2);
    scene.translate(0, scene.height / 2, 0);
    scene.rotateX(p5.PI / 2);
    for (let i = -rows; i < 2 * rows; i++) {
      for (let j = -cols; j < cols; j++) {
        let x = i * size;
        let y = j * size;
        scene.push();
        scene.noStroke();
        scene.translate(x, y + offset, 0);
        scene.plane(size - size / 12);
        scene.pop();
      }
    }
    scene.pop();
  }
};

new p5(
  (p) => HORIZON(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
