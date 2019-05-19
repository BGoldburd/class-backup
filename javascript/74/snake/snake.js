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
    const crashSound = document.getElementById('crash');

    let snakeSegments = [{ x: -snakeSize, y: 0 }];
    let direction = RIGHT;
    let appleX = -1;
    let appleY = 0;
    let score = 0;
    let speed = 600;

    function resizeCanvas() {
        let width = window.innerWidth - 2;
        let height = window.innerHeight - 2;
        canvas.width = width - width % snakeSize;
        canvas.height = height - height % snakeSize;

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

    snakeHead.onload = () => setTimeout(render, speed);
    function render() {
        let x = 0;
        let y = 0;

        switch (direction) {
            case LEFT:
                x = -snakeSize;
                break;
            case UP:
                y = -snakeSize;
                break;
            case RIGHT:
                x = snakeSize;
                break;
            case DOWN:
                y = snakeSize;
                break;
        }

        let newHeadX = snakeSegments[0].x + x;
        let newHeadY = snakeSegments[0].y + y;

        if (newHeadX < 0 || newHeadY < 0 ||
            newHeadX >= canvas.width || newHeadY >= canvas.height) {
            crashSound.play();
            return;
        }

        // check if hit anything but tail - which is about to move
        if (snakeSegments.slice(0, snakeSegments.length - 2).some(segment => newHeadX === segment.x && newHeadY === segment.y)) {
            crashSound.play();
            return;
        }

        if (newHeadX === appleX && newHeadY === appleY) {
            crunchSound.currentTime = 0;
            crunchSound.play();
            score++;
            speed *= 0.9;
            placeApple();
        } else {
            let tail = snakeSegments.pop();
            context.clearRect(tail.x, tail.y, snakeSize, snakeSize);
        }

        snakeSegments.unshift({ x: newHeadX, y: newHeadY });
        context.drawImage(snakeHead, snakeSegments[0].x, snakeSegments[0].y, snakeSize, snakeSize);
        if (snakeSegments.length > 1) {
            context.fillStyle = 'green';
            context.fillRect(snakeSegments[1].x, snakeSegments[1].y, snakeSize, snakeSize);
        }

        setTimeout(render, speed);
    }

    const apple = document.createElement('img');
    apple.src = 'images/apple.png';
    apple.onload = placeApple;

    function placeApple() {
        do {
            appleX = getRandomNumber(0, canvas.width - snakeSize);
            appleY = getRandomNumber(0, canvas.height - snakeSize);
            appleX = appleX - appleX % snakeSize;
            appleY = appleY - appleY % snakeSize;
        } while (snakeSegments.some(segment => appleX === segment.x && appleY === segment.y));
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
                // If not multi segment snake already going opposite direction... 
                // left - right === 2.. courtesy of Mr Stein.

                // TBD - Should save last traveled direction somewhere in case user presses two key before snake is rendered
                // that would allow snake to reverse...
                if (snakeSegments.length === 1 || Math.abs(event.keyCode - direction) !== 2) {
                    direction = event.keyCode;
                }
        }
    });
}());