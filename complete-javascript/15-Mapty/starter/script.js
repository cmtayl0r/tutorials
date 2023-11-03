'use strict';

//////////////////////////////////////////////////////////////////////////
// OBJECTS
// Data: fake API data as objects

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//////////////////////////////////////////////////////////////////////////
// DOM ELEMENTS

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//////////////////////////////////////////////////////////////////////////
// GLOBAL VARIABLES

let map; // To access leaflet map in multiple functions
let mapEvent; // To access map click object in multiple locations

// -----------------------------------------------------------------------------
// 🔌 LEAFLET MAP
// -> Display map and markers
// -----------------------------------------------------------------------------

navigator.geolocation.getCurrentPosition(
    function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        // Create array of lat + lon to use as properties in leaflet
        const coords = [latitude, longitude];

        // Connect leaflet map to map id on html page
        map = L.map('map').setView(coords, 13);

        // Map made of small tiles from openstreetmap
        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Handle click events on map
        // Create pin wherever clicked on map
        map.on('click', function (mapE) {
            mapEvent = mapE;
            // Remove class from form to reveal
            form.classList.remove('hidden');
            // Focus input to start entering distance
            inputDistance.focus();
        });
    },
    function (error) {
        alert('could not get your position!');
        console.log('Error occured: ' + error.message);
    }
);

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear input fields
    inputDistance.value =
        inputDuration.value =
        inputCadence.value =
        inputElevation.value =
            '';
    // Display marker
    // --> Destructure property (latlng) from click object
    const { lat, lng } = mapEvent.latlng;
    // Add marker to the map on click event
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup',
            })
        )
        .setPopupContent('Workout')
        .openPopup();
});

// Event to toggle visibility of fields for running and cycling
inputType.addEventListener('change', function () {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
