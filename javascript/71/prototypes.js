(function () {
    'use strict';

    //const organism = Object.create(null);
    //const organism = Object.create(Object.prototype);
    const organism = {};
    const animal = Object.create(organism);
    const mammal = Object.create(animal);
    const dog = Object.create(mammal);

    animal.hasHair = false;
    mammal.hasHair = true;

    console.log(mammal.hasHair);
    console.log(dog.hasHair);
    console.log(animal.hasHair);

    dog.speak = function () {
        console.log('Woof!');
    };

    dog.speak();
    //animal.speak();

    const spot = Object.create(dog);
    spot.name = 'Spot';
    spot.color = 'Black';
    spot.weight = 25;
    spot.breed = 'poodle';
    spot.owner = { first: 'Donald', last: 'Trump' };

    const fluffy = Object.create(spot);
    fluffy.name = 'Fluffy';
    fluffy.color = 'white';
    //fluffy.owner.first = 'Ivanka';
    fluffy.owner = { first: 'Ivanka', last: 'Trump' };
    //fluffy.thing = {nested: {anotherThing: {yetAnother: {foo: 27}}}};
}());