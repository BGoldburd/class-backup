/*global $*/
(function () {
    'use strict';

    let contacts = [];
    let addContactForm = $('#addContactForm');
    let theTableBody = $('#contactsTable tbody');

    $('#addContact').click(function () {
        addContactForm.slideDown(3000);
    });

    theTableBody.on('click', 'button.delete', event => {
        const rowToDelete = $(event.target).closest('tr');
        console.log(`Send delete to server to delete contact ${rowToDelete.data('contactId')}`);
        rowToDelete.remove();
    });

    function addContact(newContact) {
        if (!contacts.length) {
            theTableBody.empty();
        }

        newContact.id = contacts.length + 1; // really would be set on server
        contacts.push(newContact);

        const newRow = $(`<tr>
                            <td>${newContact.firstName}</td>
                            <td>${newContact.lastName}</td>
                            <td>${newContact.email}</td>
                            <td>${newContact.phone}</td>
                            <td><button class="delete">delete</button></td>
                        </tr>`)
            .appendTo(theTableBody)
            .data('contactId', newContact.id);

        /*newRow.find('button')
            .click(() => {
                console.log('Would delete', newContact);
                newRow.remove();
            });*/
    }

    let firstNameElem = $('#first');
    let lastNameElem = $('#last');
    let emailElem = $('#email');
    let phoneElem = $('#phone');

    addContactForm.submit(function (event) {
        let newContact = {
            firstName: firstNameElem.val(),
            lastName: lastNameElem.val(),
            email: emailElem.val(),
            phone: phoneElem.val()
        };

        // would post to server here and get id for new contact
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

    $("#load").click(() => {
        /*$.get('contacts.data', loadedData => {
            const loadedContacts = JSON.parse(loadedData);
            loadedContacts.forEach(contact => addContact(contact));
        });*/
        /*$.get('contacts.data', loadedContacts => {
            loadedContacts.forEach(contact => addContact(contact));
        }, 'json');*/
        /*$.getJSON('contacts.data', loadedContacts => {
            loadedContacts.forEach(contact => addContact(contact));
        });*/
        $.get('contacts.json', loadedContacts => {
            loadedContacts.forEach(contact => addContact(contact));
        });
    });
}());


