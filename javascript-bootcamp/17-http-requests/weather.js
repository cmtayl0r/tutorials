'use strict';

// https://api.weatherapi.com/v1/current.json?key=3d4405718ac2405eb42205350231312&q=london
/*
const fetchData = function (city) {
    // Fetch returns a promise
    // No need to wrap fetch in a "new Promise" (promise wrapping)
    return fetch(
        `https://api.weatherapi.com/v1/current.json?key=3d4405718ac2405eb42205350231312&q=${city}`
    ).then(response => {
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

fetchData('berlin').then(data => {
    console.log(data);

    const testData = document.querySelector('.test-data');
    testData.textContent = data.location.name;

    const icon = document.createElement('img');
    document.body.appendChild(icon);
    icon.setAttribute('src', data.current.condition.icon);
});
*/

// https://openweathermap.org/current
// https://openweathermap.org/forecast5

// Switch between C and F units
// Have an autocomplete search to select location

// DOM ELEMENTS
const realSection = document.querySelector('#realtime');
const foreSection = document.querySelector('#forecast');

// Variable to set metric unit
let units = 'metric';

async function fetchPlace(location) {
    try {
        // 1 - Start both API calls concurrently
        const rtPromise = fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=53901fa0797c3c9403358b2d02c1f9c8&units=&${units}`
        );
        const fcPromise = fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=53901fa0797c3c9403358b2d02c1f9c8&units=&${units}`
        );
        // 2 - Wait for both promises to resolve
        const responses = await Promise.all([rtPromise, fcPromise]);

        // 3 - Check for HTTP errors
        responses.forEach(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        });

        // 4 - Parse JSON from both responses
        let [realtime, forecast] = await Promise.all(
            responses.map(res => res.json())
        );

        console.log(realtime);
        console.log(forecast);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        if (realSection) {
            realSection.insertAdjacentHTML(
                'beforeend',
                `<p>${error.message}</p>`
            );
        }
    }
}

// Function for realtime data

// Function for forecast data

fetchPlace('Berlin');
