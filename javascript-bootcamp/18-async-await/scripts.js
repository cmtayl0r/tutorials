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

// PROMISE BASED
const getPlanets = function () {
  return fetch("https://swapi.dev/api/planets/");
};

getPlanets()
  .then(res => res.json())
  .then(data => console.log(data));

// ASYNC AWAIT
async function getPlanetz() {
  const res = await fetch("https://swapi.dev/api/planets/");
  return res.json();
}

getPlanetz().then(res => console.log(res));
