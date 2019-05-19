(function () {
    'use strict';

    /*const ba1 = {
        balance: 0
    };
    const ba2 = {
        balance: 0
    }*/

    function createAccount(openingBalance) {
        return {
            balance: openingBalance/*,
            addInterest: function (amount) {
                this.balance += amount;
            }*/
        };
    }

    function addInterest(amount) {
        this.balance += amount;

        console.log(this);
    }

    const ba1 = createAccount(0);
    const ba2 = createAccount(0);

    //ba1.addInterest(5);
    //ba2.addInterest(10);

    //addInterest(5);
    //addInterest(10);
    addInterest.call(ba1, 5);
    addInterest.apply(ba2, [10]);

    const addToBa1 = addInterest.bind(ba1);
    addToBa1(5);

    let add5ToBa1 = addInterest.bind(ba1, 5);
    add5ToBa1();

    console.log(ba1, ba2);
}());
