/*global app*/
let counter1 = app.counter2.createCounter();
let counter2 = app.counter2.createCounter();

for (let i = 0; i < 10; i++) {
    app.counter.increment();
}

for (let i = 0; i < 5; i++) {
    counter1.increment();
}

for (let i = 0; i < 15; i++) {
    counter2.increment();
}

console.log(app.counter.getCount(), counter1.getCount(), counter2.getCount());
console.log('There are', app.counter2.numberOfCounters(), 'counters');
