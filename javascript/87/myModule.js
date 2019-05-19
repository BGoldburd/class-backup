//var exports = module.exports = {};

function getGreeting() {
    return 'Hello';
}

//module.exports.sayHello = function () {
exports.sayHello = function () {
    console.log(getGreeting());
};
// exports.getGreeting = getGreeting;

/*module.exports = {
    //exports = {
    sayHello: function () {
        console.log('Hello');
    }
};*/