'use strict';

// Data needed for a later exercise
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery: function ({ starterIndex, mainIndex, time, address }) {
        const [starterItem, mainItem] = this.order(starterIndex, mainIndex); // Utilize the order method
        console.log(starterItem, mainItem, time, address);
    },

    orderPasta: function (ing1, ing2, ing3) {
        console.log(`Here is !!!! ${ing1}, ${ing2}, and ${ing3}`);
    },

    orderPizza: function (mainIng, ...otherIngs) {
        console.log(mainIng);
        console.log(otherIngs);
    },

    openingHours: {
        thu: {
            open: 12,
            close: 22,
        },
        fri: {
            open: 11,
            close: 23,
        },
        sat: {
            open: 0, // Open 24 hours
            close: 24,
        },
    },
};

/*

restaurant.orderDelivery({
    time: '22:30',
    address: 'Via de Sole 21',
    mainIndex: 2,
    starterIndex: 2,
});

const arr = [7, 8, 9];
const newArr = [1, 3, ...arr];
console.log(newArr);

// create shallow copies of arrays
const mainMenuCopy = [...restaurant.mainMenu];

mainMenuCopy.push('DUmb!');

console.log(mainMenuCopy);
console.log(restaurant.mainMenu);

// merge arrays
const combinedMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(combinedMenu);

// spread operator as function arguments
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];

// restaurant.orderPasta(...ingredients);

const newRestaurant = { ...restaurant, headChef: 'Chris Taylor' };
newRestaurant.name = 'Foody Shack Fuck';

console.log(newRestaurant);

////////////////////////////////////////////
// Rest operator

////////// 1. Destructuring

const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , Risotto, ...otherFood] = [
    ...restaurant.mainMenu,
    ...restaurant.starterMenu,
];

console.log(pizza, Risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;

console.table(weekdays);
*/

////////// 2. Function calls

/*
const add = function (...nums) {
  let result = 0;
  for (let num of nums) {
    result += num;
  }
  return result;
};

console.log(add(2, 3, 7));
add(2, 8);

const arrX = [23, 5, 7];
console.log(add(...arrX));


// Use ANY data type, return ANY data type, short circuiting

console.log(0 && 'Orange'); // Orange (truthy / truthy)
console.log('' && 'Orange'); //
console.log(true && null); // null
console.log('Apple' && 'Orange'); //

if (restaurant.orderPizza) {
    restaurant.orderPizza('mushrooms', 'pepperoni');
}

// The nullish coalescing operator
// works with nullish values: null and undefined (NOT 0 or '')
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);

const rest1 = {
    name: 'Capri',
    // numGuests: 20,
    numGuests: 0,
};
const rest2 = {
    name: 'La Piazza',
    owner: 'Chris Taylor',
};

// OR assignment operator
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// nullish assignment operator
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

rest1.owner &&= 'anon';
rest2.owner &&= 'anon';

console.log(rest1);
console.log(rest2);
*/

/////////////////////////////////
// 111 - For of loop

/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const [i, el] of menu.entries()) {
    console.log(i, el);
}

for (const item of menu) console.log(item);
*/

/////////////////////////////////
// 113 - Optional chaining (.?) ES2020

/*
console.log(restaurant.openingHours.mon); // undefined
// console.log(restaurant.openingHours.mon.open); // error

// only if before ? exists, after it will be read
console.log(restaurant.openingHours?.mon?.open);
console.log(restaurant.openingHours?.thu?.open);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
    const open = restaurant.openingHours[day]?.open ?? 'closed';
    if (open === 'closed') {
        console.log(`We are closed`);
    } else {
        console.log(`On ${day}, we open at ${open}`);
    }
}

// Optional chaining on calling methods
// See if a method exists before calling it
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');

// Optional chaining works on arrays
// Check and see if array is empty
const users = [
    {
        name: 'Chris',
        email: 'hello@gmail.com',
    },
];

console.log(users[0]?.name ?? 'User array empty'); // Chris
console.log(users[1]?.name ?? 'User array empty'); // User array empty

// Looping over objects

const properties = Object.keys(restaurant.openingHours);
console.log(properties);

for (const day of Object.keys(restaurant.openingHours)) {
    console.log(day);
}

console.log(Object.entries(openingHours));
*/
