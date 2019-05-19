(function () {
    'use strict';

    const canvas = document.getElementById('theCanvas');
    const context = canvas.getContext('2d');

    context.fillStyle = 'green';
    //context.fillRect(10, 10, 100, 100);

    //context.fillRect(300, 300, 100, 100);


    context.beginPath();
    context.moveTo(75, 50);
    context.lineTo(100, 75);
    context.lineTo(100, 25);
    //context.fill();
    context.stroke();

    context.beginPath();
    context.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    context.moveTo(110, 75);
    context.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
    context.moveTo(65, 65);
    context.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
    context.moveTo(95, 65);
    context.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
    context.stroke();
}());