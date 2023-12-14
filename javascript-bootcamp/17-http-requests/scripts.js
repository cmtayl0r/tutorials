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
GIPHY - https://www.theodinproject.com/lessons/node-path-javascript-working-with-apis
--------------------------------------------------------------------------------
*/

// DOM elments
const img = document.querySelector('#gif');
const loadingGif = document.querySelector('#loadingGif');
const container = document.querySelector('section');
const btnNew = document.querySelector('.btn--new');
const btnFind = document.querySelector('.form__btn');
const formFind = document.querySelector('.form');
const inputFind = document.querySelector('.form__input');
const queryTitle = document.querySelector('h2');

// Global variable for search query
let searchQuery;

// Create promise-based function
// Receive query keyword as argument
const fetchData = function (keyword) {
    // Show the loading GIF and hide image at the start
    loadingGif.style.display = 'block';
    img.style.display = 'none';

    // Assigns the passed 'keyword' to the global variable 'searchQuery'
    searchQuery = keyword;

    // Fetch returns a promise
    // No need to wrap fetch in a "new Promise" (promise wrapping)
    return fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=Exa5gXbGLGErrkoWHv0IvkXzjE12ktDZ&s=${searchQuery}`,
        { mode: 'cors' }
    )
        .then(response => {
            if (response.ok) {
                // Return parsed response object
                return response.json();
            } else {
                // Response not ok, throw error
                // throw to external handling (catch) when function called
                throw new Error('Data response was not ok 🥺');
            }
        })
        .then(data => {
            // Process data
            console.log(data);

            // Handle no results error
            // If no results Giphy returns an empty array
            // Check if certain data exists to determine if to show No results image
            if (data.data.images) {
                queryTitle.textContent = `Showing: ${searchQuery}`;
                img.setAttribute('src', data.data.images.original.url);
                img.style.display = 'block';
            } else {
                queryTitle.textContent = `No results, enter a new search query`;
                img.setAttribute('src', 'no-result.png');
                img.style.display = 'block';
            }
        })
        .catch(err => {
            // Handle errors specific to this fetchData call
            console.error('ERROR ERROR', err.message);
            // show API error image
            img.setAttribute('src', 'api-error.png');
            img.style.display = 'block';
        })
        .finally(() => {
            document.getElementById('loadingGif').style.display = 'none';
        });
};

// Run function on page load, set default GIF query
fetchData('dogs');

// Input to set new GIF topic
formFind.addEventListener('submit', evt => {
    evt.preventDefault();
    searchQuery = inputFind.value; // Attach input value to variable
    fetchData(searchQuery); // Run function
    inputFind.value = ''; // Clear the input field
});

// Refresh GIF based on current query
btnNew.addEventListener('click', () => fetchData(searchQuery));
