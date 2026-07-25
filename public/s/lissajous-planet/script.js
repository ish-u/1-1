/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const LISSAJOUS_PLANET = (p5, el) => {
  let a;
  let b;
  let c;
  let d;
  let cam;

  p5.setup = () => {
    const { height } = el.getBoundingClientRect();
    p5.createCanvas(height, height, p5.WEBGL);
    a = 1.0;
    b = 2.0;
    c = 1.0;
    d = p5.PI / 2;

    cam = p5.createCamera();
    cam.setPosition(p5.height / 2, -p5.height / 2, p5.height / 2);
    cam.lookAt(0, 0, 0);

    p5.ortho();
    p5.noStroke();
  };

  p5.draw = () => {
    p5.background(0);

    let angle = p5.frameCount * 0.01;
    let radius = p5.height;

    let camX = p5.cos(angle) * radius;
    let camZ = p5.sin(angle) * radius;
    let camY = -p5.height / 2;

    cam.setPosition(camX, camY, camZ);
    cam.lookAt(0, 0, 0);

    p5.ambientLight(128);
    p5.ambientMaterial(76, 96, 133);
    p5.pointLight(253, 255, 252, p5.height / 2, -p5.height / 2, p5.height / 2);

    p5.sphere(p5.height / 5, 64, 64);

    for (let k = 0; k < 14; k++) {
      p5.push();
      p5.rotate(k * k);

      p5.beginShape(p5.POINTS);
      p5.stroke(64);
      p5.strokeWeight(0.75);
      for (let i = 0; i < 4 * 360; i++) {
        let theta = (0.25 * i * p5.PI) / 180;
        let x = (p5.width / 4) * p5.sin(a * theta + d + k);
        let y = (p5.height / 4) * p5.sin(b * theta + k);
        let z = (p5.height / 4) * p5.sin(c * theta + k);
        p5.vertex(x, y, z);
      }
      p5.endShape();

      let theta = (0.25 * p5.frameCount * p5.PI) / 180;
      let x = (p5.width / 4) * p5.sin(a * theta + d + k);
      let y = (p5.height / 4) * p5.sin(b * theta + k);
      let z = (p5.height / 4) * p5.sin(c * theta + k);
      p5.translate(x, y, z);

      p5.push();
      p5.ambientLight(64);
      p5.shininess(100);
      if (k % 3 == 1) {
        p5.ambientMaterial(224, 137, 118);
      } else if (k % 3 == 0) {
        p5.emissiveMaterial(54, 241, 205);
      } else {
        p5.ambientMaterial(215, 38, 56);
        p5.specularMaterial(2, 4, 2);
      }
      p5.noStroke();
      p5.sphere(p5.height / 64);
      p5.pop();

      p5.pop();
    }
  };
};

new p5(
  (p) => LISSAJOUS_PLANET(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
