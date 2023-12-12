'use strict';

/*
--------------------------------------------------------------------------------
176 - Fetch
--------------------------------------------------------------------------------
*/

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
