'use strict';

/*
--------------------------------------------------------------------------------
176 - Fetch
--------------------------------------------------------------------------------
*/

/*
// HELPER FUNCTION 1
const checkAndParse = function (response) {
    // Guard clause to trigger error if HTTP response status indicates an error
    if (!response.ok) throw new Error(`Status Code: ${response.status}`);
    // Parse response object as JSON and return a promise containing the parsed data
    return response.json();
};

// HELPER FUNCTION 2
const printPlanets = function (data) {
    // Process the data resolved from the promise
    console.log(`Some Planets 🪐 ...`);
    // Iterate over data and print planet names
    for (let planet of data.results) {
        console.log(planet.name);
    }
    // Return the original data as a promise to maintain the promise chain
    return Promise.resolve(data);
};

// HELPER FUNCTION 3
const fetchMorePlanets = function (url) {
    // Fetch data from the provided URL (expected to be the URL for the next page of planets)
    const nextPlanets = url.next;
    // Return fetch response as promise
    return fetch(nextPlanets);
};

fetch('https://swapi.dev/api/planets/')
    // Receives the initial response object from the fetch request
    .then(checkAndParse)
    .then(printPlanets)
    .then(fetchMorePlanets)
    .then(checkAndParse)
    .then(printPlanets)
    .catch(err => {
        // Handle any errors thrown during the fetch or processing stages
        console.log(`Something went wrong! ${err.message}`);
    });
*/

/*
--------------------------------------------------------------------------------
SUPER HEROES - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
--------------------------------------------------------------------------------
*/

// DOM ELEMENTS
const header = document.querySelector('header');
const section = document.querySelector('section');

// 1 - Helper function - HEADER
const populateHeader = function (obj) {
    // Header
    const myH1 = document.createElement('h1');
    myH1.textContent = obj.squadName;
    header.appendChild(myH1);
    // Description
    const myPara = document.createElement('p');
    myPara.textContent = `Hometown: ${obj.homeTown} // Formed ${obj.formed}`;
    header.appendChild(myPara);
};

// 2 - Helper function - CREATE ELEMENTS IN INFO CARDS
const createElement = function (type, parent, textContent = '') {
    const element = document.createElement(type);
    element.textContent = textContent;
    parent.appendChild(element);
    return element;
};

// 3 - Helper function - INFO CARDS
const populateHeroes = function (obj) {
    const heroes = obj.members;

    // for of loop to generate cards
    for (let hero of heroes) {
        // 1 - Create container element using helper function
        const myArticle = createElement('article', section);

        // 2 - Execute helper function to create and populate card elements
        createElement('h2', myArticle, hero.name);
        createElement('p', myArticle, `Age: ${hero.age}`);
        createElement(
            'p',
            myArticle,
            `Secret Identity: ${hero.secretIdentity}`
        );
        createElement('p', myArticle, `Superpowers:`);

        // 3 - Create sub-container element
        const myList = createElement('ul', myArticle);

        // 4 - Sub-loop for items in sub-container
        const powers = hero.powers;
        for (let power of powers) {
            createElement('li', myList, `${power}`);
        }
    }
};

// Create promise-based function
// Receive url as argument
const fetchData = function (url) {
    // Fetch returns a promise
    // No need to wrap fetch in a "new Promise" (promise wrapping)
    return fetch(url).then(response => {
        if (response.ok) {
            // Return parsed response object
            return response.json();
        } else {
            // Response not ok, throw error
            // throw to external handling (catch) when function called
            throw new Error('Data response was not ok 🥺');
        }
    });
};

// Call promise-based function
fetchData(
    'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json'
)
    .then(data => {
        // Process data
        console.log(data);
        // Execute helper functions, pass resolved data object
        populateHeader(data);
        populateHeroes(data);
    })
    .catch(err => {
        // Handle errors specific to this fetchData call
        console.error(err);
    });
