function greeter(person) {
    return `Hello ${person}`;
}

const user = 'Donald Trump';

document.body.innerHTML = greeter(user);