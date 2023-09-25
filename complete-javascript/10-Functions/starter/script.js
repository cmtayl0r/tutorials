'use strict';

///////////////////////////////////////////////////////////////
// 128 - Default parameters

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

///////////////////////////////////////////////////////////////
// 132 - Functions returning functions

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

///////////////////////////////////////////////////////////////
// 133 - The call and apply methods

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

///////////////////////////////////////////////////////////////
// 134 - The bind method
