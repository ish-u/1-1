/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const DIGITS = (p5, el) => {
  let CIRCLE_SIZE = 100;
  let COLS = 5;
  let ROWS = 7;
  let t = 0;

  const palette = ["#049DBF", "#03A6A6", "#048C3F", "#F2A516", "#D92525"];
  let COLOR_ONE_IDX;
  let COLOR_TWO_IDX;
  let transitioning = false;
  let transitionT = 1;
  let isClicked = false;

  let CURRENT_GRID = [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ];

  p5.setup = () => {
    const { height, width } = el.getBoundingClientRect();
    const dim = width > height ? height : width;
    p5.createCanvas(dim, dim);
    CIRCLE_SIZE = p5.height / 8;
    COLOR_ONE_IDX = 0;
    COLOR_TWO_IDX = (COLOR_ONE_IDX + 1) % palette.length;
    p5.frameRate(60);
    p5.rectMode(p5.CENTER);
    p5.angleMode(p5.DEGREES);
    p5.smooth();
    p5.noStroke();
  };

  p5.draw = () => {
    p5.background(0);

    let size = CIRCLE_SIZE * 0.95 * p5.abs(p5.cos(p5.frameCount * 2));

    let gridWidth = (COLS - 1) * CIRCLE_SIZE;
    let gridHeight = (ROWS - 1) * CIRCLE_SIZE;
    let offsetX = (p5.width - gridWidth) / 2;
    let offsetY = (p5.height - gridHeight) / 2;
    p5.translate(offsetX, offsetY);

    if (transitioning) {
      transitionT += 1 / 90;
      if (transitionT > 1) {
        transitionT = 1;
        transitioning = false;
      }
    }
    let colorOne = p5.color(palette[COLOR_ONE_IDX]);
    let colorTwo = p5.color(palette[COLOR_TWO_IDX]);
    let circleColor = p5.lerpColor(colorOne, colorTwo, transitionT);
    p5.fill(circleColor);

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 7; j++) {
        let x = i * CIRCLE_SIZE;
        let y = j * CIRCLE_SIZE;
        p5.circle(x, y, size);
      }
    }
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 7; j++) {
        if (CURRENT_GRID[j][i] == 1) {
          let x = i * CIRCLE_SIZE;
          let y = j * CIRCLE_SIZE;
          p5.circle(x, y, CIRCLE_SIZE * 0.95);
        }
      }
    }
    if (p5.frameCount % 90 == 0) {
      t++;
      if (t > 9) {
        t = 0;
      }
      switch (t) {
        case 0:
          CURRENT_GRID = [
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 1, 1],
            [1, 0, 1, 0, 1],
            [1, 1, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
          ];
          break;
        case 1:
          CURRENT_GRID = [
            [0, 0, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0],
          ];
          break;
        case 2:
          CURRENT_GRID = [
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [0, 0, 0, 0, 1],
            [0, 0, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [1, 1, 1, 1, 1],
          ];
          break;
        case 3:
          CURRENT_GRID = [
            [1, 1, 1, 1, 1],
            [0, 0, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
          ];
          break;
        case 4:
          CURRENT_GRID = [
            [0, 0, 0, 1, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [1, 0, 0, 1, 0],
            [1, 1, 1, 1, 1],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0],
          ];
          break;
        case 5:
          CURRENT_GRID = [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 1, 1, 0],
            [0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
          ];
          break;
        case 6:
          CURRENT_GRID = [
            [0, 0, 1, 1, 0],
            [0, 1, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
          ];
          break;
        case 7:
          CURRENT_GRID = [
            [1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1],
            [0, 0, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0],
          ];
          break;
        case 8:
          CURRENT_GRID = [
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
          ];
          break;
        case 9:
          CURRENT_GRID = [
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 1],
            [0, 0, 0, 0, 1],
            [0, 0, 0, 1, 0],
            [0, 1, 1, 0, 0],
          ];
          break;
      }
      transitionT = 0;
      transitioning = true;
      COLOR_ONE_IDX = (COLOR_ONE_IDX + 1) % palette.length;
      COLOR_TWO_IDX = (COLOR_ONE_IDX + 1) % palette.length;
    }
  };

  if (p5.mouseIsPressed && !isClicked) {
  }
};

new p5(
  (p) => DIGITS(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
