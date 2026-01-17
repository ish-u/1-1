
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
  'rubiks-cube',
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



