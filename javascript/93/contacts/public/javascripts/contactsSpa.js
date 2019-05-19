/*global $*/
(function () {
    'use strict';

    let contacts = [];
    const contactForm = $('#contactForm');
    const addFormSubmitButton = $('#addFormSubmitButton');
    const theTableBody = $('#contactsTable tbody');
    const errorElem = $('#errors');

    $('#addContact').click(() => showContactForm());

    function showContactForm(contact) {
        if (contact) {
            firstNameElem.val(contact.firstname);
            lastNameElem.val(contact.lastname);
            emailElem.val(contact.email);
            phoneElem.val(contact.phone);
            addFormSubmitButton.text('Update');
            contactForm.data('contact', contact);
        } else {
            addFormSubmitButton.text('Add');
        }
        contactForm.slideDown(3000);
    }

    theTableBody.on('click', 'button.delete', event => {
        const rowToDelete = $(event.target).closest('tr');
        $.ajax({
            method: 'DELETE',
            url: `/api/contacts/${rowToDelete.data('contact').id}`,
            success: () => {
                errorElem.empty();
                rowToDelete.remove();
            }
        }).fail(jqXhr => {
            errorElem.text(jqXhr.responseText);
        });
    });

    theTableBody.on('click', 'button.edit', event => {
        const rowToEdit = $(event.target).closest('tr');
        showContactForm(rowToEdit.data('contact'));
    });

    function addContact(newContact) {
        if (!contacts.length) {
            theTableBody.empty();
        }

        contacts.push(newContact);
        getRow(newContact)
            .appendTo(theTableBody);
    }

    function updateContact(contact, contactInfo) {
        Object.assign(contact, contactInfo);

        const children = theTableBody.children();
        theTableBody.children().filter(i => {
            return $(children[i]).data('contact') === contact;
        }).replaceWith(
            getRow(contact));
    }

    function getRow(contact) {
        return $(`<tr>
                    <td>${contact.firstname}</td>
                    <td>${contact.lastname}</td>
                    <td>${contact.email}</td>
                    <td>${contact.phone}</td>
                    <td>
                    <button class="delete">delete</button> | <button class="edit">edit</button>
                    </td>
                </tr>`).data('contact', contact);
    }

    let firstNameElem = $('#first');
    let lastNameElem = $('#last');
    let emailElem = $('#email');
    let phoneElem = $('#phone');

    contactForm.submit(function (event) {
        let contactInfo = {
            firstname: firstNameElem.val(),
            lastname: lastNameElem.val(),
            email: emailElem.val(),
            phone: phoneElem.val()
        };

        const originalContact = contactForm.data('contact');
        if (!originalContact) {
            $.post('/api/contacts', contactInfo, res => {
                errorElem.empty();
                addContact(res);
            }, 'json').fail(jqXhr => {
                errorElem.text(jqXhr.responseText);
            });
        } else {
            $.ajax({
                method: 'PUT',
                data: contactInfo,
                url: `/api/contacts/${originalContact.id}`,
                success: () => {
                    errorElem.empty();
                    updateContact(originalContact, contactInfo);
                }
            }).fail(jqXhr => {
                errorElem.text(jqXhr.responseText);
            });
        }

        hidecontactForm();

        event.preventDefault();
    });

    $('#cancel').click(function () {
        hidecontactForm();
    });

    function hidecontactForm() {
        contactForm.removeData('contact');
        contactForm.slideUp('slow');
        contactForm[0].reset();
    }

    $.get('/api/contacts', loadedContacts => {
        loadedContacts.forEach(contact => addContact(contact));
    });
}());


