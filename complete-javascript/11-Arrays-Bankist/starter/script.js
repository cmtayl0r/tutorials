'use strict';

//////////////////////////////////////////////////////////////////////////
// 🏦 BANKIST APP
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// OBJECTS
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

//////////////////////////////////////////////////////////////////////////
// ACCOUNT REFERENCE

// account objects are stored in an array
// used to access the objects above from functions
// using an array to store account objects enhances the maintainability, flexibility, and scalability of your code
// simplifies various operations you might need to perform on the account data
const accounts = [account1, account2, account3, account4];

//////////////////////////////////////////////////////////////////////////
// HELPERS

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

// Used for conversion calculations
const euroToUsd = 1.1;

// Used for testing, not associated with an account
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//////////////////////////////////////////////////////////////////////////
// DOM ELEMENTS

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

//////////////////////////////////////////////////////////////////////////
// FUNCTIONS

// TIPS
// Good practice to pass data into a function
// Rather than having a global variable

// -----------------------------------------------------------------------------
// ⚙️ FN: GENERATE TRANSACTION LIST
// -> displays the transaction history of an account
// -> Set sorting to false as default
// -----------------------------------------------------------------------------
const displayMovements = function (movements, sort = false) {
    // Empty the container to begin
    containerMovements.innerHTML = '';

    // 1 - Set sorting
    // slice() to take a copy of the movements array to sort
    // if sort true, sort in ascending order
    // if sort false, revert to default ordering (original array)
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    // 2 - Add HTML elements to container
    movs.forEach(function (mov, i) {
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

// -----------------------------------------------------------------------------
// ⚙️ FN: CREATE GLOBAL BALANCE
// -> calculates and displays the account balance
// -----------------------------------------------------------------------------
// Reduce all array values to one number value
const calcDisplayBalance = function (acc) {
    // acc.balance creates and adds key pair to account object
    // balance: <value>,
    acc.balance = acc.movements.reduce(
        (accumulator, move) => accumulator + move,
        0
    );
    labelBalance.innerText = `€${acc.balance}`;
    console.log(acc.balance);
};
// calcDisplayBalance(movements);

// -----------------------------------------------------------------------------
// ⚙️ FN: CREATE BALANCE SUMMARIES
// -> calculates and displays summaries of income, outgoing, and interest earned
// -----------------------------------------------------------------------------
// Chaining array methods inside a function
// account object passed in as parameter (via Login event handler)
const calcDisplaySummary = function (acc) {
    // Filter and calculate total income
    const incomes = acc.movements
        .filter(move => move > 0)
        .reduce((acc, move) => acc + move, 0);
    labelSumIn.innerText = `€${incomes}`;
    // Filter and calculate total outgoing
    const outgoings = acc.movements
        .filter(move => move < 0)
        .reduce((acc, move) => acc + move, 0);
    labelSumOut.innerText = `€${Math.abs(outgoings)}`;
    // Display interest
    // 1 - Create array with only positive values
    // 2 - Calculate interest on income values
    // 3 - filter out any interest less than 1
    // 4 - create total of all interest values
    const interest = acc.movements
        .filter(move => move > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter((int, i, arr) => int >= 1)
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.innerText = `€${interest}`;
};
// console.log(calcDisplaySummary(account1.movements));

// -----------------------------------------------------------------------------
// ⚙️ FN: ADD USER INITIALS TO OBJECTS
// -> generates usernames for the accounts based on the owner's name
// -> adds value (username) to object.
// -----------------------------------------------------------------------------
const createUsernames = function (accs) {
    // 1 - Input array of account names
    // 2 - Iterate through array, connect user names from corresponding object
    // 3 - Convert user names to initials
    // 4 - Add new value (initials) to user objects
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase() // convert string to lower case
            .split(' ') // Split string into array values
            .map(name => name.at(0)) // iterate over array of split values using map + arrow function
            .join(''); // join the array into a string
    });
};
createUsernames(accounts);

// -----------------------------------------------------------------------------
// ⚙️ FN: UPDATE UI VALUES
// -----------------------------------------------------------------------------
// Function used in other functions when affecting any value
// Use-case 1: Login event handler, set initial values
// Use-case 2: Transfer function

const updateUI = function (acc) {
    // Display calculated balance ⚙️FN
    calcDisplayBalance(acc);
    // Display summaries ⚙️FN
    calcDisplaySummary(acc);
    // Display movements ⚙️FN
    displayMovements(acc.movements);
};

// -----------------------------------------------------------------------------
// ⚙️ FN: LOGIN EVENT HANDLER
// -----------------------------------------------------------------------------
// variable declared outside of the function to make it accessible elsewhere in the code
// Used in this and other functions to specify the current account
let currentAccount;

btnLogin.addEventListener('click', function (e) {
    // Prevent form from submitting
    e.preventDefault();

    // looks up user account based on the username entered in input
    // access initials in objects, created by function (createUsernames)
    // ⭐️ SETS currentAccount global variable
    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
    );

    // Check if pin correct
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI and welcome message
        // Get first name by using split method, then get first word of resulting array
        labelWelcome.textContent = `Welcome back, ${
            currentAccount.owner.split(' ')[0]
        }`;
        // Change opacity to visible of .app
        containerApp.style.opacity = 100;
        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur(); // input loses its focus

        // Update UI values function for current account
        updateUI(currentAccount);
    }
});

