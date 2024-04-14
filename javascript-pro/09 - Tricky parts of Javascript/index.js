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

// console.log('Balance:', newBankAccount.getBalance());

function createUserId(prefix) {
    return function generateId(name) {
        let value = (Math.random() * 100000).toFixed(0);

        console.log(value);
        return `${prefix}-${name}-${value}`;
    };
}

// const newUser = createUserId('user');

// console.log(newUser('Chris'));

// -----------------------------------------------------------------------------
// GUESSING GAME
// -----------------------------------------------------------------------------

function guessingGame() {
    const secretNumber = Math.floor(Math.random() * 100);
    let guesses = 0;
    let wonGame = false;

    console.log(secretNumber);

    return function submitGuess(guess) {
        if (wonGame) {
            return 'The game is over, you already won.';
        }

        guesses++;
        if (guess === secretNumber) {
            wonGame = true;
            const guessPhrase = guesses === 1 ? 'guess' : 'guesses';
            return `You win! You found ${guess} in ${guesses} ${guessPhrase}.`;
        }
        if (guess > secretNumber) return `${guess} is too high!`;
        if (guess < secretNumber) return `${guess} is too low!`;
    };
}

// let game = guessingGame();

// -----------------------------------------------------------------------------
// BANK ACCOUNT
// -----------------------------------------------------------------------------

function createAccount(pin, initialAmount) {
    let balance = initialAmount;
    let accPin = pin;

    return {
        deposit: function (pin, amount) {
            if (pin !== accPin) return 'Invalid PIN.';
            balance += amount;
            return `Successfully deposited $${amount}. Current balance: $${balance}.`;
        },
        withdraw: function (pin, amount) {
            if (pin !== accPin) return 'Invalid PIN.';
            if (amount <= balance) {
                balance -= amount;
                return `Successfully withdrew $${amount}. Current balance: $${balance}.`;
            }
            return 'Withdrawal amount exceeds account balance. Transaction cancelled.';
        },
        checkBalance: function (pin) {
            if (pin !== accPin) return 'Invalid PIN.';
            return balance; // Access private variable
        },
        changePin: function (oldPin, newPIN) {
            if (pin !== accPin) return 'Invalid PIN.';
            accPin = newPIN;
            return 'PIN successfully changed!';
        },
        showPin: function (pin) {
            if (pin !== accPin) return 'Invalid PIN.';
            return accPin;
        },
    };
}

let account = createAccount('1234', 100);

//   account.checkBalance("oops");
//   // "Invalid PIN."

//   account.deposit("1234", 250);
//   // "Successfully deposited $250. Current balance: $350."

//   account.withdraw("1234", 300);
//   // "Successfully withdrew $300. Current balance: $50."

//   account.withdraw("1234", 100);
//   // "Withdrawal amount exceeds account balance. Transaction cancelled."

// account.changePin('1234', '5678');
//   // "PIN successfully changed!"

// -----------------------------------------------------------------------------
// SPECIAL ADD
// -----------------------------------------------------------------------------

function specialAdd(num) {
    let sum = 0;

    function inner(num) {
        sum += num;
        return inner;
    }

    inner.toString = function () {
        return sum;
    };

    return inner;
}
console.log(specialAdd(2)(8)(5)(1));
