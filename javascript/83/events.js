let numbers = [1, 2, 3, 4, 5, 6];

numbers.filter(n => n % 2 === 0)
    .map(n => `number ${n}`)
    .forEach(n => console.log(n));

//numbers = rxjs.from([1, 2, 3, 4, 5, 6])
/*numbers.filter(n => n % 2 === 0)
    .map(n => `number ${n}`)
    .forEach(n => console.log(n));*/

numbers = rxjs.interval(250)
    .pipe(
        rxjs.operators.take(7),
        rxjs.operators.filter(n => n % 2 === 0),
        rxjs.operators.map(n => `number ${n}`),
    ).forEach(n => console.log(n));

//let i = 0;
//setInterval(() => console.log(i++), 100);

const button = document.getElementById('theButton');
let clicks = 0;
const handler = e => {
    console.log(e.timeStamp);
    if (++clicks === 3) {
        button.removeEventListener('click', handler);
    }
};
button.addEventListener('click', handler);

/*const source = rxjs.fromEvent(document.getElementById('theButton2'), 'click')
    .pipe(
        rxjs.operators.take(3),
        rxjs.operators.filter(n => n.timeStamp < 4000),
        rxjs.operators.map(n => `clicked at ${n.timeStamp}`),
    ).forEach(n => console.log(n));*/

try {
    const subscription = rxjs.fromEvent(document.getElementById('theButton2'), 'click')
        .pipe(
            rxjs.operators.take(3),
            rxjs.operators.filter(n => n.timeStamp < 8000),
            rxjs.operators.map(n => {
                throw new Error('OOPS');
                return `clicked at ${n.timeStamp}`;
            }),
        ).subscribe(x => {
            console.log(x);
        },
            err => console.error('in subscription got: ', err));
} catch (e) {
    console.error('Outer catch caught: ', e);
}

button.addEventListener('click', () => {
    subscription.unsubscribe();
});