// -----------------------------------------------------------------------------
// ⚙️ FN: TRANSFERS
// -----------------------------------------------------------------------------

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault(); // Common prevent behavior default
    const amount = Number(inputTransferAmount.value);

    // 1 - Find and define receiver
    const receiverAccount = accounts.find(
        // looks up user account based on the username entered in input
        // access initials in objects, created by function (createUsernames)
        // if input matches a username in an account object
        // assigns it to the receiverAccount variable, for account we which to transfer
        acc => acc.username === inputTransferTo.value
    );
    console.log(amount, receiverAccount);

    // 2 - Evaluate amount input
    if (
        // transfer amount is more than 0
        amount > 0 &&
        receiverAccount &&
        // user has amount in balance to send
        currentAccount.balance >= amount &&
        // Cant transfer to self
        // Optional chaining determines if receiver account existing, if not it becomes undefined and fails
        receiverAccount?.username !== currentAccount.username
    ) {
        // 2a - Execute Transfer
        // Add negative value to current user movements
        currentAccount.movements.push(-amount);
        // Add positive value to receiver user movements
        receiverAccount.movements.push(amount);

        // 2b - Update UI values
        updateUI(currentAccount);
    }

    // 3 - Clear input fields
    inputTransferAmount.value = inputTransferTo.value = '';
});

// -----------------------------------------------------------------------------
// ⚙️ FN: REQUEST LOAN
// -----------------------------------------------------------------------------

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    // Connect input value to an amount variable
    const amount = Number(inputLoanAmount.value);

    if (
        amount > 0 &&
        // there is a deposit that is at least 10% of loan request amount
        currentAccount.movements.some(mov => mov >= amount * 0.1)
    ) {
        // add movement
        currentAccount.movements.push(amount);
        // update UI
        updateUI(currentAccount);
    }
    // Clear input field
    inputLoanAmount.value = '';
});

// -----------------------------------------------------------------------------
// ⚙️ FN: CLOSE ACCOUNT
// -----------------------------------------------------------------------------

btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (
        // If inputs match username and password
        inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const index = accounts.findIndex(
            acc => acc.username === currentAccount.username
        );
        // Delete account
        // Splice mutates the original array
        accounts.splice(index, 1);

        // Hide UI
        containerApp.style.opacity = 0;
    }

    // Clear input fields
    inputCloseUsername.value = inputClosePin.value = '';
});

// -----------------------------------------------------------------------------
// ⚙️ FN: SORT MOVEMENTS
// -----------------------------------------------------------------------------

// State variable, to monitor if currently sorting the array or not
// Preserved every time the click function below is executed
// default = false, array is not sorted
let sorted = false;

// Function
btnSort.addEventListener('click', function (e) {
    e.preventDefault();

    // execute display movements function
    // refer to current account as first parameter
    // using not operator, when sorted is false then we want to sort it (true)...
    // if sorted, we want it to not be sorted (false)
    displayMovements(currentAccount.movements, !sorted);

    sorted = !sorted; // flip the sorted state
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

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

///////////////////// Lecture 153 reduce method

/*
const maxValue = movements.reduce((acc, move) => {
    // acc = track the current maximum value
    // with the reduce method, you always have turn to return the accumulator to the next iteration
    if (acc > move) {
        return acc; // return accumulator, so it stays the same on the next iteration
    } else {
        return move; // return movement/transaction value as new accumulator value for next iteration
    }
}, movements[0]);
// Use the first value of the array, when finding the max or min value

console.log(maxValue);
*/

///////////////////// Lecture 155 chaining methods

// You can only chain a method if the one before it returns an array
// Don't over use chaining methods, it can affect performance on huge arrays
// Bad practice to chain methods that mutate the underlying original array (splice method, or reverse method)

// CHAINING METHOD PIPELINE
// 1. Filter for only positive values
// --> Result of filter, will be a new array
// 2. Convert values to USD (map)
// 3. Get total number of deposits in USD
/*
const totalDepositsUSD = movements
    .filter(mov => mov > 0)
    .map(mov => mov * euroToUsd)
    .reduce((acc, move) => acc + move, 0);

console.log(totalDepositsUSD.toFixed(2));
*/

///////////////////// Lecture 157 find method

/*
// Does not return a new array
// Returns the first value that meets the condition
// 1 - Filter returns ALL the values meeting the condition
// 2 - Filter returns a new array
const firstWithdrawal = movements.find(mov => mov < 0); // True of false

console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Anna Lohmann');
console.log(account);
// {owner: 'Anna Lohmann', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'al'}
*/

///////////////////// Lecture 161 some and every method

/*
// SOME
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// EVERY
// Returns true if all elements in array satisfy the condition passed in
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
*/
/*
const overallBalance = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance);
// 17840

// flatMap
const overallBalance2 = accounts
    .flatMap(acc => acc.movements)
    .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance2);
// 17840
*/

///////////////////// Lecture 163 Sort

// // Strings
// const owners = ['Chris', 'Anna', 'Rob', 'Jana', 'Tom'];

// console.log(owners.sort());

// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // Numbers
// // Callback function, a = current value, b = next value
// // return < 0, A, B (keep order)
// // return > 0, B, A (switch order)
// // movements.sort((a, b) => {
// //     if (a > b) {
// //         return 1;
// //     }
// //     if (b > a) {
// //         return -1;
// //     }
// // });
// movements.sort((a, b) => a - b);
// console.log(movements);
