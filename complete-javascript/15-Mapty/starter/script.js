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

let map;
let mapEvent;

// -----------------------------------------------------------------------------
// 🛠️ CLASS: APP
// -> Containing all the app methods
// -----------------------------------------------------------------------------
class App {
    #map; // To access leaflet map in multiple functions
    #mapEvent; // To access leaflet map click object in multiple locations

    constructor() {
        this._getPosition();
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
    }

    _getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                function (error) {
                    alert('could not get your position!');
                    console.log('Error occured: ' + error.message);
                }
            );
    }
    _loadMap(position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        // Create array of lat + lon to use as properties in leaflet
        const coords = [latitude, longitude];

        // Connect leaflet map to map id on html page
        this.#map = L.map('map').setView(coords, 13);

        // Map made of small tiles from openstreetmap
        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);

        // Handle click events on map
        // Reveal form on click
        this.#map.on('click', this._showForm.bind(this));
    }
    _showForm(mapE) {
        this.#mapEvent = mapE;
        // Remove class from form to reveal
        form.classList.remove('hidden');
        // Focus input to start entering distance
        inputDistance.focus();
    }
    _toggleElevationField() {
        // Event to toggle visibility of fields for running and cycling
        // Use closest() to traverse DOM and make nearest parent toggle class
        inputElevation
            .closest('.form__row')
            .classList.toggle('form__row--hidden');
        inputCadence
            .closest('.form__row')
            .classList.toggle('form__row--hidden');
    }
    _newWorkout(e) {
        // Form event to make marker & popup visible on submit
        e.preventDefault();
        console.log(this);

        // Clear input fields
        inputDistance.value =
            inputDuration.value =
            inputCadence.value =
            inputElevation.value =
                '';
        // Display marker
        // --> Destructure property (latlng) from click object
        const { lat, lng } = this.#mapEvent.latlng;
        // Add marker to the map on click event
        L.marker([lat, lng])
            .addTo(this.#map)
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
    }
}

const app = new App();
