'use strict';

/*
--------------------------------------------------------------------------------
176 - Fetch
--------------------------------------------------------------------------------
*/

fetch('https://swapi.dev/api/planets/')
    // Receives the response object from the fetch request
    .then(response => {
        // Guard clause to trigger error if HTTP response status indicates an error
        if (!response.ok) throw new Error(`Status Code: ${response.status}`);
        // Parse response object and return a promise
        return response.json();
    })
    .then(data => {
        // Process the data resolved from the promise
        // Display first 10 planets from page 1
        console.log('First 10 Planets 🪐');
        for (let planet of data.results) {
            console.log(planet.name);
        }
        // fetch sub-URL from data to display next 10 planets from page 2
        const nextPlanets = data.next;
        // Return fetch response as promise
        return fetch(nextPlanets);
    })
    .then(response => {
        // Guard clause to trigger error if HTTP response status indicates an error
        if (!response.ok) throw new Error(`Status Code: ${response.status}`);
        // Parse response object and return a promise
        return response.json();
    })
    .then(data => {
        // Process the data resolved from the promise
        console.log('Second 10 Planets 🪐');
        for (let planet of data.results) {
            console.log(planet.name);
        }
    })
    .catch(err => {
        // Handle any errors thrown during the fetch or processing stages
        console.log(`Something went wrong! ${err.message}`);
    });
