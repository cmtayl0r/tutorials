'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

navigator.geolocation.getCurrentPosition(
    function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        // Create array of lat + lon to use as properties in leaflet
        const coords = [latitude, longitude];

        // COnnect leaflet map to map id on html page
        const map = L.map('map').setView(coords, 13);

        // Map made of small tiles from openstreetmap
        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker(coords)
            .addTo(map)
            .bindPopup('A pretty CSS popup.<br> Easily customizable.')
            .openPopup();
    },
    function (error) {
        alert('could not get your position!');
        console.log('Error occured: ' + error.message);
    }
);
