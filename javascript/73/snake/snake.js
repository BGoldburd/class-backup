(function () {
    'use strict';

    const canvas = document.getElementById('theCanvas');
    const context = canvas.getContext('2d');
    const LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40;
    const snakeSize = 64;
    const crunchSound = document.getElementById('crunch');

    let headX = 0;
    let headY = 0;
    let direction = RIGHT;
    let appleX = -1;
    let appleY = 0;
    let score = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth - 2;
        canvas.height = window.innerHeight - 2;

        // in case apple is now off the screen - obviously we could check first
        context.clearRect(appleX, appleY, snakeSize, snakeSize);
        if (appleX + 1) { // if apple not placed yet will be 0
            placeApple();
        }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const snakeHead = document.createElement('img');
    snakeHead.src = 'images/snakeHead.png';
    //snakeHead.onload = () => context.drawImage(snakeHead, 0, 0, 64, 64);
    //snakeHead.onload = () => requestAnimationFrame(render);

    /*let lastRendered;

    function render(timestamp) {
        if (!lastRendered) {
            lastRendered = timestamp;
        }

        let delta = timestamp - lastRendered;
        if (delta >= 30) {
            context.clearRect(headX, 0, 64, 64);
            headX += 32 * (delta * 0.01);
            context.drawImage(snakeHead, headX, 0, 64, 64);

            lastRendered = timestamp;
        }

        requestAnimationFrame(render);
    }*/

    snakeHead.onload = render;
    function render() {
        setInterval(() => {
            context.clearRect(headX, headY, snakeSize, snakeSize);

            switch (direction) {
                case LEFT:
                    headX -= snakeSize;
                    break;
                case UP:
                    headY -= snakeSize;
                    break;
                case RIGHT:
                    headX += snakeSize;
                    break;
                case DOWN:
                    headY += snakeSize;
                    break;
            }

            if (headX === appleX && headY === appleY) {
                crunchSound.currentTime = 0;
                crunchSound.play();
                score++;
                console.log('score', score);
                placeApple();
            }

            context.drawImage(snakeHead, headX, headY, snakeSize, snakeSize);
        }, 600);
    }

    const apple = document.createElement('img');
    apple.src = 'images/apple.png';
    apple.onload = placeApple;

    function placeApple() {
        appleX = getRandomNumber(0, canvas.width - snakeSize);
        appleY = getRandomNumber(0, canvas.height - snakeSize);
        appleX = appleX - appleX % snakeSize;
        appleY = appleY - appleY % snakeSize;
        context.drawImage(apple, appleX, appleY, snakeSize, snakeSize);
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    document.addEventListener('keydown', event => {
        console.log(event);
        switch (event.keyCode) // note keyCode is DEPRECATED
        {
            case LEFT:
            case UP:
            case RIGHT:
            case DOWN:
                direction = event.keyCode;
        }
    });
}());