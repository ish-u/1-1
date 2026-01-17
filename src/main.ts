
// const RUBIK_CUBE = (p5: p5, el: HTMLElement) => {
//   let facePositions = [
//     [0, 0, 0],
//     [0, 1, 0],
//     [1, 0, 0],
//     [0, -1, 0],
//     [-1, 0, 0],
//     [1, 1, 0],
//     [-1, 1, 0],
//     [1, -1, 0],
//     [-1, -1, 0],
//   ];

//   const colors = [
//     [255, 255, 255], // White
//     [255, 213, 0], // Yellow
//     [183, 18, 31], // Red
//     [255, 88, 0], // Orange
//     [0, 70, 173], // Blue
//     [0, 155, 72], // Green
//   ];

//   let cubes: Cube[] = [];

//   class Cube {
//     x: number;
//     y: number;
//     z: number;
//     s: number;
//     faces: number[][];
//     rot: any;
//     rotVel: any;
//     translateX: number;
//     translateY: number;
//     translateZ: number;
//     speed: number;
//     constructor(x = 0, y = 0, z = 0, s = 10) {
//       this.x = x;
//       this.y = y;
//       this.z = z;
//       this.s = s;

//       this.faces = [];
//       for (let i = 0; i < 6; i++) {
//         let face = [];
//         for (let j = 0; j < 9; j++) {
//           face.push(p5.floor(p5.random(0, 6)));
//         }
//         this.faces.push(face);
//       }

//       this.rot = p5.createVector(p5.random(p5.TWO_PI), p5.random(p5.TWO_PI), p5.random(p5.TWO_PI));

//       this.rotVel = p5.createVector(
//         p5.random(-0.01, 0.01),
//         p5.random(-0.01, 0.01),
//         p5.random(-0.01, 0.01)
//       );

//       this.translateX = 0;
//       this.translateY = 0;
//       this.translateZ = 0;

//       this.speed = p5.random(0, 1);
//     }

//     show() {
//       this.x += this.speed;
//       this.y += this.speed;
//       this.z += this.speed;

//       p5.push();

//       p5.translate(this.x, this.y, this.z);

//       this.rot.add(this.rotVel);
//       p5.rotateX(this.rot.x);
//       p5.rotateY(this.rot.y);
//       p5.rotateZ(this.rot.z);

//       // FRONT
//       p5.push();
//       p5.translate(0, 0, (this.s * 3) / 2);
//       p5.rectMode(p5.CENTER);
//       for (let i = 0; i < facePositions.length; i++) {
//         let facePosition = facePositions[i];
//         let x = this.s * facePosition[0];
//         let y = this.s * facePosition[1];
//         p5.fill(colors[this.faces[0][i]][0], colors[this.faces[0][i]][1], colors[this.faces[0][i]][2]);
//         p5.rect(x, y, this.s, this.s, 0);
//       }
//       p5.pop();

//       // BACK
//       p5.push();
//       p5.translate(0, 0, (-this.s * 3) / 2);
//       p5.rectMode(p5.CENTER);
//       for (let i = 0; i < facePositions.length; i++) {
//         let facePosition = facePositions[i];
//         let x = this.s * facePosition[0];
//         let y = this.s * facePosition[1];
//         p5.fill(colors[this.faces[1][i]][0], colors[this.faces[1][i]][1], colors[this.faces[1][i]][2]);
//         p5.rect(x, y, this.s, this.s);
//       }
//       p5.pop();

//       // TOP
//       p5.push();
//       p5.translate(0, (-this.s * 3) / 2, 0);
//       p5.rotateX(p5.HALF_PI);
//       p5.rectMode(p5.CENTER);
//       for (let i = 0; i < facePositions.length; i++) {
//         let facePosition = facePositions[i];
//         let x = this.s * facePosition[0];
//         let y = this.s * facePosition[1];
//         p5.fill(colors[this.faces[1][i]][0], colors[this.faces[1][i]][1], colors[this.faces[1][i]][2]);
//         p5.rect(x, y, this.s, this.s);
//       }
//       p5.pop();

