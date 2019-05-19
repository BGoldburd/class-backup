/*jslint node:true*/
'use strict';

var mongoose = require('mongoose');

var contactListSchema = new mongoose.Schema({
    name: String,
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'contact'}]
});

contactListSchema.methods.print = function () {
    console.log(this.name);
    this.contacts.forEach(function (contact) {
        if (contact.print) {
            contact.print();
        } else {
            console.log(contact);
        }
    });
};

module.exports = mongoose.model('contactList', contactListSchema);