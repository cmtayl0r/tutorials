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

////////////////////////////////////////////////////////
// 116 - Sets

/*
// a collection of unique values

const ordersSet = new Set([
    'Pasta',
    'Pizza',
    'Gnocchi',
    'Pizza',
    'Risotto',
    'Pasta',
    'Pizza',
]);

// set met
console.log(ordersSet.size); // 4
console.log(ordersSet.has('Bread')); // false
console.log(ordersSet.has('Pizza')); // true

ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread'); // Only one gets added, other ignored
ordersSet.delete('Risotto');

// sets are iterable
for (const order of ordersSet) console.log(order);

console.log(ordersSet); // {'Pasta', 'Pizza', 'Gnocchi', 'Garlic Bread'}
console.log(new Set('Chris')); // {'C', 'h', 'r', 'i', 's'}

// Starting array
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

// convert a new set of unique values, to an array
// using destructuring and spread operator
const staffUnique = [...new Set(staff)];

console.log(staffUnique); // ['Waiter', 'Chef', 'Manager']
*/

////////////////////////////////////////////////////////
// 117 - Maps

/*
const rest = new Map();

// Add data using the set method
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Lisbon, Portugal');

// chain the set method
rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
    .set('open', 11)
    .set('close', 23)
    .set(true, 'We are open!')
    .set(false, 'We are closed ');

// Read data from a map using the get method
console.log(rest.get('name'));

// Exploiting booleans as map keys
const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// Checking existence
console.log(rest.has('categories')); // true

// Deleting values
rest.delete(2);

console.log(rest.size); // 7

// Use arrays or objects as map keys
const arr = [1, 2];
rest.set(arr, 'Test array value');
console.log(rest.get(arr)); // Test Array value

rest.set(document.querySelector('h1'), 'Heading');
*/

/*
0: {"name" => "Classico Italiano"}
1: {1 => "Firenze, Italy"}
2: {"categories" => Array(4)}
3: {"open" => 11}
4: {"close" => 23}
5: {true => "We are open!"}
6: {false => "We are closed "}
7: {Array(2) => "Test array value"}
8: {h1 => "Heading"}
*/

////////////////////////////////////////////////////////
// 118 - Maps

/*
const question = new Map([
    // pass in an array to Map rather than use set method
    // first position a key, second position the value
    ['question', 'What is the best programming language in the world?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'Javascript'],
    ['correct', 3],
    [true, 'Correct 👍'],
    [false, 'Try again 😩'],
]);

// Convert object to Map ?????

// Quiz app
// Ask question
console.log(question.get('question'));

// Loop over map for questions only
// Destructure into 2 separate variables for key and value
for (const [key, value] of question) {
    if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// Ask for user input
// user answer stored in answer variable
const answer = Number(prompt('Your answer?'));

console.log(question.get(question.get('correct') === answer));
// The result of the comparison (true or false) is used as a key to retrieve a message from the question Map ('true' or 'false')
// If the users answer is correct
// the code retrieves the value associated with the key 'true' from the question Map
*/

////////////////////////////////////////////////////////
// 121 - Working with strings

const airline = 'Virgin Airlines';
const plane = 'A320';

console.log(airline.indexOf('r')); // 2
console.log(airline.lastIndexOf('r')); // 9
console.log(airline.indexOf('Airways')); // -1

// Slice first 3 characters from start of string
// console.log(airline.slice(0, 3)); // Vir

// Slice first word without knowing the index #
console.log(airline.slice(0, airline.indexOf(' '))); // Virgin

// Slice last word without knowing the index #
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Airlines

// Slice last character from string
console.log(airline.slice(-1)); // s

// Remove the last character
console.log(airline.slice(1, -1)); // Virgin Airline

const checkMiddleSeat = function (seat) {
    // B and E are the middle seats
    const s = seat.slice(-1);
    if (s === 'B' || s === 'E') {
        console.log('You got the middle seat 😩');
    } else {
        console.log('You got lucky 😃');
    }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

////////////////////////////////////////////////////////
// 122 - Working with strings