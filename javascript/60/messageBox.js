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

    function show(msg) {
        const messageBoxDiv = document.createElement('div');
        const span = document.createElement('span');
        const buttonDiv = document.createElement('div');
        const okButton = document.createElement('button');

        messageBoxDiv.className = 'message-box';
        okButton.innerHTML = 'OK';

        messageBoxDiv.appendChild(span);
        buttonDiv.appendChild(okButton);
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
        messageBoxDiv.style.width = '300px';
        messageBoxDiv.style.height = '140px';
        messageBoxDiv.style.marginLeft = xOffset + 'px';
        messageBoxDiv.style.marginTop = yOffset + 'px';
        messageBoxDiv.style.boxSizing = 'border-box';
        messageBoxDiv.style.borderRadius = '5px';
        messageBoxDiv.style.zIndex = nextZIndex++;

        okButton.addEventListener('click', function () {
            document.body.removeChild(messageBoxDiv);
            if (--openMessages === 0) {
                xOffset = initialXOffset;
                yOffset = initialYOffset;
            }
        });

        messageBoxDiv.addEventListener('click', function () {
            messageBoxDiv.style.zIndex = nextZIndex++;
        });

        span.innerHTML = msg;
        xOffset += offsetAmount;
        yOffset += offsetAmount;
        openMessages++;
    }

    return {
        show: show
    };
}());