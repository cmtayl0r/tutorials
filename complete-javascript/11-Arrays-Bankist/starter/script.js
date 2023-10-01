'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data: fake API data as objects
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Good practice to pass data into a function
// Rather than having a global variable

// GENERATE TRANSACTION LIST
const displayMovements = function (movements) {
    // Empty the container to begin
    containerMovements.innerHTML = '';
    // Add HTML elements to container
    movements.forEach(function (mov, i) {
        // Ternary operator to determine if withdraw or deposit
        // Used on HTML value and class
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        // HTML content for row
        const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
            i + 1
        } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>`;
        // Insert HTML into DOM element
        // Parameter: Position, HTML string to be parsed and inserted
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};
displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

///////////////////// Lecture 145 forEach with Map and Set

// currencies.forEach(function (value, key, map) {
//     console.log(`${key}: ${value}`);
// });

// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, key, map) {
//     console.log(`${key}: ${value}`);
// });

///////////////////// Lecture 144 forEach
/*
for (const [i, movement] of movements.entries()) {
    if (movement > 0) {
        console.log(`Movement ${i}: You deposited ${movement}`);
    } else if (movement < 0) {
        // Math.abs() makes the value absolute, removing the minus symbol
        console.log(`Movement ${i}: You withdrew ${Math.abs(movement)}`);
    }
}
console.log(`------------ FOREACH ------------`);

// forEach is technically a higher order function
// Each iteration it calls the anonymous function as a callback function
// first time with the argument 200, then 450, and so on. Until the end of the array.
// Parameter order: Current element, current index, entire array
movements.forEach(function (movement, i, arr) {
    if (movement > 0) {
        console.log(`Movement ${i}: You deposited ${movement}`);
    } else if (movement < 0) {
        // Math.abs() makes the value absolute, removing the minus symbol
        console.log(`Movement ${i}: You withdrew ${Math.abs(movement)}`);
    }
});

const numbers = [1, 2, 3, 4, 5];

numbers.forEach(function (number) {
    console.log(number);
});
*/

///////////////////// Lecture 149 Data transformations: map, filter, reduce


