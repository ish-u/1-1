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



