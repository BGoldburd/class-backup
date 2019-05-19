(function () {
    'use strict';

    function Vehicle(color) {
        this.color = color;
    }

    Vehicle.prototype.go = function (speed) {
        this.speed = speed;
        console.log(`Now going at ${this.speed}`);
    };

    Vehicle.prototype.print = function () {
        console.log(`color: ${this.color} speed: ${this.speed}`);
    };

    const v1 = new Vehicle('green');
    v1.go(55);
    v1.print();

    function Plane(color) {
        this.color = color;
    }

    Plane.prototype = Object.create(Vehicle.prototype);
    Plane.prototype.constructor = Plane;

    Plane.prototype.go = function (speed) {
        this.speed = speed;
        console.log(`Now FLYING at ${this.speed}`);
    };

    const p1 = new Plane('red');
    p1.go(600);
    p1.print();

    class Vehicle2 {
        constructor(color) {
            this.color = color;
        }

        go(speed) {
            this.speed = speed;
            console.log(`Now going ${this.speed}`);
        }

        print() {
            console.log(`color: ${this.color} speed: ${this.speed}`);
        }
    }

    const v2 = new Vehicle2('green');
    v2.go(55);
    v2.print();

    class Plane2 extends Vehicle2 {
        go(speed) {
            this.speed = speed;
            console.log(`Now FLYING at ${this.speed}`);
        }

        get speed() {
            return this._speed;
        }

        set speed(speed) {
            if (speed < 0 || speed > 1000) {
                throw new Error('Illegal speed');
            }
            this._speed = speed;
        }
    }

    const p2 = new Plane2('red');
    p2.go(600);
    p2.print();


    const vehiclePrototype = {
        go: function (speed) {
            this.speed = speed;
            console.log(`Now going at ${this.speed}`);
        },
        print: function () {
            console.log(`color: ${this.color} speed: ${this.speed}`);
        }
    };

    function createVehicle(color) {
        const createdVehicle = Object.create(vehiclePrototype);
        createdVehicle.color = color;
        return createdVehicle;
        /*return {
            color: color,
            go: function (speed) {
                this.speed = speed;
                console.log(`Now going at ${this.speed}`);
            },
            print: function () {
                console.log(`color: ${this.color} speed: ${this.speed}`);
            }
        };*/
    }

    const v3 = createVehicle('green');
    v3.go(55);
    v3.print();

    const base = {
        a: 1,
        b: 2,
        print: function () { }
    };

    const derived = Object.create(base);
    derived.c = 3;
    derived.d = 4;

    for (let property in base) {
        if (base.hasOwnProperty(property) && typeof base[property] !== 'function') {
            console.log(`property: ${property} value: ${base[property]}`);
        }
    }

    for (let property in derived) {
        if (derived.hasOwnProperty(property) && typeof derived[property] !== 'function') {
            console.log(`property: ${property} value: ${derived[property]}`);
        }
    }

    let keys = Object.keys(base);
    keys.forEach(key => {
        console.log(`key: ${key} value: ${base[key]}`);
    });

    keys = Object.keys(derived);
    keys.forEach(key => {
        console.log(`key: ${key} value: ${derived[key]}`);
    });

    Object.entries(derived).forEach(keyValue => {
        console.log(`key: ${keyValue[0]} value: ${keyValue[1]}`);
    });

    Object.entries(derived).forEach(keyValue => {
        console.log(`key: ${keyValue[0]} value: ${keyValue[1]}`);
    });

    for (const [key, value] of Object.entries(derived)) {
        console.log(`${key} ${value}`);
    }
}());