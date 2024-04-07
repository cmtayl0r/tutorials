// -----------------------------------------------------------------------------
// Binding arguments
// -----------------------------------------------------------------------------

function applyVAT(taxRate, price) {
    return price + price * taxRate;
}

// "null" means that the "this" keyword will be ignored
const applyUKVAT = applyVAT.bind(null, 0.2);
const applyGermanVAT = applyVAT.bind(null, 0.19);
applyUKVAT(100); // 120
applyGermanVAT(100); // 119

// -----------------------------------------------------------------------------
// Bind method and event listeners
// -----------------------------------------------------------------------------

const chris = {
    name: 'Chris',
    city: 'Berlin',
    sing() {
        console.log(`this: ${this}`);
        console.log(`${this.name} is singing`);
    },
};

const button = document.querySelector('#clickMe');
// create a new function that is bound to the "chris" object
// Set this to be the chris object
button.addEventListener('click', chris.sing.bind(chris));

// -----------------------------------------------------------------------------
// Bind method and timers
// -----------------------------------------------------------------------------

class Counter {
    constructor(startingNum = 0, incrementAmt = 1) {
        this.count = startingNum;
        this.incrementAmt = incrementAmt;

        this.button = document.querySelector('#addMe');
        this.button.addEventListener('click', this.increment.bind(this)); // "this" is bound to the Counter object
        // without this binding, "this" would refer to the button element
    }

    start() {
        setInterval(this.increment.bind(this), 1000); // "this" is bound to the Counter object
    }

    increment() {
        console.log(this);
        console.log(this.count);
        this.count += this.incrementAmt;
    }
}

// -----------------------------------------------------------------------------
// Coding exercise 4
// -----------------------------------------------------------------------------

const butters = {
    firstName: 'Butters',
    lastName: 'Cluckly',
    greet: function () {
        return `Hello ${this.firstName} ${this.lastName}`;
    },
};

const fluffy = {
    firstName: 'Fluffy',
    lastName: 'Meowson',
};

function greetFluffy() {
    return butters.greet.bind(fluffy)();
    // immediately invoke the greet method (using ())and bind the "this" keyword to the "fluffy" object
}

// console.log(greetFluffy());

// -----------------------------------------------------------------------------
// Coding exercise 5
// -----------------------------------------------------------------------------

class Timer {
    constructor() {
        this.tick = 0;
        this.timerId = null;
    }

    start() {
        this.timerId = setInterval(() => {
            console.log(this.tick++);

            if (this.tick === 5) this.stop();
            // add stop method to clear interval
        }, 1000);
    }

    stop() {
        clearInterval(this.timerId);
    }
}

const newTimer = new Timer();

newTimer.start();
