(function () {
    'use strict';

    const donald = {
        first: 'Donald',
        last: 'Trump',
        print: function () {
            console.log('first name:', this.first, 'last name:', this.last);
        }
    };

    donald.print();

    function createPerson(first, last) {
        return {
            first: first,
            last: last,
            print: function () {
                console.log('first name:', this.first, 'last name:', this.last);
            }
        };
    }

    const jared = createPerson('Jared', 'Kushner');
    jared.print();
    const ivanka = createPerson('Ivanka', 'Kushner');
    ivanka.print();

    function Person(first, last) {
        this.first = first;
        this.last = last;
        /*this.print = function () {
            console.log('first name:', this.first, 'last name:', this.last);
        };*/

        /*return {
            foo: 'bar'
        };*/
    }

    Person.prototype.print = function () {
        console.log('first name:', this.first, 'last name:', this.last);
    };

    Person.prototype.clone = function () {
        return new this.constructor(this.first, this.last);
    };

    const mike = new Person('Mike', 'Pence');
    mike.print();

    //const brett = Person('Brett', 'Kavanaugh');
    //brett.print();

    const brett = new Person('Brett', 'Kavanaugh');
    brett.print();

    //brett.__proto__.foo = 27;
    Person.prototype.foo = function () { console.log('bar'); };
    brett.foo();
    mike.foo();

    function Employee(first, last, department) {
        //this.first = first;
        //this.last = last;
        Person.call(this, first, last);
        this.department = department;
    }

    //Employee.prototype = Person.prototype;
    //Employee.prototype = new Person(); // ('not', 'useful');
    Employee.prototype = Object.create(Person.prototype);
    Employee.prototype.constructor = Employee; // fix the constructor for the 1% of cases where it matters e.g. our clone function
    Employee.prototype.print = function () {
        console.log('first name:', this.first, 'last name:', this.last, 'department:', this.department);
    };
    const lindsey = new Employee('Lindsey', 'Graham', 'Government');
    lindsey.print();
    lindsey.foo();

    const chuck = new Employee('Chuck', 'Schumer', 'Government');
    chuck.print();
    chuck.foo();

    mike.print();

    const mikeClone = mike.clone();
    const chuckClone = chuck.clone();

    mikeClone.print();
    chuckClone.print();
}());