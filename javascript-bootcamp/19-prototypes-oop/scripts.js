'use strict';

// FACTORY FUNCTION
// -------------------------------
// This function makes us an object (color)
// It starts empty, but we add some properties base off arguments we provided (r,g,b)
// We add some methods
// Then we return the object

/*
const makeColor = function (r, g, b) {
    const color = {};
    color.r = r;
    color.g = g;
    color.b = b;
    color.rgb = function () {
        const { r, g, b } = this;
        return `rgb(${r},${g},${b})`;
    };
    color.hex = function () {
        const { r, g, b } = this;
        return (
            '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
    };
    return color;
};

const myColor = makeColor(25, 83, 150);
*/

/*
console.log(myColor.rgb()); // rgb(25,83,150)
console.log(myColor); // {r: 25, g: 83, b: 150, rgb: ƒ}
console.log(myColor.hex()); // #195396
console.log(myColor); // {r: 25, g: 83, b: 150, rgb: ƒ, hex: ƒ}
*/

// CONSTRUCTOR FUNCTION
// -------------------------------
// When use new keyword, creates a new plain javascript object (firstCol etc)
// Links (sets the constructor of) this object to another object (Color)
// Passes the newly created object from step 1 (firstCol) as the 'this' context
// returns 'this' if the function doesn't return its own object
// Methods (rgb, hex) accessible from the shared prototype object (FirstCol [[Prototype]])

/*
const Color = function (r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
};

Color.prototype.rgb = function () {
    const { r, g, b } = this;
    return `rgb(${r},${g},${b})`;
};
Color.prototype.hex = function () {
    const { r, g, b } = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

Color.prototype.rgba = function (a = 1.0) {
    // 1.0 as default alpha
    const { r, g, b } = this;
    return `rgb(${r},${g},${b},${a})`;
};

const firstCol = new Color(12, 150, 56);
const secondCol = new Color(98, 255, 67);

console.log(firstCol.rgb()); // rgb(12,150,56)
console.log(secondCol.hex()); // #62ff43
console.log(firstCol.rgba(0.5)); // rgb(12,150,56,0.5)
*/

// CLASSES
// -------------------------------
/*
class ColorCl {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
    }

    innerRGB() {
        const { r, g, b } = this;
        return `${r},${g},${b}`;
    }

    rgb() {
        this.innerRGB();
        return `rgb(${this.innerRGB()})`;
    }

    hex() {
        const { r, g, b } = this;
        return (
            '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
    }
    rgba(a = 1.0) {
        // 1.0 as default alpha
        this.innerRGB();
        return `rgb(${this.innerRGB()},${a})`;
    }
}

const myColor1 = new ColorCl(12, 150, 56, 'greeny');
const myColor2 = new ColorCl(12, 150, 255, 'bluey');

console.log(myColor1.rgb()); // rgb(12,150,56)
console.log(myColor1.rgba(0.7)); // rgb(12,150,56,0.7)
console.log(myColor2.hex()); //#0c96ff
console.log(myColor2.name); // bluey
console.log(myColor2.rgba(0.4)); // rgb(12,150,255,0.4)
*/

// --------------------------------------------------------------
// DESTRUCTURING
// --------------------------------------------------------------

// PARAMETER DESTRUCTURING

const response = ['HTTP/1.1', '200 OK', 'application/json'];

const parseResponse = function ([protocol, statusCode, contentType]) {
    console.log(`Status: ${statusCode}`);
};

parseResponse(response); // Status: 200 OK

// SPREAD

// Define a function that takes an array
const getStats = arr => {
    // Calc the max number from all the array values
    const max = Math.max(...arr);
    // Calc the min number from all the array values
    const min = Math.min(...arr);
    // Calc the sum value of all the numbers in the array
    // Reduce iterates over all values in the array, adding each value to sum
    const sum = arr.reduce((sum, val) => sum + val);
    // Calc the avg number from all array values
    const avg = sum / arr.length;
    // Return an object containing calculated values for min, mac, sum, avg
    return {
        max,
        min,
        sum,
        avg,
    };
};

// Array to use function on
const reviews = [4.5, 5.0, 3.44, 2.8, 3.5, 4.0, 3.5];

// Call the getStats function with the array as its argument
// Attach the returned object to a variable
const stats = getStats(reviews);

console.log(stats); // {max: 5, min: 2.8, sum: 26.74, avg: 3.82}

//////

const pickCard = function (arr) {
    // Calculates a random index based on the length of the array given
    // Math.random() returns a number between 0 and 1
    // This number is then multiplied by the array's length to get a value in the range
    // Math.floor() rounds down to the nearest whole number
    const index = Math.floor(Math.random() * arr.length);
    // Return element from array based on random index
    return arr[index];
};

const getCard = function () {
    // Initializes an array of card values (1 through King).
    const values = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'J',
        'Q',
        'K',
    ];
    // Initializes an array of card suits
    const suits = ['clubs', 'spades', 'hearts', 'diamonds'];
    // Calls the `pickCard` function to get a random value from the `values` array
    const value = pickCard(values);
    // Calls the `pickCard` function to get a random suit from the `suits` array
    const suit = pickCard(suits);
    // Returns an object representing a card with randomly chosen value and suit
    return {
        value: value,
        suit: suit,
    };
};

console.log(getCard());
