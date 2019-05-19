(function () {
    'use strict';

    const canvas = document.getElementById('theCanvas');
    const context = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth - 2;
        canvas.height = window.innerHeight - 2;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Ant {
        constructor() {
            this.x = window.innerWidth / 2;
            this.y = window.innerHeight / 2;
        }

        move() {
            this.x += Ant.getRandomNumber(-1, 1);
            this.y += Ant.getRandomNumber(-1, 1);
        }

        static getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }

    const theAnts = [];
    for (let i = 0; i < 1000; i++) {
        theAnts.push(new Ant());
    }

    context.strokeStyle = 'black';

    setInterval(() => {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        theAnts.forEach(ant => {
            ant.move();
            context.fillRect(ant.x, ant.y, 2, 2);
        });
    }, 100);//17);
}());