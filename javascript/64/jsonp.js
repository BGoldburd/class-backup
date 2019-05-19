function foo(data) {
    console.log(typeof data, data);
}

//foo('hello');
//foo({ name: 'Donald' });

//$.getScript('data.js');
$.getJSON('data.js?callback=?', (data) => {
    console.log(data);
});
