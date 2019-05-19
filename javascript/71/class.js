(function () {
    'use strict';

    class Person {
        constructor(first, last, age) {
            this.first = first;
            this.last = last;
            this.age = age;
        }

        print() {
            console.log('first name:', this.first, 'last name:', this.last);
        }

        get fullName() {
            return `${this.first} ${this.last}`;
        }

        get age() {
            return this._age;
        }

        set age(value) {
            if (value < 0 || value > 120) {
                throw new Error('Invalid age!');
            }
            this._age = value;
        }

        static foo() {
            console.log('Im a static function. This is - ', this);
            this.print();
        }
    }

    const p = new Person('Donald', 'Trump', 2);
    p.print();
    console.log(p.fullName);
    //Person.foo();
    //p.foo();
    //Person.foo.apply(p);
}());