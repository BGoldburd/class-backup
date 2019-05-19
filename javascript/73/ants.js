(function () {
    'use strict';

    const canvas = document.getElementById('theCanvas');
    const context = canvas.getContext('2d');
    const numAntsInput = document.getElementById('numAnts');
    const antColorInput = document.getElementById('antColor');
    const theAnts = [];
    const antSize = 2;

    function resizeCanvas() {
        canvas.width = window.innerWidth - 2;
        canvas.height = window.innerHeight - 2;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Ant {
        constructor(color = '#000') {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.color = color;
            this.brains = 0;
        }

        move(timeDelta) {
            if (--this.brains <= 0) {
                this.brains = Ant.getRandomNumber(1, 10);
                this.moveX = Ant.getRandomNumber(-1, 1);
                this.moveY = Ant.getRandomNumber(-1, 1);
            }

            //console.log('x', this.moveX * (timeDelta * 0.01), 'y', this.moveY * (timeDelta * 0.01));

            this.x += this.moveX * (timeDelta * 0.01);
            this.y += this.moveY * (timeDelta * 0.01);

            if (this.x < 0) {
                this.x = 0;
            } else if (this.x > canvas.width - antSize) {
                this.x = canvas.width - antSize;
            }

            if (this.y < 0) {
                this.y = 0;
            } else if (this.y > canvas.height - antSize) {
                this.y = canvas.height - antSize;
            }
        }

        static getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }

    function addAnts(numAntsToAdd, color) {
        for (let i = 0; i < numAntsToAdd; i++) {
            theAnts.unshift(new Ant(color));
        }
    }

    document.getElementById('addAnts').addEventListener('click', () => {
        addAnts(numAntsInput.value, antColorInput.value);
    });

    let lastRendered;

    function renderAnts(timestamp) {
        if (!lastRendered) {
            lastRendered = timestamp;
        }

        let delta = timestamp - lastRendered;

        context.clearRect(0, 0, canvas.width, canvas.height);
        theAnts.forEach(ant => {
            ant.move(delta);
            context.fillStyle = ant.color;
            context.fillRect(ant.x, ant.y, antSize, antSize);
        });

        lastRendered = timestamp;

        requestAnimationFrame(renderAnts);
    }

    requestAnimationFrame(renderAnts);

    addAnts(1000);
}());