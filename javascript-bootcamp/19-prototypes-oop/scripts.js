'use strict';

// FACTORY FUNCTION
// -------------------------------
// This function makes us an object (color)
// It starts empty, but we add some properties base off arguments we provided (r,g,b)
// We add some methods
// Then we return the object

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

class ColorCl {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
    }

    innerRGB() {
        const { r, g, b } = this;
        /* 
        Without destructuring, you would have to prefix each usage with this., e.g., this.r, this.g, and this.b. This can become visually noisy, especially in more complex methods.
        */
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
console.log(myColor2.rgba(0.4));