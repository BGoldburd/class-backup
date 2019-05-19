function greeter(person) {
    return "Hello " + person.firstName + " " + person.lastName;
}
var user = {
    firstName: 'Donald',
    lastName: 'Trump',
    // xLastName: 'Clinton',
    // socialSecurityNumber: '123456789',
    print: function () { console.log("first: " + this.firstName + " last: " + this.lastName); }
};
user.print();
var Student = /** @class */ (function () {
    /*public firstName: string;
    lastName: string;
    grade: number;
    private email: string;*/
    function Student(firstName, lastName, grade, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.grade = grade;
        this.email = email;
        /*this.firstName = firstName;
        this.lastName = lastName;
        this.grade = grade;
        this.email = email;*/
    }
    Student.prototype.print = function () {
        console.log("first: " + this.firstName + " last: " + this.lastName + " grade: " + this.grade);
    };
    Student.prototype.getGrade = function () {
        return this.grade;
    };
    return Student;
}());
var student = new Student('Jared', 'Kushner', 5, 'jkushner@whitehouse.gov');
student.print();
var x = student.getGrade();
var y = 'hello';
y = 5;
console.log(student.firstName);
//console.log(student.email);
document.body.innerHTML = greeter(student); // user); // 5);
