const events = require('events');

const eventEmitter = new events.EventEmitter();
eventEmitter.setMaxListeners(12);

eventEmitter.on('coffeeTime', () => {
    console.log('Time for some coffee');
});

eventEmitter.on('coffeeTime', () => {
    console.log('Time for some coffee');
});

eventEmitter.on('coffeeTime', () => {
    console.log('Time for some coffee');
});

eventEmitter.on('coffeeTime', () => {
    console.log('Time for some coffee');
});

eventEmitter.on('coffeeTime', () => {
    console.log('Time for some coffee');
});

eventEmitter.on('coffeeTime', () => {
    console.log('Time for some coffee');
});

eventEmitter.on('coffeeTime', () => {
    console.log('Time for some coffee');
});

eventEmitter.on('coffeeTime', () => {
    console.log('Time for some coffee');
});

eventEmitter.on('coffeeTime', () => {
    console.log('Time for some coffee');
});

eventEmitter.on('coffeeTime', () => {
    console.log('Time for some coffee');
});

eventEmitter.on('coffeeTime', () => {
    console.log('Time for some coffee');
});

eventEmitter.on('breakTime', () => {
    console.log('Time for a break (almost)');
});

eventEmitter.emit('coffeeTime');

setInterval(() => eventEmitter.emit('breakTime'), 2000);