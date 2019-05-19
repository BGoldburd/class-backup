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
        $.ajax({
            method: 'DELETE',
            url: `/api/contacts/${rowToDelete.data('contactId')}`,
            success: () => {
                rowToDelete.remove();
            }
        }).fail(() => {
            alert('failed to delete');
        });
    });

    function addContact(newContact) {
        if (!contacts.length) {
            theTableBody.empty();
        }

        contacts.push(newContact);

        const newRow = $(`<tr>
                            <td>${newContact.firstname}</td>
                            <td>${newContact.lastname}</td>
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
            firstname: firstNameElem.val(),
            lastname: lastNameElem.val(),
            email: emailElem.val(),
            phone: phoneElem.val()
        };

        $.post('/api/contacts', newContact, res => {
            addContact(res);
        }, 'json').fail(() => {
            alert('failed to add contact');
        });


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


    $.get('/api/contacts', loadedContacts => {
        loadedContacts.forEach(contact => addContact(contact));
    });
}());


