'use strict';

function printPerson() {
    console.log('Name:', this.name);
}

let donald = {
    name: 'Donald',
    /*print: function () {
        console.log('Name:', this.name);
    }*/
    print: printPerson
};

donald.print();
//printPerson();

let jared = {
    name: 'Jared',
    /*print: function () {
        console.log('Name:', this.name);
    }*/
    print: printPerson
};

jared.print();

let thePrintFromDonald = donald.print;
//thePrintFromDonald();

printPerson.call(donald);
thePrintFromDonald.call(jared);
donald.print.call(jared);
donald.print.apply(jared);

/////////////////////////

let greeter1 = {
    greeting: 'Hello'
};

let greeter2 = {
    greeting: 'Shalom'
}

function greet(name, age/*, anotherArg*/) {
    console.log(this.greeting, name, age/*, anotherArg*/);
}

greet.call(greeter1, 'The Donald', 73);
greet.apply(greeter2, ['Jared', 21]);

let theThing = {
    greeting: 'I am the thing. Glad to meet you',
    beGreeted: function () {
        greet.call(this, 'Joe', 55);
        //greet('Joe', 55);
    }
    //beGreeted: greet
};

theThing.beGreeted();
//theThing.beGreeted('Joe', 55);

let sayShalom = greet.bind(greeter2);
sayShalom('Ivanka', 21);

let sayShalomToIvanka = greet.bind(greeter2, 'Ivanka', 21);
//sayShalomToIvanka('Im the third arg!');