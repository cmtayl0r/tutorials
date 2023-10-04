'use strict';

/////////////////////////////////////////////////
// CHALLENGE 1
/////////////////////////////////////////////////
/*
const julia1 = [3, 5, 2, 12, 7];
const kate1 = [4, 1, 15, 8, 3];
const julia2 = [9, 16, 6, 8, 3];
const kate2 = [10, 5, 6, 1, 4];

const checkDogs = function (arrJulia, arrKate) {
    // create shallow copy use slice
    const newJulia = arrJulia.slice();
    // remove first and last 2 values of julia array
    newJulia.splice(0, 1);
    newJulia.splice(-2);
    // const arrJuliaNew = arrJulia.slice(1, -1);

    // A - combine both arrays
    // Using array method (concat)
    // const arrAllDogs = newJulia.concat(arrKate);
    // B - combine both arrays
    // Using Spread operator
    const dogs = [...newJulia, ...arrKate];

    // loop over array
    // if <=2 puppy, else Adult for each dog
    dogs.forEach(function (age, i) {
        if (age <= 2) {
            console.log(
                `Dog number ${
                    i + 1
                } is still a Puppy 🐶, and is ${age} years old`
            );
        } else {
            console.log(
                `Dog number ${i + 1} is as Adult 🦮, and is ${age} years old`
            );
        }
    });
};

checkDogs(julia1, kate1);
checkDogs(julia2, kate2);
*/

/*
// OUTPUT
Dog number 1 is as Adult 🦮, and is 5 years old
challenges.js:22 Dog number 2 is still a Puppy 🐶, and is 2 years old
challenges.js:28 Dog number 3 is as Adult 🦮, and is 12 years old
challenges.js:28 Dog number 4 is as Adult 🦮, and is 4 years old
challenges.js:22 Dog number 5 is still a Puppy 🐶, and is 1 years old
challenges.js:28 Dog number 6 is as Adult 🦮, and is 15 years old
challenges.js:28 Dog number 7 is as Adult 🦮, and is 8 years old
challenges.js:28 Dog number 8 is as Adult 🦮, and is 3 years old
*/

/////////////////////////////////////////////////
// CHALLENGE 2
/////////////////////////////////////////////////

const dogAges1 = [5, 2, 4, 1, 15, 8, 3];
const dogAges2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAvgHumanAge = function (ages) {
//     // Create new array based on input array
//     // Calculate human ages from array values
//     const humanAges = ages.map(dogAge =>
//         dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
//     );
//     // Filter ages for above 18 only, populate new array
//     const adults = humanAges.filter(age => age >= 18);
//     // Add all adult ages together using reduce method
//     // Calculate average by average / adults array length
//     const average = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//     // Return output
//     console.log(adults);
//     return `The human average age is ${average.toFixed(0)}`;
// };

/////////////////////////////////////////////////
// CHALLENGE 3
/////////////////////////////////////////////////

/*
const calcAvgHumanAge = ages =>
    ages
        .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
        .filter(age => age >= 18)
        .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAvgHumanAge(dogAges1));
console.log(calcAvgHumanAge(dogAges2));

const calcHumanAge = ages =>
    ages.map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4));

console.log(calcHumanAge(dogAges1));
// [36, 4, 32, 2, 76, 48, 28]

const arrAges = [5, 2, 4, 1, 15, 8, 3];

const avgAge = ages =>
    ages.reduce((acc, age, i, arr) => acc + age / arr.length, 0).toFixed(1);

console.log(avgAge(arrAges)); // 5.4
*/
