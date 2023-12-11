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

const btn = document.querySelector('button');

// -------- METHOD 1

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
