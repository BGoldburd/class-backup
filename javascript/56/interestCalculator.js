let interestCalculator = (function () {
    'use strict';

    let rate;
    let years;

    return {
        setRate: function (r) {
            rate = r;
            return this;
        },
        setYears: function (y) {
            years = y;
            return this;
        },
        calculateInterest: function (principle) {
            for (let i = 0; i < years; i++) {
                principle += (principle * (rate / 100));
            }

            return principle;
        }
    };

    // console.log('hello');
}());

interestCalculator.setRate(10);
interestCalculator.setYears(2);
console.log(interestCalculator.calculateInterest(100));

console.log(interestCalculator.setRate(10).setYears(2).calculateInterest(100));
