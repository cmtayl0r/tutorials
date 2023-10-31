'use strict';

// -----------------------------------------------------------------------------
// CHALLENGE 1 -- PASSWORD VALIDATION

// const isValidPassword = function (password, username) {
//     if (
//         password.length >= 8 &&
//         !password.includes(' ') &&
//         !password.includes(username)
//     ) {
//         return true;
//     }
//     return false;
// };

// const isValidPassword = (password, username) =>
//     password.length >= 8 &&
//     !password.includes(' ') &&
//     !password.includes(username)
//         ? true
//         : false;

/*
const isValidPassword = function (pwd, user) {
    // 1. If password length less than 8
    // 2. If password contains any spaces (using `indexOf` method which returns `-1` if the specified value is not found).
    // 2. If password contains the username (using `indexOf` method which returns `-1` if the specified value is not found).
    if (pwd.length < 8 || pwd.indexOf(' ') !== -1 || pwd.indexOf(user) !== -1) {
        return false;
    }
    return true;
};

console.log(isValidPassword('89Fjjimns', 'dave'));
console.log(isValidPassword('89Fjji', 'dave'));
console.log(isValidPassword('89Fjji mns', 'dave'));
console.log(isValidPassword('9Fjjimnsdave', 'dave'));
*/

// -----------------------------------------------------------------------------
// CHALLENGE 2 -- AVERAGE NUMBER

/*
const avg = function (arr) {
    let total = 0;
    for (let num of arr) {
        total += num;
    }
    return total / arr.length;
};

console.log(avg([50, 0])); // 25
console.log(avg([75, 76, 80, 95, 100])); // 85.2
*/

// -----------------------------------------------------------------------------
// CHALLENGE 3 -- PANGRAM

const isPangram = function (str) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const sentence = str.toLowerCase();

    for (let letter of alphabet) {
        // if sentence does not include a letter from alphabet, return false
        if (!sentence.includes(letter)) {
            return false;
        }
    }
    // If we make it here, every letter was found
    return true;
};

// isPangram('The five boxing wizards jump quickly'); // true
// isPangram('The five boxing wizards jump quick'); // false
console.log(isPangram('The five boxing wizards jump quickly'));
// console.log(isPangram('The five boxing wizards jump quickl'));
