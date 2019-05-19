var pcs = pcs || {};

pcs.messageBox = (function () {
    'use strict';

    const initialXOffset = -150;
    const initialYOffset = -70;
    let xOffset = initialXOffset;
    let yOffset = initialYOffset;
    let offsetAmount = 40;
    let openMessages = 0;
    let nextZIndex = 10000;
    const boxHeight = 140;
    const boxWidth = 400;

    let modalDiv = document.createElement('div');
    modalDiv.style.position = 'fixed';
    modalDiv.style.top = 0;
    modalDiv.style.left = 0;
    modalDiv.style.width = '100%';
    modalDiv.style.height = '100%';
    modalDiv.style.backgroundColor = 'lightgray';
    modalDiv.style.opacity = 0.5;
    modalDiv.style.display = 'none';
    document.body.appendChild(modalDiv);

    function show(msg, modal, buttons = ['ok'], callback = null) {
        //buttons = buttons || ['ok'];
        const messageBoxDiv = document.createElement('div');
        const span = document.createElement('span');
        const buttonDiv = document.createElement('div');

        messageBoxDiv.className = 'message-box';
        messageBoxDiv.appendChild(span);
        messageBoxDiv.appendChild(buttonDiv);
        document.body.appendChild(messageBoxDiv);

        buttonDiv.style.position = 'absolute';
        buttonDiv.style.bottom = '6px';
        buttonDiv.style.left = '0';
        buttonDiv.style.width = '100%';
        buttonDiv.style.textAlign = 'center';

        span.style.display = 'inline-block';
        span.style.height = '98px';
        span.style.overflowX = 'hidden';
        span.style.overflowY = 'auto';

        messageBoxDiv.style.backgroundColor = 'lightblue';
        messageBoxDiv.style.padding = '8px';
        messageBoxDiv.style.position = 'fixed';
        messageBoxDiv.style.top = '50%';
        messageBoxDiv.style.left = '50%';
        messageBoxDiv.style.width = boxWidth + 'px';
        messageBoxDiv.style.height = boxHeight + 'px';

        messageBoxDiv.style.boxSizing = 'border-box';
        messageBoxDiv.style.borderRadius = '5px';
        messageBoxDiv.style.zIndex = nextZIndex++;
        messageBoxDiv.style.border = '1px solid gray';

        //for (let i = 0; i < buttons.length; i++) {
        buttons.forEach(function (buttonText) {
            let button = document.createElement('button');
            button.innerHTML = buttonText;//buttons[i];
            buttonDiv.appendChild(button);
            button.addEventListener('click', function () {
                document.body.removeChild(messageBoxDiv);
                if (modal) {
                    modalDiv.style.display = 'none';
                }
                if (--openMessages === 0) {
                    xOffset = initialXOffset;
                    yOffset = initialYOffset;
                }

                if (callback) {
                    callback(buttonText); //buttons[i]);
                }
            });
        });

        messageBoxDiv.addEventListener('click', function () {
            messageBoxDiv.style.zIndex = nextZIndex++;
        });

        span.innerHTML = msg;

        messageBoxDiv.style.marginLeft = (modal ? initialXOffset : xOffset) + 'px';
        messageBoxDiv.style.marginTop = (modal ? initialYOffset : yOffset) + 'px';

        if (modal) {
            modalDiv.style.display = 'block';
            modalDiv.style.zIndex = nextZIndex - 1;
        } else {
            xOffset += offsetAmount;
            yOffset += offsetAmount;

            if (parseInt(getComputedStyle(messageBoxDiv).right) - offsetAmount < 0) {
                xOffset -= window.innerWidth - boxWidth;
            }
            if (parseInt(getComputedStyle(messageBoxDiv).bottom) - offsetAmount < 0) {
                yOffset -= window.innerHeight - boxHeight;
            }
        }
        openMessages++;
    }

    return {
        show: show
    };
}());