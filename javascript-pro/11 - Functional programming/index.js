// -----------------------------------------------------------------------------
// TITLE
// -----------------------------------------------------------------------------

// Imperative programming
// a way to write code that is more procedural and harder to reason about
let sum = 0;
for (let i = 0; i < 10; i++) {
    sum += i;
}

// Functional programming
// A way to write code that is more declarative and easier to reason about
[1, 2, 3, 4, 5].reduce((acc, val) => acc + val, 0);

let numbers = [1, 2, 3, 4, 5];

// Imperative approach
const evens = [];

for (let num of numbers) {
    if (num % 2 === 0) {
        evens.push(num);
    }
}

// Functional approach
numbers.filter(num => num % 2 === 0);

// -----------------------------------------------------------------------------
// PURE FUNCTIONS
// -----------------------------------------------------------------------------

// Impure function
const colors = ['red', 'blue', 'green'];

function addToArray(arr, value) {
    return arr.push(value);
}

// Pure function
// returns a new array with the value added
// because it doesn't modify the original array
function pureAddToArray(arr, value) {
    return [...arr, value];
}

// -----------------------------------------------------------------------------
// HIGHER ORDER FUNCTIONS
// -----------------------------------------------------------------------------

function doTwice(func) {
    func();
    func();
}
doTwice(function () {
    console.log('Hello!');
});

function multiplyBy(factor) {
    return function (num) {
        return num * factor;
    };
}
multiplyBy(2)(3); // 6

// -----------------------------------------------------------------------------
// PARTIAL FUNCTION
// -----------------------------------------------------------------------------

function multiply(a, b) {
    return a * b;
}

function partial(func, ...fixedArgs) {
    return function (...remainingArgs) {
        return func(...fixedArgs, ...remainingArgs);
    };
}

const double = partial(multiply, 2);
const triple = partial(multiply, 3);
