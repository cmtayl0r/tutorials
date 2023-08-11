/////////////////////////////////////////////////////////
// CHALLENGE 1
/////////////////////////////////////////////////////////

const markWeight1 = 78;
const markHeight1 = 1.69;
const johnWeight1 = 92;
const johnHeight1 = 1.95;

const bmiMark = markWeight1 / markHeight1 ** 2;
const bmiJohn = johnWeight1 / johnHeight1 ** 2;
const markHigherBMI = bmiMark > bmiJohn;

// console.log(bmiMark, bmiJohn, markHigherBMI);

/////////////////////////////////////////////////////////
// CHALLENGE 2
/////////////////////////////////////////////////////////

/*
if (markHigherBMI) {
    console.log(
        `👨🏻‍🦱 Mark's BMI (${bmiMark.toFixed(
            1
        )}) is higher than 👨‍🦰 John's (${bmiJohn.toFixed(1)})!`
    );
} else {
    console.log(
        `👨‍🦰 John's BMI (${bmiJohn.toFixed(
            1
        )}) is higher than 👨🏻‍🦱 Mark's (${bmiMark.toFixed(1)})!`
    );
}
*/

/////////////////////////////////////////////////////////
// CHALLENGE 3
/////////////////////////////////////////////////////////

// Logical operators
// if else statements

// You need () around adding so they are executed first before the division (higher precedence)
/*
const avgDolphins = (97 + 112 + 101) / 3;
const avgKoalas = (109 + 95 + 106) / 3;

if (avgDolphins > avgKoalas && avgDolphins > 100) {
    console.log('🐬 Dolphins win! 🏆');
    console.log(avgDolphins.toFixed(2));
} else if (avgDolphins < avgKoalas && avgKoalas > 100) {
    console.log('🐨 Koalas win! 🏆');
    console.log(avgKoalas.toFixed(2));
} else if (
    avgDolphins === avgKoalas &&
    avgDolphins >= 100 &&
    avgKoalas >= 100
) {
    // Scores the same
    // AND both scores are above 100
    console.log('😗 Its a draw folks!');
    console.log(avgDolphins.toFixed(2));
    console.log(avgKoalas.toFixed(2));
} else {
    console.log('No one wins without 💯!');
    console.log(avgDolphins.toFixed(2));
    console.log(avgKoalas.toFixed(2));
}
*/

/////////////////////////////////////////////////////////
// CHALLENGE 4
/////////////////////////////////////////////////////////

// Ternary operator
// Logical operators

// set bill value
const bill = 275;

// if between 50 and 300 tip 15%
// else tip 20%
// 20% tip is bill * (20/100) = 0.2
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(tip);

// template literal output
// bill + tip
console.log(
    `Your bill was €${bill}, the tip was €${tip}, and the total value is €${
        bill + tip
    }`
);
