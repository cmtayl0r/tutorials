'use strict';

// ---------------------------------------------
// Constructor functions

// 1. New empty object {} created
// 2. function is called, this = {} empty object
// 3. {} linked to prototype
// 4. function automatically return {}

// Convention: Constructor functions always start with a capital letter

// Define a constructor function for creating a "Person" object.
const Person = function (firstName, birthYear) {
    this.firstName = firstName; // Set the firstName property to the provided value.
    this.birthYear = birthYear; // Set the birthYear property to the provided value.
};

// Call constructor function with the "new" operator
// Create a new instance of the "Person" object with name "Chris" and birth year 1980.
const chris = new Person('Chris', 1980);
// Create a new instance of the "Person" object with name "Anna" and birth year 1983.
const anna = new Person('Anna', 1983);

// ---------------------------------------------
// Prototypes
Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
};

Person.prototype.species = 'Homo Sapiens';

chris.calcAge();
anna.calcAge();

console.log(chris);
