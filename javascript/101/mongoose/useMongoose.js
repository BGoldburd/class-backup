/*jslint node:true*/
'use strict';

var mongoose = require('mongoose'),
    Contact = require('./contact'),
    ContactList = require('./contactList');

var bill = new Contact({
    name: {
        first: 'Bill',
        last: 'Clinton'
    },
    email: 'bclinton@clinton.com',
    phone: '123-456-7890',
    age: 67
});

var nameless = new Contact({
    name: {
        first: 'Bill',
        last: 'foo'
    },
    email: 'bclinton@clinton.com',
    phone: '123-456-7890',
    age: 67
});

nameless.save(function (err, result) {
    if (err) {
        console.warn(err);
    } else {
        console.log(result);
    }
});

bill.print();
bill.name.full = 'Donald Trump';
bill.print();

setTimeout(function () {
    mongoose.connect('mongodb://localhost:27017/useMongoose3');
}, 5);

mongoose.connection.on('error', function (err) {
    console.warn(err);
});

mongoose.connection.on('open', function () {
    console.log('connected');
    
    bill.save(function (err, result) {
        if (err) {
            console.warn(err);
        } else {
            /*Contact.find().exec(function (err, contacts) {
                contacts.forEach(function (contact) {
                    console.log(contact);
                });
            });*/
            var list1 = new ContactList({name: 'list #1'}),
                list2 = new ContactList({name: 'list #2'});
            list1.contacts.push(bill);
            list2.contacts.push(bill);
            
            list1.print();
            list2.print();
            
            list1.save(function (err, result) {
                if (err) {
                    console.warn(err);
                } else {
                    list2.save(function (err, result) {
                        if (err) {
                            console.warn(err);
                        } else {
                            var firstTime = true;
                            ContactList.find().populate('contacts').exec(function (err, lists) {
                                lists.forEach(function (list) {
                                    if (firstTime) {
                                        list.contacts[0].name.full = 'Bernie Sanders';
                                        firstTime = false;
                                    }
                                    list.print();
                                });
                            });
                        }
                    });
                }
            });
        }
    });
});
