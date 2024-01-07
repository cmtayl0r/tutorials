'use strict';

// FEATURES
// Show realtime and 5 day forecast data
// Search input to search for location
// Switch between C and F units
// Show loading state for data
// Have an autocomplete search to select location
// Background image change dependent on weather (use unsplash etc)
// Mobile version tab switch between realtime and forecast
// Add "use current location" action to call coords

// DOM ELEMENTS
const rtSection = document.querySelector('#realtime');
const fcSection = document.querySelector('#forecast');
const rtLocation = document.querySelector('.rt__city');
const rtTemp = document.querySelector('.rt__temp');
const rtSummary = document.querySelector('.rt__summary');
const rtTime = document.querySelector('.rt__timedate');
const rtFeels = document.querySelector('.rt__feels');
const rtHigh = document.querySelector('.rt__high');
const rtLow = document.querySelector('.rt__low');
const rtIcon = document.querySelector('#rt__icon');

// Variable to set measure unit default
let units = 'metric';

async function fetchLocation(location) {
    try {
        // 1 - Start both API calls concurrently
        const rtPromise = fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=53901fa0797c3c9403358b2d02c1f9c8&units=${units}`
        );
        const fcPromise = fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=53901fa0797c3c9403358b2d02c1f9c8&units=${units}`
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
        rtDisplay(realtime);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        if (rtSection) {
            rtSection.insertAdjacentHTML(
                'beforeend',
                `<p>${error.message}</p>`
            );
        }
    }
}

fetchLocation('Berlin');

// ⚙️ Function for realtime data

const rtDisplay = function (data) {
    rtLocation.textContent = data.name;
    rtTemp.textContent = data.main.temp.toFixed(0);
    rtSummary.textContent = data.weather[0].description;
    rtIcon.setAttribute(
        'src',
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );
    rtFeels.textContent = `Feels like ${data.main.feels_like.toFixed(0)}`;
    rtHigh.textContent = `High of ${data.main.temp_max.toFixed(0)}`;
    rtLow.textContent = `Low of ${data.main.temp_min.toFixed(0)}`;
    getDate();
};

const getDate = function () {
    const now = new Date();
    rtTime.textContent = now.toDateString();
};

// ⚙️ Function for forecast data

// ⚙️ Search input

// ⚙️ Loading

// ⚙️ Empty state / Error location input

// ⚙️ Change background based on weather
