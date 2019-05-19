interface Person {
    firstName: string;
    lastName: string;
    print();
    socialSecurityNumber?: string;
}

function greeter(person: Person) {
    return `Hello ${person.firstName} ${person.lastName}`;
}

const user: Person = {
    firstName: 'Donald',
    lastName: 'Trump',
    // xLastName: 'Clinton',
    // socialSecurityNumber: '123456789',
    print() { console.log(`first: ${this.firstName} last: ${this.lastName}`); }
};
user.print();

class Student implements Person {
    /*public firstName: string;
    lastName: string;
    grade: number;
    private email: string;*/

    constructor(public firstName: string, public lastName: string, public grade: number, private email: string) {
        /*this.firstName = firstName;
        this.lastName = lastName;
        this.grade = grade;
        this.email = email;*/
    }

    print() {
        console.log(`first: ${this.firstName} last: ${this.lastName} grade: ${this.grade}`);
    }

    getGrade(): number {
        return this.grade;
    }
}

const student = new Student('Jared', 'Kushner', 5, 'jkushner@whitehouse.gov');
student.print();
let x: string = student.getGrade();

let y = 'hello';
y = 5;

console.log(student.firstName);
//console.log(student.email);


document.body.innerHTML = greeter(student); // user); // 5);