//       // BOTTOM
//       p5.push();
//       p5.translate(0, (this.s * 3) / 2, 0);
//       p5.rotateX(p5.HALF_PI);
//       p5.rectMode(p5.CENTER);
//       for (let i = 0; i < facePositions.length; i++) {
//         let facePosition = facePositions[i];
//         let x = this.s * facePosition[0];
//         let y = this.s * facePosition[1];
//         p5.fill(colors[this.faces[1][i]][0], colors[this.faces[1][i]][1], colors[this.faces[1][i]][2]);
//         p5.rect(x, y, this.s, this.s);
//       }
//       p5.pop();

//       // RIGHT
//       p5.push();
//       p5.translate((this.s * 3) / 2, 0, 0);
//       p5.rotateY(p5.HALF_PI);
//       p5.rectMode(p5.CENTER);
//       for (let i = 0; i < facePositions.length; i++) {
//         let facePosition = facePositions[i];
//         let x = this.s * facePosition[0];
//         let y = this.s * facePosition[1];
//         p5.fill(colors[this.faces[1][i]][0], colors[this.faces[1][i]][1], colors[this.faces[1][i]][2]);
//         p5.rect(x, y, this.s, this.s);
//       }
//       p5.pop();

//       // LEFT
//       p5.push();
//       p5.translate(-(this.s * 3) / 2, 0, 0);
//       p5.rotateY(p5.HALF_PI);
//       p5.rectMode(p5.CENTER);
//       for (let i = 0; i < facePositions.length; i++) {
//         let facePosition = facePositions[i];
//         let x = this.s * facePosition[0];
//         let y = this.s * facePosition[1];
//         p5.fill(colors[this.faces[1][i]][0], colors[this.faces[1][i]][1], colors[this.faces[1][i]][2]);
//         p5.rect(x, y, this.s, this.s);
//       }
//       p5.pop();

//       p5.pop();
//     }
//   }

//   p5.setup = () => {
//     const { height } = el.getBoundingClientRect();
//     p5.createCanvas(height, height, p5.WEBGL);
//     cubes = [];
//     for (let i = 0; i < 50; i++) {
//       cubes.push(
//         new Cube(
//           p5.random(-3 * p5.width, p5.width),
//           p5.random(-3 * p5.width, p5.width),
//           p5.random(-p5.width, 0),
//           p5.random(10, 50)
//         )
//       );
//     }
//   };

//   p5.draw = () => {
//     p5.background(0);
//     for (const cube of cubes) {
//       cube.show();
//     }
//   };
// };

// const CHAINS = (p5: p5, el: HTMLElement) => {
//   let palette = ["64A6BD", "90A8C3"].map((c) => "#" + c);
//   let paletteSquares = ["26547c", "ef476f", "ffd166", "06d6a0"].map(
//     (c) => "#" + c
//   );

//   p5.setup = () => {
//     const { height } = el.getBoundingClientRect();
//     p5.createCanvas(height, height);
//     p5.stroke(128);
//     p5.strokeWeight(0.5);
//   };

//   p5.draw = () => {
//     p5.clear();
//     p5.background(
//       p5.lerpColor(
//         p5.color(palette[0]),
//         p5.color(palette[1]),
//         (1 - p5.cos(p5.millis() * 0.001)) * 0.5
//       )
//     );

//     let spacing = 50;

//     p5.push();

//     p5.rectMode(p5.CENTER);
//     for (let i = 0; i < p5.width + spacing; i += spacing) {
//       for (let j = 0; j < p5.height + spacing; j += spacing) {
//         p5.push();
//         p5.translate(i, j);
//         let offset = (p5.frameCount / 2 % spacing) - 10;

//         p5.fill(paletteSquares[(i / spacing) % paletteSquares.length]);
//         if (i / spacing % 2 === 0) {
//           p5.translate(0, offset);
//           p5.rotate(p5.QUARTER_PI);
//         } else {
//           p5.translate(0, -offset);
//           p5.rotate(p5.QUARTER_PI);
//         }

//         p5.square(0, 0, spacing / 2);
//         p5.pop();
//       }
//     }
//     p5.pop();
//   };
// };

// const SPIRAL = (p5: p5, el: HTMLElement) => {
//   p5.setup = () => {
//     const { height } = el.getBoundingClientRect();
//     p5.createCanvas(height, height, p5.WEBGL);
//     p5.angleMode(p5.DEGREES);
//     p5.noStroke();
//   }

//   p5.draw = () => {
//     p5.background(0);

