/*g-lobal moment*/
//(function () {
'use strict';

//const moment = require('moment');
import moment from 'moment';

const theDatePicker = document.getElementById('theDate');
const theResultDiv = document.getElementById('result');

theDatePicker.addEventListener('change', () => {
    theResultDiv.innerHTML = `You picked ${moment(theDatePicker.value).fromNow()}`;
});
//}());