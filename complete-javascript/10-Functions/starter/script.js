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
// 130 - First class and higher order functions``