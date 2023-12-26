"use strict";

/*
--------------------------------------------------------------------------------
181 - xxx
--------------------------------------------------------------------------------
*/

/*
async function greet() {
  return "Hello!";
}
greet().then(val => {
  console.log("PROMISE RESOLVED WITH:", val);
});
// PROMISE RESOLVED WITH: Hello!

async function add(x, y) {
  if (typeof x !== "number" || typeof y !== "number") {
    throw "X and Y must be numbers!";
  }
  return x + y;
}
add(2, 3).then(val => console.log(val));
// 5
*/

/*
// PROMISE BASED
const getPlanetsP = function () {
  return fetch("https://swapi.dev/api/planets/");
};

getPlanetsP()
  .then(res => res.json())
  .then(data => console.log(data));

// ASYNC AWAIT
async function getPlanetA() {
  try {
    const res = await fetch("https://swapi.dev/api/planets/");
    return res.json();
  } catch (err) {
    console.log(`Caught:`, err);
  }
}

getPlanetA().then(res => console.log(res));
*/

/*
--------------------------------------------------------------------------------
185 - <Multiple awaits>
--------------------------------------------------------------------------------
*/

/*
const btn = document.querySelector("button");

// 1 - "Promisified" function
const moveX = function (element, delay, amount) {
  // Return a promise that resolves with moving an element after a delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Detect screen boundaries to see if exceed the screen width
      const bodyBoundary = document.body.clientWidth;
      // Get right side of element x value
      const elRight = element.getBoundingClientRect().right;
      // Get left side of element x value
      const currLeft = element.getBoundingClientRect().left;

      if (elRight + amount > bodyBoundary) {
        // If element next move greater than boundary, reject
        // Pass through object of values when rejected
        reject({ bodyBoundary, elRight, amount });
      } else {
        // Move element on x axis by specified amount in px after delay
        element.style.transform = `translateX(${currLeft + amount}px)`;
        // Resolve the promise
        resolve();
      }
    }, delay);
  });
};

const animateRight = async function (el, amt) {
  await moveX(el, 500, amt);
  await moveX(el, 500, amt);
  await moveX(el, 500, amt);
  await moveX(el, 500, amt);
  await moveX(el, 500, amt);
  await moveX(el, 500, amt);
  await moveX(el, 500, amt);
  await moveX(el, 500, amt);
  await moveX(el, 500, amt);
  await moveX(el, 500, amt);
  await moveX(el, 500, amt);
};

animateRight(btn, 100).catch(err => {
  console.log(`All Done!`);
  animateRight(btn, -100);
});
*/

/*
--------------------------------------------------------------------------------
186 - Parallel vs Sequential requests
--------------------------------------------------------------------------------
*/
// SEQUENTIAL REQUESTS
// const get3Pokemon = async function () {
//   try {
//     const poke1 = await fetch("https://pokeapi.co/api/v2/pokemon/1");
//     const poke2 = await fetch("https://pokeapi.co/api/v2/pokemon/2");
//     const poke3 = await fetch("https://pokeapi.co/api/v2/pokemon/3");
//     // return poke1.json();
//     console.log(poke1.json());
//     console.log(poke2.json());
//     console.log(poke3.json());
//   } catch (err) {
//     console.log(`Caught:`, err);
//   }
// };

// PARALLEL REQUESTs
const get3Pokemon = async function () {
  try {
    // Send all requests simultaneously and wait for all of them to complete
    const promises = [
      fetch("https://pokeapi.co/api/v2/pokemon/1"),
      fetch("https://pokeapi.co/api/v2/pokemon/2"),
      fetch("https://pokeapi.co/api/v2/pokemon/3"),
    ];

    const [poke1, poke2, poke3] = await Promise.all(promises);

    // Since fetch() only ensures the request completes ...
    // we need to convert the response to JSON
    const results = await Promise.all([
      poke1.json(),
      poke2.json(),
      poke3.json(),
    ]);

    // console.log(results[0].name);
    // console.log(results[1].name);
    // console.log(results[2].name);
    printPokemon(results);
  } catch (err) {
    console.log(`Caught:`, err);
  }
};

// Helper function to extract names from each data request
const printPokemon = function (results) {
  for (let poke of results) {
    console.log(poke.name);
  }
};

// get3Pokemon().then(res => console.log(res));
get3Pokemon();

////////////////////////////////////////////////////////////////////////////////

// Defining an async function
async function myAsyncFunction() {
  try {
    // Using 'await' to wait for a Promise to resolve
    let result1 = await fetchOperation(1);
    // Code here runs after the above Promise resolves
    console.log("1st poke:", result1.name);

    // Optionally, await more asynchronous operations
    let result2 = await fetchOperation(2);
    console.log("2nd poke:", result2.name);
  } catch (error) {
    // Error handling if any of the Promises are rejected
    console.error("An error occurred:", error);
  }
}

// Async operation example
const fetchOperation = function (num) {
  // Return the promise from fetch
  return fetch(`https://pokeapi.co/api/v2/pokemon/${num}`).then(response => {
    if (response.ok) {
      // Promise resolves with the JSON data
      return response.json();
    } else {
      // Response not ok, throw error
      // throw to external handling (catch) when function called
      throw new Error("Data response was not ok 🥺");
    }
  });
};

myAsyncFunction();

/*
function changeBodyColor(color, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color;
      resolve();
    }, delay);
  });
}

async function lightShow() {
  await changeBodyColor("teal", 1000); // Await promise, when resolved move to next line
  await changeBodyColor("red", 1000);
  await changeBodyColor("blue", 1000);
  await changeBodyColor("pink", 1000);
}

lightShow();
*/
