'use strict';

/*
--------------------------------------------------------------------------------
163 - CALL STACK DEBUGGING
--------------------------------------------------------------------------------
*/
/*
const repeat = (str, times) => {
    let result = '';
    for (let i = 0; i < times; i++) {
        result += str;
    }
    return result;
};
const scream = str => {
    return str.toUpperCase() + '!!!';
};

const getRantText = phrase => {
    let text = scream(phrase);
    let rant = repeat(text, 8);
    return rant;
};

const makeRant = (phrase, el) => {
    const h2 = document.createElement('h2');
    h2.innerText = getRantText(phrase);
    el.appendChild(h2);
};

makeRant('I hate stinky shoes', document.body);
*/

/*
--------------------------------------------------------------------------------
167 - PROMISES
--------------------------------------------------------------------------------
*/

// -------- METHOD 1

/*
// 1 - Create a promise
const willGetDog = new Promise((resolve, reject) => {
    const randNum = Math.random();
    if (randNum < 0.5) {
        resolve(`You are getting a Dog! 🐶 with ${randNum.toFixed(2)}`);
    } else {
        reject(`No Dog for you! 🥺 with ${randNum.toFixed(2)}`);
    }
});

// 2 - Consume a promise
willGetDog
    .then(res => console.log(res)) // When promise resolved, run then()
    .catch(err => console.error(err)); // When promise rejected, run catch()

// -------- METHOD 2

// 1 - Create a promise
const willGetCat = new Promise((resolve, reject) => {
    const randNum = Math.random();
    if (randNum < 0.5) {
        resolve(randNum); // Resolve promise, pass value
    } else {
        reject(randNum); // Reject promise, pass value
    }
});

// 2 - Consume a promise
willGetCat
    .then(res => {
        console.log(`You are getting a Cat! 🐱 with ${res.toFixed(2)}`);
    })
    .catch(err => {
        console.error(`No Cat for you! 🥺 with ${err.toFixed(2)}`);
    });
*/

/*
--------------------------------------------------------------------------------
168 - RETURN PROMISE FROM FUNCTIONS
--------------------------------------------------------------------------------
*/

/*
// 1 - Create a promise
const makeDogPromise = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randNum = Math.random();
            if (randNum < 0.5) {
                resolve(randNum); // Resolve promise, pass value
            } else {
                reject(randNum); // Reject promise, pass value
            }
        }, 5000);
    });
};

// 2 - Consume a promise
makeDogPromise()
    .then(num => {
        console.log(`You are getting a Dog! 🐶 with ${num.toFixed(2)}`);
    })
    .catch(num => {
        console.error(`No Dog for you! 🥺 with ${num.toFixed(2)}`);
    });
*/

/*
--------------------------------------------------------------------------------
169 - RESOLVING AND REJECTING WITH VALUES
--------------------------------------------------------------------------------
*/

/*
const fakeRequest = function (url) {
    // Return a new Promise object
    return new Promise((resolve, reject) => {
        // Set a timeout to asynchronously simulate a network delay
        setTimeout(() => {
            // Define a mock database of pages
            const pages = {
                '/users': [
                    { id: 1, username: 'chrisTango' },
                    { id: 5, username: 'boobyWatcher' },
                ],
                '/about': 'This is the about page',
            };
            // Retrieve data for the requested URL
            const data = pages[url];
            // If data exists for the URL
            if (data) {
                // Resolve the promise with a response object
                resolve({ status: 200, data });
            } else {
                // Reject the promise with a response object if URL is not found
                reject({ status: 404 });
            }
        }, 1000);
    });
};

// Call the 'fakeRequest' function with '/users' URL
fakeRequest('/users')
    .then(res => {
        // Handle the resolved promise: log the status and data
        console.log(res.status);
        console.log(res.data);
        // Additional message indicating the request was successful
        console.log('REQUEST WORKED ✅');
    })
    .catch(res => {
        // Handle the rejected promise: log the status
        console.log(res.status);
        // Log an error message indicating the request failed
        console.error('REQUEST FAILED 💥');
    });

*/

/*
--------------------------------------------------------------------------------
171 - REFACTORIUNG WITH PROMISES
--------------------------------------------------------------------------------
*/
const btn = document.querySelector('button');

// 1 - "Promisified" function
const moveX = function (element, delay, amount) {
    // Return a promise that resolves with moving an element after a delay
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Detect screen boundaries
            const bodyBoundary = document.body.clientWidth;
            // Get right side of element x value
            const elRight = element.getBoundingClientRect().right;
            // Get left side of element x value
            const currLeft = element.getBoundingClientRect().left;

            if (elRight + amount > bodyBoundary) {
                // If element next move greater than boundary, reject
                reject();
            } else {
                // Move element on x axis by specified amount in px after delay
                element.style.transform = `translateX(${currLeft + amount}px)`;
                // Resolve the promise
                resolve();
            }
        }, delay);
    });
};

// 2 - Consume promise
// Chaining the promises when consuming them
moveX(btn, 1000, 200)
    .then(() => moveX(btn, 1000, 200)) // Implicit return another promise
    .then(() => moveX(btn, 1000, 200)) // Implicit return another promise
    .then(() => moveX(btn, 1000, 200)) // Implicit return another promise
    .then(() => moveX(btn, 1000, 200)) // Implicit return another promise
    .then(() => moveX(btn, 1000, 200)) // Implicit return another promise
    .catch(() => console.error('Error: Out of Space'));
