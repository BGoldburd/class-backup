import $ from 'jquery';
import './style.css';
import Snake from './snakeHead.png';
// import sayHello, { sayHello2 } from './sayHello.js';

//x = 5;
let numClicks = 0;
const theButton = $('#theButton').click(() => {
    theButton.text(`I really really was clicked ${++numClicks} times`);

    //const snakeImg = $('body').append('<img/>');
    //snakeImg.attr('src', Snake);
    const snakeImg = document.createElement('img');
    snakeImg.src = Snake;
    document.body.appendChild(snakeImg);
    //let x;
    //x.foo = 5;

    import(/* webpackChunkName: "sayHello" */ './sayHello').then(module => {
        module.default();
        module.sayHello2();
    });

});

if (module.hot) {
    module.hot.accept('./sayHello.js', () => {
        console.log('Accepting the updated sayHello module!');
        sayHello();
    });
}
