/*global $*/
(function () {
    'use strict';

    $('#theButton').click(function (event) {
        console.log('The button was clicked!', event);
    });

    $('#theButton').click(event => {
        console.log('The button was clicked!', event);
    });

    $('#theButton').click(() => {
        console.log('The button was clicked!', event);
    });

    $('#theButton').click((x, y) => {
        console.log('The button was clicked!', x, y);
    });

    const squared = x => x * x;
    console.log(squared(2));

    const squared2 = x => { return x * x; };
    console.log(squared2(2));

    const add = (x, y) => x + y;
    console.log(add(2, 3));

    const getPerson = name => ({ name: name });
    const getPerson2 = name => { return { name: name }; };
    console.log(getPerson('Donald'));
    console.log(getPerson2('Hillary'));

    function createPerson(name) {
        return {
            name: name,
            age: 0,
            live: function () {
                /*const that = this;

                setInterval(function () {
                    //this.age++;
                    //console.log('name:', this.name, 'age:', this.age);
                    that.age++;
                    console.log('name:', that.name, 'age:', that.age);
                }, 1000);*/

                setInterval(() => {
                    this.age++;
                    console.log('name:', this.name, 'age:', this.age);
                }, 1000);
            }
        };
    }

    const donald = createPerson('Donald');
    donald.live();
}());