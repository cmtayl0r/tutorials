// -----------------------------------------------------------------------------
// IIFE
// -----------------------------------------------------------------------------
// (function () {
//     // Your code here
//     let localVar = 10;
//     console.log(localVar);
// })();

// -----------------------------------------------------------------------------
// CLOSURES
// -----------------------------------------------------------------------------

function outerFunction() {
    let outerVariable = 'I am outside!';
    return function innerFunction() {
        console.log('I am inside!');
        console.log('Outer Variable: ' + outerVariable);
    };
}

const myClosure = outerFunction();
// myClosure();

// BOOKING EXAMPLE

function secureBooking() {
    // Outer function scope

    // This variable is in the closure of the returned object
    let passengerCount = 0;

    // return an object with two methods
    return {
        incrementPassengerCount: function () {
            // inner function scope
            console.log('😃 Passenger added');
            passengerCount++;
        },
        currentPassengerCount: function () {
            // inner function scope
            console.log('The current passenger count is: ', passengerCount);
            return passengerCount;
        },
    };
}

// Create an instance of the closure by calling `secureBooking`
const passengerCounter = secureBooking();
// Call the methods
// passengerCounter.incrementPassengerCount(); // 😃 Passenger added
// passengerCounter.incrementPassengerCount(); // 😃 Passenger added
// passengerCounter.incrementPassengerCount(); // 😃 Passenger added
// console.log(passengerCounter.currentPassengerCount()); // The current passenger count is:  3

// BANK ACCOUNT EXAMPLE

function createBankAccount(initialBalance) {
    let balance = initialBalance;

    return {
        deposit: function (amount) {
            balance += amount;
            console.log(`💶 ${amount} added. Balance is now ${balance}`);
        },
        withdraw: function (amount) {
            if (amount <= balance) {
                balance -= amount;
                console.log(
                    `💶 ${amount} withdrawn. Balance is now ${balance}`
                );
            } else {
                console.log(`Sorry. Insufficient funds 🥺`);
            }
        },
        getBalance: function () {
            return balance; // Access private variable
        },
    };
}

// const newBankAccount = createBankAccount(100);
// newBankAccount.deposit(50);
// newBankAccount.deposit(50);

console.log('Balance:', newBankAccount.getBalance());

function createUserId(prefix) {
    return function generateId(name) {
        let value = (Math.random() * 100000).toFixed(0);

        console.log(value);
        return `${prefix}-${name}-${value}`;
    };
}

// const newUser = createUserId('user');

// console.log(newUser('Chris'));
