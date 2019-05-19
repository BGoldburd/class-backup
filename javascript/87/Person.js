function Person(name, email) {
    this.name = name;
    this.email = email;
}

Person.prototype.print = function () {
    console.log(`name: ${this.name} email: ${this.email}`);
};

module.exports = Person;