(function () {
    'use strict';

    let contacts = [];
    let addContactForm = get('addContactForm');

    function get(id) {
        return document.getElementById(id);
    }

    function setCss(elem, property, value) {
        elem.style[property] = value;
    }

    get('addContact').addEventListener('click', function () {
        setCss(addContactForm, 'display', 'inline-block');
    });

    function addContact(newContact) {
        let theTable = get('contactsTable');

        if (!contacts.length) {
            theTable.deleteRow(1);
        }

        contacts.push(newContact);

        let row = theTable.insertRow();
        let firstNameCell = row.insertCell();
        let lastNameCell = row.insertCell();
        let emailCell = row.insertCell();
        let phoneCell = row.insertCell();

        firstNameCell.innerHTML = newContact.firstName;
        lastNameCell.innerHTML = newContact.lastName;
        emailCell.innerHTML = newContact.email;
        phoneCell.innerHTML = newContact.phone;
    }

    let firstNameElem = get('first');
    let lastNameElem = get('last');
    let emailElem = get('email');
    let phoneElem = get('phone');

    get('addContactForm').addEventListener('submit', function (event) {
        let newContact = {
            firstName: firstNameElem.value,
            lastName: lastNameElem.value,
            email: emailElem.value,
            phone: phoneElem.value
        };
        addContact(newContact);

        hideAddContactForm();

        event.preventDefault();
    });

    get('cancel').addEventListener('click', function () {
        hideAddContactForm();
    });

    function hideAddContactForm() {
        setCss(addContactForm, 'display', 'none');
        /*firstNameElem.value = '';
        lastNameElem.value = '';
        emailElem.value = '';
        phoneElem.value = '';*/
        addContactForm.reset();
    }
}());


