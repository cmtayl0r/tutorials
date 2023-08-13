'use strict';

/////////////////////////////////////////////////////////
// CHALLENGE 1
/////////////////////////////////////////////////////////
/*
// Create average calculation function
const calcAverage = (a, b, c) => (a + b + c) / 3;

// Create average variables for the data set 1, using first function
let scoreDolphins = calcAverage(85, 57, 41).toFixed(1);
let scoreKoalas = calcAverage(23, 34, 27).toFixed(1);

// Second function to check and compare averages
// Winner needs to have at least 2x the average vs the other team
const checkWinner = function (avgDolphins, avgKoalas) {
    if (avgDolphins >= 2 * avgKoalas) {
        return `🐬 Dolphins Win 🏆 (${avgDolphins} vs ${avgKoalas})`;
    } else if (avgKoalas >= 2 * avgDolphins) {
        return `🐨 Koalas Win 🏆 (${avgKoalas} vs ${avgDolphins})`;
    } else {
        return `No one wins! 😭 (${avgDolphins} vs ${avgKoalas})`;
    }
};

// Pass the average variables into the other function
console.log(checkWinner(scoreDolphins, scoreKoalas));
*/

/////////////////////////////////////////////////////////
// CHALLENGE 2
/////////////////////////////////////////////////////////

/*
// Tip calculation function
// Tip 15% of the bill if the bill value is between 50 and 300
// and if the value is different, the tip is 20%.
const calcTip = function (bill) {
    return bill >= 50 && bill <= 300 ? bill * (15 / 100) : bill * (20 / 100);
};

// Bill array
const bills = [125, 555, 44];

// Tips array
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

// Totals array
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(totals);
*/

/////////////////////////////////////////////////////////
// CHALLENGE 3
/////////////////////////////////////////////////////////

/*
const mark = {
    fullName: 'Mark Miller',
    height: 1.69,
    weight: 78,
    calcBMI: function () {
        this.bmi = this.weight / this.height ** 2;
        return this.bmi;
    },
};

const john = {
    fullName: 'John Smith',
    height: 1.95,
    weight: 92,
    calcBMI: function () {
        this.bmi = this.weight / this.height ** 2;
        return this.bmi;
    },
};

mark.calcBMI();
john.calcBMI();
console.log(mark.bmi, john.bmi);

if (mark.bmi > john.bmi) {
    console.log(
        `Mark's BMI (${mark.bmi.toFixed(
            1
        )}) is higher than John's BMI (${john.bmi.toFixed(1)}).`
    );
} else if (john.bmi > mark.bmi) {
    console.log(
        `John's BMI (${john.bmi.toFixed(
            1
        )}) is higher than Mark's BMI (${mark.bmi.toFixed(1)}).`
    );
} else {
    console.log('You are both fat bro 😩');
}
*/

/////////////////////////////////////////////////////////
// CHALLENGE 4
/////////////////////////////////////////////////////////

// Array with initial data values
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

// Empty arrays to populate
const tips = [];
const totals = [];

// calculation function
const calcTip = function (bill) {
    return bill >= 50 && bill <= 300 ? bill * (15 / 100) : bill * (20 / 100);
};

for (let i = 0; i < bills.length; i++) {
    // create tip variable for every value with current position [i]
    const tip = calcTip(bills[i]);
    // push tip value into new array
    tips.push(tip);

    // add tips and bills array values into totals array
    totals.push(tip + bills[i]);
}

const calcAvg = function (arr) {
    // start sum variable at 0
    let sum = 0;
    // loop over each value of an array
    for (let i = 0; i < arr.length; i++) {
        // add array value to sum variable
        sum += arr[i];
    }
    // return average value (sum total / array # of value)
    return sum / arr.length;
};

console.log(calcAvg(totals));
console.log(calcAvg(tips));

console.log(tips);
console.log(totals);
