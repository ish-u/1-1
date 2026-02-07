const sketches = [
  'circle-pulse',
  'red-and-yellow',
  'polar',
  'scratch-bongo',
  'flower-garden',
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
  'red-and-blue',
  'orbit',
  'dice',
  'rect-spiral',
  'chains',
];


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="grid">
  </div>
`
const infoCell = document.createElement("div");
infoCell.classList.add("cell");
infoCell.id = "info-cell";
infoCell.innerHTML = `
<p id="info-title">1:1</p>
<p id="info-subtitle">sketches by <a href="https://anmol.ninja" target="_blank">anmol.ninja</a></p>

`;

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



