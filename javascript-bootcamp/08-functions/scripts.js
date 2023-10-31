'use strict';

// CHALLENGE 1 -- PASSWORD VALIDATION

const isValidPassword = function (password, username) {
    if (
        password.length >= 8 &&
        !password.includes(' ') &&
        !password.includes(username)
    ) {
        return true;
    } else {
        return false;
    }
};

const isValidPassword = (password, username) =>
    password.length >= 8 &&
    !password.includes(' ') &&
    !password.includes(username)
        ? true
        : false;

console.log(isValidPassword('89Fjjimns', 'dave'));
console.log(isValidPassword('89Fjji', 'dave'));
console.log(isValidPassword('89Fjji mns', 'dave'));
console.log(isValidPassword('9Fjjimnsdave', 'dave'));
