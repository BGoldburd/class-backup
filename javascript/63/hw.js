/*global $*/
(function () {
    'use strict';

    const nameInput = $('#name');
    const addressInput = $('#address');
    const nameDisplay = $('#theName');
    const addressDisplay = $('#theAddress');
    const submitButton = $('#submit');
    const acceptCheckbox = $('#accept');

    acceptCheckbox.click(function (event) {
        console.log(event);

        //if (submitButton.prop('disabled')) {
        if (acceptCheckbox.is(':checked')) {
            submitButton.prop('disabled', false);
            //$('input:not([type="checkbox"])').prop('disabled', false);
            //$('#theInputs').prop('disabled', false);
        } else {
            submitButton.prop('disabled', true);
            //$('input:not([type="checkbox"])').prop('disabled', true);
            //$('#theInputs').prop('disabled', true);
        }
    });

    $('#theForm').submit(function (event) {
        nameDisplay.text(nameInput.val());
        addressDisplay.text(addressInput.val());

        event.preventDefault();
    });
}());