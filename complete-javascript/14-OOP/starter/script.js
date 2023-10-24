'use strict';

// ---------------------------------------------
// Constructor functions

// 1. New empty object {} created
// 2. function is called, this = {} empty object
// 3. {} linked to prototype
// 4. function automatically return {}

/*
// Convention: Constructor functions always start with a capital letter

// Define a constructor function for creating a "Person" object
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
// Add a method to the prototype of the "Person" object to calculate the age of a person in the year 2037.
Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
};

// Add a species property to the prototype of the "Person" object, setting it to 'Homo Sapiens'
Person.prototype.species = 'Homo Sapiens';

// Call the calcAge method on the "chris" object to print Chris's age in 2037.
// chris.calcAge();
// Call the calcAge method on the "anna" object to print Anna's age in 2037.
// anna.calcAge();
*/

// -----------------------------------------------------------------------------
// CHALLENGE 1
// -----------------------------------------------------------------------------

/*
const Car = function (make, speed) {
    this.speed = speed;
    this.make = make;
};

Car.prototype.accelerate = function () {
    // log new speed to console
    console.log(`${this.make} going ${(this.speed += 10)} km/h`);
};

Car.prototype.brake = function () {
    // decrease speed by 5
    // log new speed to console
    console.log(`${this.make} going ${(this.speed -= 5)} km/h`);
};

// console.log(Car.prototype.accelerate);

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
mercedes.accelerate();
mercedes.brake();
*/
/*
const account = {
    owner: 'Chris',
    movements: [200, 498, 3038, 306, 567],

    get latest() {
        return this.movements.slice(-1).pop();
    },
    set latest(mov) {
        this.movements.push(mov);
    },
};

console.log(account.latest); // 567
account.latest = 50;
console.log(account.movements); // [200, 498, 3038, 306, 567, 50]
*/

/*
class PersonCl {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }

    calcAge() {
        console.log(2037 - this.birthYear);
    }

    greet() {
        console.log(`Hey ${this.firstName}!`);
    }

    get age() {
        return 2037 - this.birthYear;
    }
    set fullName(name) {
        if (name.includes(' ')) this._firstName = name;
        else alert(`${name} is not a full name!`);
    }
    static hey() {
        console.log('Hey 👋');
    }
}

const chris = new PersonCl('Chris Taylor', 1980);
chris.calcAge(); // 57
chris.greet(); // Hey Chris!

console.log(chris.age); // 57
console.log(chris);
console.log(chris.hey); // undefined
console.log(PersonCl.hey()); // Hey 👋
*/

// -----------------------------------------------------------------------------
// CHALLENGE 2
// -----------------------------------------------------------------------------

class CarCl {
    constructor(make, speed) {
        this.speed = speed;
        this.make = make;
    }

    accelerate = function () {
        // log new speed to console
        console.log(`${this.make} going ${(this.speed += 10)} km/h`);
    };

    brake = function () {
        // decrease speed by 5
        // log new speed to console
        console.log(`${this.make} going ${(this.speed -= 5)} km/h`);
    };

    get speedUS() {
        return this.speed / 1.6;
    }

    set speedUS(value) {
        this.speed = value * 1.6;
    }
}

const bmw = new CarCl('BMW', 120);
const mercedes = new CarCl('Mercedes', 95);
const audi = new CarCl('Audi');

console.log(audi);

audi.speedUS = 100;

console.log(audi);

console.log(bmw.speedUS);
console.log(bmw);
