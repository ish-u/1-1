/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const WAVES = (p5, el) => {
  const bgColors = [
    [26, 26, 46],
    [13, 17, 23],
    [27, 27, 47],
    [10, 10, 10],
    [15, 23, 42],
    [20, 10, 30],
    [5, 20, 5],
    [40, 15, 10],
    [10, 25, 35],
    [30, 20, 10],
  ];

  const fillColors = [
    [233, 69, 96],
    [0, 255, 159],
    [167, 139, 250],
    [255, 107, 53],
    [56, 189, 248],
    [217, 70, 239],
    [0, 255, 65],
    [255, 50, 20],
    [125, 249, 255],
    [251, 191, 36],
  ];
  let transitioning = false;
  let transitionT = 1;
  let shapeSize;
  let currentBgColorIdx;
  let currentFillColorIdx;

  p5.setup = () => {
    const { height } = el.getBoundingClientRect();
    p5.createCanvas(height, height);
    p5.noStroke();
    p5.angleMode(p5.DEGREES);
    transitioning = false;
    transitionT = 1;
    shapeSize = p5.height / 64;
    currentFillColorIdx = 0;
    currentBgColorIdx = 0;
  };

  p5.draw = () => {
    let bgColor = p5.lerpColor(
      p5.color(...bgColors[currentBgColorIdx % bgColors.length]),
      p5.color(...bgColors[(currentBgColorIdx + 1) % bgColors.length]),
      transitionT,
    );
    p5.background(bgColor);

    if (transitioning) {
      transitionT += 0.005;
      if (transitionT >= 1) {
        transitionT = 1;
        transitioning = false;
      }
    }

    if (p5.frameCount % 300 === 0) {
      currentBgColorIdx = (currentBgColorIdx + 1) % bgColors.length;
      currentFillColorIdx = (currentFillColorIdx + 1) % fillColors.length;
      transitionT = 0;
      transitioning = true;
    }

    for (let i = 1; i <= p5.width; i += shapeSize + shapeSize / 2) {
      for (let j = 1; j <= 11; j++) {
        p5.push();
        let fillColor = p5.lerpColor(
          p5.color(...fillColors[currentFillColorIdx % fillColors.length]),
          p5.color(
            ...fillColors[(currentFillColorIdx + 1) % fillColors.length],
          ),
          transitionT,
        );
        p5.fill(...fillColor.levels.slice(0, 3), p5.map(j, 0, 11, 64, 255));
        p5.rect(
          i,
          p5.height / 2 +
            (p5.sin(p5.frameCount + (i + shapeSize * 4 * j) / 8) * p5.height) /
              2,
          shapeSize,
          shapeSize * p5.abs(p5.sin(p5.frameCount + i / 16)),
        );
        p5.pop();
      }
    }
  };
};

new p5(
  (p) => WAVES(p, document.querySelector("#sketch") || null),
  document.querySelector("#sketch") || null,
);
