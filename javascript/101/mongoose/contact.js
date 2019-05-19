/*jslint node:true*/
'use strict';

var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    name: {
        first: String,
        last: {type: String, required: true}
    },
    email: String,
    phone: String,
    age: Number
});

contactSchema.methods.print = function () {
    console.log(this.name.full + ' ' + this.email + ' ' + this.phone + ' ' + this.age);
};

contactSchema.virtual('name.full').get(function () {
    return this.name.first + ' ' + this.name.last;
});

contactSchema.virtual('name.full').set(function (fullName) {
    var names = fullName.split(' ');
    this.name.first = names[0];
    this.name.last = names[1];
});

var Contact = mongoose.model('contact', contactSchema);
module.exports = Contact;