//     p5.rotateX(22.5);
//     for (let k = 0; k < 30; k++) {
//       for (let i = 0; i < 360; i += 72 / k) {
//         let r = 20 * k;
//         let x = r * p5.cos(i + p5.frameCount);
//         let y = r * -p5.sin(i + p5.frameCount);
//         p5.push();
//         p5.translate(x, y, 20 * k);
//         p5.circle(0, 0, 10);
//         p5.pop();
//       }
//     }
//   }
// }

// const SCRATCH_BONGO = (p5: p5, el: HTMLElement) => {
//   let shapeSize = 20;
//   let palettes = [
//     ["#000501", "#73ab84", "#99d19c", "#79c7c5"],
//     ["#5e2bff", "#c04cfd", "#fc6dab", "#f7f6c5"],
//     ["#e4572e", "#17bebb", "#ffc914", "#2e282a"],
//     ["#02111b", "#3f4045", "#30292f", "#5d737e"],
//     ["#c96480", "#b47978", "#b1ae91", "#95bf8f"],
//     ["#d0cfec", "#6a8e7f", "#989572", "#c6ae82"]

//   ];
//   let currentPalette = 0;
//   let palette = palettes[0];
//   let colors: string[][] = [];
//   let oldColors: string[][] = [];

//   let x = 0.1;
//   let y = 0.07;
//   let z = 0;

//   let transitioning = false;
//   let transitionT = 1;

//   p5.setup = () => {
//     const { height } = el.getBoundingClientRect();
//     p5.createCanvas(height, height);
//     p5.noStroke();

//     for (let i = 0; i < p5.width; i += shapeSize) {
//       let row: string[] = [];
//       for (let j = 0; j < p5.width; j += shapeSize) {
//         row.push(p5.random(palette));
//       }
//       colors.push(row);
//     }
//     oldColors = structuredClone(colors);
//     p5.smooth();
//   }

//   p5.draw = () => {
//     // clear();
//     p5.background(255);
//     p5.color(0);

//     if (transitioning) {
//       transitionT += 0.015;
//       if (transitionT >= 1) {
//         transitionT = 1;
//         transitioning = false;
//       }
//     }

//     if (p5.frameCount % 300 === 0) {
//       currentPalette = (currentPalette + 1) % palettes.length;
//       resetColors();
//     }

//     p5.rectMode(p5.CENTER);
//     for (let i = 0; i < p5.width; i += shapeSize) {
//       for (let j = 0; j < p5.width; j += shapeSize) {
//         let color = p5.lerpColor(
//           p5.color(oldColors[i / shapeSize][j / shapeSize]),
//           p5.color(colors[i / shapeSize][j / shapeSize]),
//           transitionT
//         );
//         p5.fill(color);

//         let size =
//           1.5 * shapeSize * p5.noise((i * x) / shapeSize, (j * y) / shapeSize, z);
//         p5.circle(i + shapeSize / 2, j + shapeSize / 2, size);
//       }
//     }

//     z = p5.frameCount * 0.01;
//   }

//   function resetColors() {
//     oldColors = structuredClone(colors);
//     colors = [];
//     for (let i = 0; i < p5.width; i += shapeSize) {
//       let row: string[] = [];
//       for (let j = 0; j < p5.width; j += shapeSize) {
//         row.push(p5.random(palettes[currentPalette]));
//       }
//       colors.push(row);
//     }
//     transitionT = 0;
//     transitioning = true;
//   }
// }

const sketches = [
  'speak-to-me',
  'breathe-in-the-air',
  'on-the-run',
  'time',
  'the-great-gig',
  'money',
  'us-and-them',
  'any-color-you-like',
  'brain-damage',
  'eclipse',
  'rubik-cube',
  'chains',
  'spiral',
  'scratch-bongo',
];


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="grid">
  </div>
`
const infoCell = document.createElement("div");
infoCell.classList.add("cell");
infoCell.id = "info-cell";
infoCell.innerHTML = `1:1`;

document.querySelector<HTMLDivElement>('#grid')!.appendChild(infoCell);
for (const sketch of sketches) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.style.backgroundImage = `url(/s/${sketch}/preview.png)`;
  cell.addEventListener('click', () => {
    window.location.href = `/s/${sketch}/index.html`;
  });
  document.querySelector<HTMLDivElement>('#grid')!.appendChild(cell);
}



