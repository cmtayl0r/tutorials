'use strict';
/////////////////////////////////////////////////////////
// 33 - Functions
/////////////////////////////////////////////////////////
/*
function logger() {
    console.log('My name is Chris');
}

// calling / running / invoking the function
logger();

function fruitBlender(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples 🍏 and ${oranges} oranges 🍊`;
    return juice;
}

// Capture value from function into a variable
const fruitJuice = fruitBlender(3, 5);
console.log(fruitJuice);
*/

/////////////////////////////////////////////////////////
// 34 - Function Declarations vs. Expressions
/////////////////////////////////////////////////////////
/*
// Function declaration
function calcAge(birthYear) {
    return 2037 - birthYear;
}

const age = calcAge(1980);
console.log(age);

// Function expression
// expression produce values
// an anonymous function
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
};
const age2 = calcAge2(1989);
console.log(age2);
*/

/////////////////////////////////////////////////////////
// 35 - Arrow Functions
/////////////////////////////////////////////////////////
/*
// simple
const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1999);
console.log(age3);

// with code block (parentheses)
const yearsTillRetirement = (birthYear) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    return retirement;
};

// Multiple parameters AND code block
const yearsTillRetirement2 = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years 🏖️`;
};

console.log(yearsTillRetirement(1991));
console.log(yearsTillRetirement2(1999, 'Dave'));
*/

/////////////////////////////////////////////////////////
// 36 - Functions Calling Other Functions
/////////////////////////////////////////////////////////
/*
function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitBlender(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    console.log(apples, oranges);
    const juice = `Juice with ${applePieces} apple pieces 🍏 and ${orangePieces} orange pieces 🍊`;
    return juice;
}

console.log(fruitBlender(3, 1));
*/
/*
const calcAge = function (birthYear) {
    return 2037 - birthYear;
};

const yearsTillRetirement = function (birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;
    
    if (retirement > 0) {
        return retirement;
    } else {
        return -1;
    }
};

console.log(yearsTillRetirement(1970, 'Chris'));
*/

/////////////////////////////////////////////////////////
// 39 - Introduction to Arrays
/////////////////////////////////////////////////////////

/*
// An Array is a container data structure
// Literal syntax
// Array if declared const, can always be changed or mutated
const theBeatles = ['George', 'Paul', 'John', 'Ringo'];

console.log(theBeatles[1]); // Paul
console.log(theBeatles.length); // Specifies amount of elements in array (4)
console.log(theBeatles[theBeatles.length - 1]); // Shows last element in an array (Ringo)
theBeatles[2] = 'Eric'; // change element 3
console.log(theBeatles); // George, Paul, Eric, Ringo

const calcAge = function (birthYear) {
    return 2037 - birthYear;
};
const years = [1980, 1991, 1972, 1989, 2002, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[2]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [
    calcAge(years[0]),
    calcAge(years[2]),
    calcAge(years[years.length - 1]),
];
console.log(ages);
*/

/////////////////////////////////////////////////////////
// 40 - Basic array operations/methods
/////////////////////////////////////////////////////////

/*
const theBeatles = ['George', 'Paul', 'John', 'Ringo'];

// methods are basically functions, that you can also pass arguments into
// push method - add elements onto the end of an array
theBeatles.push('Chris');
// unshift method - add elements to the beginning of an array
theBeatles.unshift('Noel');
// pop method - remove last element
theBeatles.pop(); // removes the last element
const popped = theBeatles.pop(); // pop can return the value it removed
console.log(popped); // Ringo
// shift method - remove first element
theBeatles.shift();


// indexOf method - where a specific element is within the array
console.log(theBeatles.indexOf('John')); // 2
console.log(theBeatles.indexOf('Steve')); // -1, doesn't exist
// includes method - new in ES6, where a specific element is within the array
console.log(theBeatles.includes('John')); // true
console.log(theBeatles.includes('Steve')); // false

console.log(theBeatles);
*/

/////////////////////////////////////////////////////////
// 42 - Introduction to Objects
/////////////////////////////////////////////////////////

