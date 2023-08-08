/////////////////////////////////////////////////////////
// LESSON 8
/////////////////////////////////////////////////////////
/*
let js = 'amazing';
console.log(48 + 10 - 12 + 45);
*/

//////////////////////////////////////////////////////////
// LESSON 9
/////////////////////////////////////////////////////////
/*
let firstName = 'Chris';
console.log(firstName);
*/

/////////////////////////////////////////////////////////
// LESSON 10 - Data Types
/////////////////////////////////////////////////////////

/*
let javascriptIsFun = true;
console.log(javascriptIsFun);

console.log(typeof true);

javascriptIsFun = 'YES!';

console.log(typeof javascriptIsFun);
console.log(javascriptIsFun);
*/

/////////////////////////////////////////////////////////
// LESSON 12 - let, const and var
/////////////////////////////////////////////////////////

/*
let age = 30;
age = 31;

const birthYear = 1981;

console.log(birthYear);
*/

/////////////////////////////////////////////////////////
// LESSON 13 - Basic Operators
/////////////////////////////////////////////////////////

/*
// Arithmetic operators
const now = 2037;
const ageChris = now - 1980;
const ageAnna = now - 1983;
console.log(ageChris, ageAnna);

console.log(ageChris * 2, ageAnna / 10, 2 ** 3);
// 2 ** 3 means 2 x 2 x 2

const firstName = 'Chris';
const lastName = 'Taylor';
console.log(firstName + ' ' + lastName);

// Assignment operators
let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x++; // x = x + 1
x--; // x = x - 1
console.log(x);

// Comparison operators
// We use comparison operators to produce boolean values

console.log(ageChris > ageAnna); // true
console.log(ageAnna >= 18); // true
const isFullAge = ageAnna >= 18;
console.log(isFullAge + 'Yay!');
*/

/////////////////////////////////////////////////////////
// LESSON 14 - Operator precedence
/////////////////////////////////////////////////////////

/*
const now = 2037;
const ageChris = now - 1980;
const ageAnna = now - 1983;

console.log(now - 1991 > now - 2018);

const averageAge = (ageChris + ageAnna) / 2;
console.log(averageAge);
*/

/////////////////////////////////////////////////////////
// LESSON 17 - Strings and template literals
/////////////////////////////////////////////////////////

/*
const firstName = 'Chris';
const job = 'Developer';
const birthYear = 1980;
const year = 2023;

// Old  way of creating a string
const chris =
    "I'm " +
    firstName +
    ', a ' +
    (year - birthYear) +
    ' years old ' +
    job +
    '!';
console.log(chris);

// new way using template literals
const chrisNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(chrisNew);
*/

/////////////////////////////////////////////////////////
// LESSON 18 - If / else statements
/////////////////////////////////////////////////////////

/*
const age = 15;
const isOldEnough = age >= 18;

if (isOldEnough) {
    console.log('Chris can start driving 🏎️');
} else {
    const yearsLeft = 18 - age;
    console.log(`No driving yet me old duck 😭. Wait for ${yearsLeft} years.`);
}

const birthYear = 1980;
let century; // declare undefined variable outside the block

if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(`You were born in the ${century}th century`);
*/

/////////////////////////////////////////////////////////
// LESSON 20 - Type conversion and Coercion
/////////////////////////////////////////////////////////

// Manual type conversion

/*
// string variable from, for example, from a form input
const inputYear = '1991';

console.log(inputYear + 18); // 199118
console.log(Number(inputYear) + 18); // convert a string number into an actual number value
console.log(Number('Jonas')); // NaN, produced on failure to create a number

console.log(String(23)); // 23, but as a string value

// Type coercion
// Whenever an operator is dealing with values of two types

console.log('I am ' + 23 + ' years old'); // Number converted into string

console.log('23' - '10' + 3); // Converted to number by - operator

console.log('23' * '2'); // converted to number by * operator

let n = '1' + 1; // 11 string because of + operator
n = n - 1; // 10 number because of - operator
console.log(n); // 10 number
*/

/////////////////////////////////////////////////////////
// LESSON 21 - Truthy and Falsey values
/////////////////////////////////////////////////////////

/*
// Falsey values = Not exactly false, but will become valse when you convert them into a Boolean
// 5 falsey values - 0, '', undefined, null, NaN

console.log(Boolean(0)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean('Chris')); // True

// When are Booleans Type coercion in Javascript:
// 1 - Logical operators
// 2 - in condition of If Else statement

const money = 0;
// Javascript always tries to convert the condition into a boolean using truthy or falsey value rules
if (money) {
    console.log(`Dont spend spend it all`);
} else {
    // 0 is a falsey value, execute this
    console.log('You should get a job');
}

let height;
if (height) {
    console.log('yeah! height is defined');
} else {
    // undefined is a falsey value, execute this
    console.log('height is undefined');
}
*/

/////////////////////////////////////////////////////////
// LESSON 22 - Equality Operators: == vs. ===
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
// LESSON 23 - Boolean logic
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
// LESSON 24 - Logical operators
/////////////////////////////////////////////////////////
