let person = {
    name: "Donald Trump",
    position: "President"
};

let personString = '{"name": "Jared", "position": "Assistant", "children": ["Moshe", "Chaim"]}';

let personFromString = JSON.parse(personString);
let backAsString = JSON.stringify(personFromString);

console.log(person, typeof person);
console.log(personString, typeof personString);
console.log(personFromString, typeof personFromString);
console.log(backAsString, typeof backAsString);