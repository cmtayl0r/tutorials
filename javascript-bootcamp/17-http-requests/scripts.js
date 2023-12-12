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
// 2 - Helper function - INFO CARDS
const populateHeroes = function (obj) {
    const heroes = obj.members;

    // for of loop
    for (let hero of heroes) {
        // article
        const myArticle = document.createElement('article');
        // h2, para1, para2 , para3, powerList
        // text content
        // sub for of loop for powers list
        // append to article
        myArticle.textContent = `${hero.name}`;
        section.appendChild(myArticle);
    }
};

// Top-level function
const populate = function () {
    fetch(
        'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json'
    )
        .then(response => {
            // Guard clause to trigger error if HTTP response status indicates an error
            if (!response.ok)
                throw new Error(`Status Code: ${response.status}`);
            // Parse response object as JSON and return a promise containing the parsed data
            return response.json();
        })
        .then(data => {
            // Process the data resolved from the promise
            console.log(data);
            populateHeader(data);
            populateHeroes(data);
        })
        .catch(err => {
            console.error(err);
        });
};

// Call function
populate();
