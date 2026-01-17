/**
 * @param {import('p5')} p5 - The p5 instance (for instance mode).
 * @param {HTMLElement} el - The DOM element to attach the sketch to.
 * @returns {p5} The created p5 instance.
 */
const RUBIKS_CUBE = (p5, el) => {
    let facePositions = [
        [0, 0, 0],
        [0, 1, 0],
        [1, 0, 0],
        [0, -1, 0],
        [-1, 0, 0],
        [1, 1, 0],
        [-1, 1, 0],
        [1, -1, 0],
        [-1, -1, 0],
    ];

    const colors = [
        [255, 255, 255], // White
        [255, 213, 0], // Yellow
        [183, 18, 31], // Red
        [255, 88, 0], // Orange
        [0, 70, 173], // Blue
        [0, 155, 72], // Green
    ];

    let cubes = [];

    class Cube {
        x;
        y;
        z;
        s;
        faces;
        rot;
        rotVel;
        translateX;
        translateY;
        translateZ;
        speed;
        constructor(x = 0, y = 0, z = 0, s = 10) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.s = s;

            this.faces = [];
            for (let i = 0; i < 6; i++) {
                let face = [];
                for (let j = 0; j < 9; j++) {
                    face.push(p5.floor(p5.random(0, 6)));
                }
                this.faces.push(face);
            }

            this.rot = p5.createVector(p5.random(p5.TWO_PI), p5.random(p5.TWO_PI), p5.random(p5.TWO_PI));

            this.rotVel = p5.createVector(
                p5.random(-0.01, 0.01),
                p5.random(-0.01, 0.01),
                p5.random(-0.01, 0.01)
            );

            this.translateX = 0;
            this.translateY = 0;
            this.translateZ = 0;

            this.speed = p5.random(0, 1);
        }

        show() {
            this.x += this.speed;
            this.y += this.speed;
            this.z += this.speed;

            p5.push();

            p5.translate(this.x, this.y, this.z);

            this.rot.add(this.rotVel);
            p5.rotateX(this.rot.x);
            p5.rotateY(this.rot.y);
            p5.rotateZ(this.rot.z);

            // FRONT
            p5.push();
            p5.translate(0, 0, (this.s * 3) / 2);
            p5.rectMode(p5.CENTER);
            for (let i = 0; i < facePositions.length; i++) {
                let facePosition = facePositions[i];
                let x = this.s * facePosition[0];
                let y = this.s * facePosition[1];
                p5.fill(colors[this.faces[0][i]][0], colors[this.faces[0][i]][1], colors[this.faces[0][i]][2]);
                p5.rect(x, y, this.s, this.s, 0);
            }
            p5.pop();

            // BACK
            p5.push();
            p5.translate(0, 0, (-this.s * 3) / 2);
            p5.rectMode(p5.CENTER);
            for (let i = 0; i < facePositions.length; i++) {
                let facePosition = facePositions[i];
                let x = this.s * facePosition[0];
                let y = this.s * facePosition[1];
                p5.fill(colors[this.faces[1][i]][0], colors[this.faces[1][i]][1], colors[this.faces[1][i]][2]);
                p5.rect(x, y, this.s, this.s);
            }
            p5.pop();

            // TOP
            p5.push();
            p5.translate(0, (-this.s * 3) / 2, 0);
            p5.rotateX(p5.HALF_PI);
            p5.rectMode(p5.CENTER);
            for (let i = 0; i < facePositions.length; i++) {
                let facePosition = facePositions[i];
                let x = this.s * facePosition[0];
                let y = this.s * facePosition[1];
                p5.fill(colors[this.faces[1][i]][0], colors[this.faces[1][i]][1], colors[this.faces[1][i]][2]);
                p5.rect(x, y, this.s, this.s);
            }
            p5.pop();

            // BOTTOM
            p5.push();
            p5.translate(0, (this.s * 3) / 2, 0);
            p5.rotateX(p5.HALF_PI);
            p5.rectMode(p5.CENTER);
            for (let i = 0; i < facePositions.length; i++) {
                let facePosition = facePositions[i];
                let x = this.s * facePosition[0];
                let y = this.s * facePosition[1];
                p5.fill(colors[this.faces[1][i]][0], colors[this.faces[1][i]][1], colors[this.faces[1][i]][2]);
                p5.rect(x, y, this.s, this.s);
            }
            p5.pop();

            // RIGHT
            p5.push();
            p5.translate((this.s * 3) / 2, 0, 0);
            p5.rotateY(p5.HALF_PI);
            p5.rectMode(p5.CENTER);
            for (let i = 0; i < facePositions.length; i++) {
                let facePosition = facePositions[i];
                let x = this.s * facePosition[0];
                let y = this.s * facePosition[1];
                p5.fill(colors[this.faces[1][i]][0], colors[this.faces[1][i]][1], colors[this.faces[1][i]][2]);
                p5.rect(x, y, this.s, this.s);
            }
            p5.pop();

            // LEFT
            p5.push();
            p5.translate(-(this.s * 3) / 2, 0, 0);
            p5.rotateY(p5.HALF_PI);
            p5.rectMode(p5.CENTER);
            for (let i = 0; i < facePositions.length; i++) {
                let facePosition = facePositions[i];
                let x = this.s * facePosition[0];
                let y = this.s * facePosition[1];
                p5.fill(colors[this.faces[1][i]][0], colors[this.faces[1][i]][1], colors[this.faces[1][i]][2]);
                p5.rect(x, y, this.s, this.s);
            }
            p5.pop();

            p5.pop();
        }
    }

    p5.setup = () => {
        const { height } = el.getBoundingClientRect();
        p5.createCanvas(height, height, p5.WEBGL);
        cubes = [];
        for (let i = 0; i < 50; i++) {
            cubes.push(
                new Cube(
                    p5.random(-3 * p5.width, p5.width),
                    p5.random(-3 * p5.width, p5.width),
                    p5.random(-p5.width, 0),
                    p5.random(10, 50)
                )
            );
        }
    };

    p5.draw = () => {
        p5.background(0);
        for (const cube of cubes) {
            cube.show();
        }
    };

};

new p5((p) => RUBIKS_CUBE(p, document.querySelector('#sketch') || null), document.querySelector('#sketch') || null);