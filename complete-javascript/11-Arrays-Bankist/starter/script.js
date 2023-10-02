'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data: fake API data as objects
const account1 = {
    owner: 'Chris Taylor',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Anna Lohmann',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Tom Brayford',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Rob Markham',
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

// TIPS
// Good practice to pass data into a function
// Rather than having a global variable

// ⚙️ FN: GENERATE TRANSACTION LIST
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

// ⚙️ FN: ADD USER INITIALS TO OBJECTS
// 1 - Input array of account names
// 2 - Iterate through array, connect user names from corresponding object
// 3 - Convert user names to initials
// 4 - Add new value (initials) to user objects
const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase() // convert string to lower case
            .split(' ') // Split string into array values
            .map(name => name.at(0)) // iterate over array of split values using map + arrow function
            .join(''); // join the array into a string
    });
};
createUsernames(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Create a new array, of values that pass condition (= true)
const deposits = movements.filter(move => move > 0);
const withdrawals = movements.filter(move => move < 0);

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

// 150 - map method

/*
const euroToUsd = 1.1;

const movementsUSD = movements.map(value => (value * euroToUsd).toFixed(2));
console.log(movementsUSD);

const moveList = movements.map(function (mov, i) {
    return `Movement ${
        i + 1
    }: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`;
});

console.log(moveList);
*/

///////////////////// Lecture 152 filter method
