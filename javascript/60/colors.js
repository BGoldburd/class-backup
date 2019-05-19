(function () {
    'use strict';

    /*const colors = ['red', 'white', 'blue'];
    let i = 0;

    setInterval(function () {
        document.body.style.backgroundColor = colors[i++];
        if (i === colors.length) {
            i = 0;
        }
        document.body.style.color = colors[i];
    }, 1000);*/

    function getRandomColorPart() {
        return Math.floor(Math.random() * 256);
    }

    function getRandomColor() {
        const r = getRandomColorPart();
        const g = getRandomColorPart();
        const b = getRandomColorPart();

        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    let colorsTable = document.getElementById('colorsTable');

    function addRowToTable(color, backgroundColor) {
        let row = colorsTable.insertRow();
        let timeCell = row.insertCell();
        let colorCell = row.insertCell();
        let backgroundColorCell = row.insertCell();

        timeCell.innerHTML = new Date().toLocaleString();
        colorCell.innerHTML = color;
        backgroundColorCell.innerHTML = backgroundColor;

        row.addEventListener('click', function () {
            document.body.style.color = color;
            document.body.style.backgroundColor = backgroundColor;

            stopColorCycle();
        });
    }

    let intervalId;
    let theButton = document.getElementById('theButton');

    function startColorCycle() {
        intervalId = setInterval(function () {
            const color = getRandomColor();
            const backgroundColor = getRandomColor();
            document.body.style.color = color;
            document.body.style.backgroundColor = backgroundColor;

            addRowToTable(color, backgroundColor);
        }, 1000);
        theButton.innerHTML = 'Stop';
    }

    function stopColorCycle() {
        clearInterval(intervalId);
        intervalId = 0;
        theButton.innerHTML = 'Start';
    }

    /*for (let r = 0; r < 256; r++) {
        for (let g = 0; g < 256; g++) {
            for (let b = 0; b < 256; b++) {
                console.log(r, g, b);
            }
        }
    }*/

    /*let r = 0;
    let g = 0;
    let b = 0;
    const changeAmount = 25;

    setInterval(function () {
        r += changeAmount;
        if (r > 255) {
            r = 0;
            g += changeAmount / 2;
        }

        if (g > 255) {
            g = 0;
            b += changeAmount / 3;
        }

        if (b > 255) {
            b = 0;
        }
        document.body.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
        document.body.style.color = 'rgb(' + b + ',' + g + ',' + r + ')';
    }, 1000);*/

    theButton.addEventListener('click', function () {
        if (!intervalId) {
            startColorCycle();
        } else {
            stopColorCycle();
        }
    });
}());