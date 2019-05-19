/*let die = false;
let i = 0;

setTimeout(() => die = true, 2000);

while (!die) {
    console.log(i++);
}*/

let interval;
let i = 0;

setTimeout(() => clearInterval(interval), 2000);

interval = setInterval(() => console.log(i++), 0);