/*
const chris = {
    firstName: 'Chris',
    lastName: 'Taylor',
    age: 42,
    job: 'Nobody',
    friends: ['Tom', 'Leeroy', 'Rob'],
};
*/

// console.log(chris.friends[2]);

/////////////////////////////////////////////////////////
// 43 - Dot vs. Bracket Notation

/*
const getToKnowMe = prompt(
    'What would you like to know? Enter firstName, lastName, age, job or  friends'
);

// prompt allows input of object properties, which when inputted, display in console
if (chris[getToKnowMe]) {
    console.log(chris[getToKnowMe]);
} else {
    console.log('Wrong request!');
}

console.log(
    `${chris.firstName} has ${chris.friends.length} friends, and his best friend is ${chris.friends[0]} 👍.`
);
*/

/////////////////////////////////////////////////////////
// 44 - Object Methods
/////////////////////////////////////////////////////////

/*
const chris = {
    firstName: 'Chris',
    lastName: 'Taylor',
    birthYear: 1980,
    age: 42,
    job: 'Nobody',
    friends: ['Tom', 'Leeroy', 'Rob'],
    hasDriverLicense: true,

    // Function attached to an object is called a method
    calcAge: function () {
        // this = the object calling this method
        return 2037 - this.birthYear;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()}-year old ${
            this.job
        } and he ${this.hasDriverLicense ? 'has' : `hasn't`} a driving license`;
    },
};

console.log(chris.calcAge());
console.log(chris.getSummary());
*/

/////////////////////////////////////////////////////////
// 46 - Iteration: The for Loop
/////////////////////////////////////////////////////////

/*
// Use let variable as it will be changed on repetition
// for loop continues running whilst condition is true
for (let rep = 1; rep <= 10; rep++) {
    console.log(`Lifting weight repetition ${rep}`);
}
*/

/////////////////////////////////////////////////////////
// 47 - Looping Arrays, Breaking and Continuing
/////////////////////////////////////////////////////////

/*
const chris = [
    'Chris',
    'Taylor',
    42,
    2037 - 42,
    'Nobody',
    ['Tom', 'Leeroy', 'Rob'],
];

// empty array to populate
const types = [];

// i is 0 as that is the start of the array index
for (let i = 0; i < chris.length; i++) {
    // reading from chris array
    console.log(chris[i], typeof chris[i]);

    // Add typeof values of chris array, to types array
    // Use push array method
    types.push(typeof chris[i]);
}

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
    // Use push method to add values to empty ages array
    // calculation is 2037 - each value of years starting at 0
    ages.push(2037 - years[i]);
}
console.log(ages);

for (let i = 0; i < chris.length; i++) {
    // if type of array values not a string, continue
    if (typeof chris[i] !== 'string') continue;
    // display the, only the strings in the array
    console.log(chris[i], typeof chris[i]);
}
*/

/////////////////////////////////////////////////////////
// 48 - Looping Backwards and Loops in Loops
/////////////////////////////////////////////////////////

/*
const chris = [
    'Chris',
    'Taylor',
    42,
    2037 - 42,
    'Nobody',
    ['Tom', 'Leeroy', 'Rob'],
];

// initialise variable (i) is the end of the array
// Condition is to loop until 0
// the iterator is to increment down
for (let i = chris.length - 1; i >= 0; i--) {
    console.log(i, typeof chris[i]);
}
*/

/////////////////////////////////////////////////////////
// 49 - The while Loop
/////////////////////////////////////////////////////////

/*
// you specify the
let rep = 1;
// while loop only specifies a condition
while (rep <= 10) {
    console.log(`lifting weights repetition ${rep} `);
    rep++;
}
*/

/*
// Math.trunc rounds up decimal points
// Math.random generates a number between 0 and 1 (including many after decimal digits)
// * 6 + 1 = number between 1 and 6
let dice = Math.trunc(Math.random() * 6) + 1;

// loop until a dice generates a 6
while (dice !== 6) {
    console.log(`You rolled a ${dice}`);
    // define dice number again on every loop
    // to avoid "infinite loop"
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) {
        console.log(`Congrats bro, you rolled a winning ${dice}`);
    }
}
*/
