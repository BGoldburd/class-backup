let potus = {
    firstName: 'Donald',
    lastName: 'Trump',
    age: 72
};

console.log(potus);
console.log(potus.firstName);

function printPerson(person) {
    console.log('First', person.firstName);
    console.log('Last:', person.lastName);
    console.log('Age:', person.age);
}

printPerson(potus);

///////////////

let flotus = {
    firstName: 'Melania',
    lastName: 'Trump',
    age: 50,
    print: function () {
        console.log('First', this.firstName);
        console.log('Last:', this.lastName);
        console.log('Age:', this.age);
    }
};

flotus.print();

//////////////////////////////

/*public class Person {
    private String firstName;
    private String lastName;
    private int age;

    public void print() {
        System.out.println("First: " + this.firstName);
        System.out.println("LastName: " + this.lastName);
        System.out.println("Age: " + this.age);
    }
}*/

function createPerson(firstName, lastName, age) {
    return {
        firstName: firstName,
        lastName: lastName,
        age: age,
        print: function () {
            console.log('First', this.firstName);
            console.log('Last:', this.lastName);
            console.log('Age:', this.age);
        }
    };
}

let jared = createPerson('Jared', 'Kushner', 21);
jared.print();

let ivanka = createPerson('Ivanka', 'Kushner', 21);
ivanka.print();