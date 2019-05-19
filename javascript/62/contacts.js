/*global $*/
(function () {
    'use strict';

    let contacts = [];
    let addContactForm = $('#addContactForm');

    $('#addContact').click(function () {
        addContactForm.slideDown(3000);
    });

    function addContact(newContact) {
        let theTableBody = $('#contactsTable tbody');

        if (!contacts.length) {
            theTableBody.empty();
        }

        contacts.push(newContact);

        theTableBody.append(`<tr>
                                <td>${newContact.firstName}</td>
                                <td>${newContact.lastName}</td>
                                <td>${newContact.email}</td>
                                <td>${newContact.phone}</td>
                            </tr>`);
    }

    let firstNameElem = $('#first');
    let lastNameElem = $('#last');
    let emailElem = $('#email');
    let phoneElem = $('#phone');

    addContactForm.on('submit', function (event) {
        let newContact = {
            firstName: firstNameElem.val(),
            lastName: lastNameElem.val(),
            email: emailElem.val(),
            phone: phoneElem.val()
        };
        addContact(newContact);

        hideAddContactForm();

        event.preventDefault();
    });

    $('#cancel').click(function () {
        hideAddContactForm();
    });

    function hideAddContactForm() {
        addContactForm.slideUp('slow');
        /*firstNameElem.val('');
        lastNameElem.val('');
        emailElem.val('');
        phoneElem.val('');*/
        addContactForm[0].reset();
    }
}());


