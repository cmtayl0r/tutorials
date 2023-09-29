'use strict';

///////////////////////////////////////////////////////////////
// 128 - Default parameters

/*
// declare an empty array
// used to store information about flight bookings from function
const bookings = [];

// ES6 - Parameters with defaults
// Price default value is calculated based on the number of passengers you provide
// Price calculation has to be specified AFTER the other parameter used in the calculation
const createBooking = function (
    flightNum,
    numPassengers = 1,
    price = 199 * numPassengers
) {
    // ES5 old way of defaults
    // numPassengers = numPassengers || 1;
    // price = price || 199;

    // CReate an object to store the parameters
    const booking = {
        flightNum,
        numPassengers,
        price,
    };
    console.log(booking);
    // Push object into bookings array for future reference
    bookings.push(booking);
};

createBooking('LH123'); // {flightNum: 'LH123', numPassengers: 1, price: 199}
createBooking('LH123', 2); // {flightNum: 'LH123', numPassengers: 2, price: 398}
createBooking('LH123', 5); // {flightNum: 'LH123', numPassengers: 5, price: 995}

const name = 'John';
const age = 30;

const person = { name, age };

console.log(person);
*/

///////////////////////////////////////////////////////////////
// 129 - How passing arguments works

/*
const flight = 'LH1234';
const chris = {
    name: 'Christopher Taylor',
    passport: 15154613548,
};

const checkIn = function (flightNum, passenger) {
    flightNum = 'LH9993';
    passenger.name = 'Mr. ' + passenger.name;
    if (passenger.passport === 15154613548) {
        // alert('Check In');
    } else {
        // alert('Wrong Passport');
    }
};

checkIn(flight, chris);
console.log(flight);
console.log(chris);

const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(chris);
checkIn(flight, chris);
*/

///////////////////////////////////////////////////////////////
// 130 - First class and higher order functions

///////////////////////////////////////////////////////////////
// 131 - Functions accepting callback functions

/*
const oneWord = function (str) {
    // remove space + turn lowercase
    return str.replace(/ /g, '').toLowerCase();
};

const firstCapital = function (str) {
    const lower = str.toLowerCase();
    const firstLetter = lower[0].toUpperCase() + lower.slice(1);
    return firstLetter;
};

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};

// higher order function
// takes 2 arguments: string + callback function
const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
    console.log(`Transformed by: ${fn.name}`);
};

// Callback functions called by Higher order function
transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);
transformer('fewfe wefjo fewfo', firstCapital);

// Original string: Javascript is the best!
// Transformed string: JAVASCRIPT is the best!
// Transformed by: upperFirstWord

// Original string: Javascript is the best!
// Transformed string: javascriptisthebest!
// Transformed by: oneWord

const highFive = function () {
    console.log('👋');
};
// Callback functions (event) called by Higher order function
document.body.addEventListener('click', highFive);

['Chris', 'Anna', 'Hazel'].forEach(highFive);

// JS uses callback functions all the time
// 1 - Easy to split up into inter connected parts
// 2 - Callback functions allow us to create abstraction
*/

///////////////////////////////////////////////////////////////
// 132 - Functions returning functions

/*
const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    };
};

const greeter = greet('Hello');

greeter('Chris'); // Hello Chris
greeter('Hazel'); // Hello Hazel
greet('Yo!')('Anna'); // Yo! Anna

const zeet = zeeting => name => console.log(`${zeeting} ${name}`);

zeet('Wassup!')('Jana');
*/

///////////////////////////////////////////////////////////////
// 133 - The call and apply methods

/*
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(
            `${name}: Booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}.`
        );
        // Push resulting object to array
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
};

lufthansa.book(236, 'Chris Taylor'); // Chris Taylor: Booked a seat on Lufthansa flight LH236.
lufthansa.book(526, 'Hazel Taylor'); // Hazel Taylor: Booked a seat on Lufthansa flight LH526.

// Connect Object method within an object to a variable that can be reused with other objects
const book = lufthansa.book;

const euroWings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
    book,
};

// Call method
// Set 'this' keyword to any function, then the original arguments
book.call(euroWings, 984, 'Anna Lohmann');

const swiss = {
    airline: 'Swiss Airlines',
    iataCode: 'LX',
    bookings: [],
    book,
};

book.call(swiss, 938, 'Jana Lohmann');

// Spread out the arguments of an array using the spread operator
const flightData = [635, 'George Cooper'];
book.call(swiss, ...flightData);

console.log(lufthansa);
console.log(euroWings);
console.log(swiss);
*/

///////////////////////////////////////////////////////////////
// 134 - The bind method

/*
const bookEW = book.bind(euroWings);
const bookLX = book.bind(swiss);
const bookLH = book.bind(lufthansa);

bookEW(23, 'Dave Jones');
bookLH(7346, 'Janie Jones');
bookLX(748, 'Harvey Jones');

const bookEW23 = book.bind(euroWings, 23);
bookEW23('Chris Taylor');

// With event listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
};

document
    .querySelector('.buy')
    .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application

// General function for adding Tax
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(1938));


const chrisTax = function (rate) {
    return function (value) {
        const calc = value + value * rate;
        console.log(`VAT Rate: ${rate} from ${value}, equals: ${calc}`);
    };
};

const chrisVAT = chrisTax(0.23);

chrisVAT(1000);

*/

///////////////////////////////////////////////////////////////
// 136 - IIFE

/*
// A function that is executed one and never again
// Dissapears after its called (useful with AsyncAwait)

// Trick javascript into thinking this function is an expression
// Wrap it in ()
// Immediately call it with a separate ()
(function () {
    console.log('This will never run again 🥳');
})();
*/

///////////////////////////////////////////////////////////////
// 137 - Closures

const secureBooking = function () {
    let passengerCount = 0;
    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};

const booker = secureBooking();

booker();

///////////////////////////////////////////////////////////////
// 138 - Closures

////// Example 1

let switchFn;

const firstFn = function () {
    // sets a variable
    const a = 23;
    // assigns firstFn function to switchFn
    switchFn = function () {
        console.log(a * 2);
    };
};

const secondFn = function () {
    // sets a variable
    const b = 777;
    // assigns secondFn function to switchFn
    switchFn = function () {
        console.log(b * 2);
    };
};

firstFn(); // firstFn executed first time, completes execution
switchFn(); // switchFn executed, Output: 46
console.dir(switchFn); // [[Scopes]]: Scopes[3]0: Closure (g) {a: 23}
// It shows that switchFn has a closure that references the a variable from the firstFn function's scope.
// typical behavior for closures – they remember the variables from their enclosing scopes even if those scopes are no longer active.

////////// Re-assigning switchFn function

secondFn(); // secondFn executed first time, completes execution
switchFn(); // switchFn executed again, Output: 1554
console.dir(switchFn); // [[Scopes]]: Scopes[3]0: Closure (h) {b: 777}
// It shows that switchFn has a closure that references the b variable from the secondFn function's scope.

/*
In essence, switchFn acts as a sort of "switchable" function that can be dynamically reassigned to different functions. Each time it's reassigned, it "remembers" the variables from the scope in which it was last assigned, thanks to closures. This demonstrates how closures allow functions to retain access to their lexical (enclosing) scope's variables even after those scopes have completed execution.
*/

////// Example 2

const boardPassengers = function (num, wait) {
    const perGroup = num / 3;
    setTimeout(function () {
        console.log(`Will are now boarding all ${num} passengers`);
        console.log(`There are 3 groups with ${perGroup} passengers`);
    }, wait * 1000);
    console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);
