'use strict';

//////////////////////////////////////////////////////////////////////////
// OBJECTS
// Data: fake API data as objects

//////////////////////////////////////////////////////////////////////////
// DOM ELEMENTS

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// -----------------------------------------------------------------------------
// 🛠️ CLASS: WORKOUT
// -----------------------------------------------------------------------------

class Workout {
    // Key properties
    date = new Date();
    id = (Date.now() + '').slice(-10); // temp ID solution

    constructor(coords, distance, duration) {
        this.coords = coords; // [lat, long]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }

    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(
            1
        )} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
}

// CHILDREN CLASSES
class Running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription(); // Set here because of type being set in child class
    }

    calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}
class Cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription(); // Set here because of type being set in child class
    }

    calcSpeed() {
        // min/km
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

// -----------------------------------------------------------------------------
// 🛠️ CLASS: APP
// -> Application architecture containing all the app methods
// -----------------------------------------------------------------------------
class App {
    // Public properties used similar to global variables
    #map; // Private class field declaration for storing the map instance
    #mapZoomLevel = 13;
    #mapEvent; // Private class field to store map click event data
    #workouts = []; // Empty array to store workouts

    constructor() {
        // Invokes a method to get the user's current geographical position
        this._getPosition();
        // Adds an event listener to workout form element (submit), binding the 'this' context for the '_newWorkout' method
        form.addEventListener('submit', this._newWorkout.bind(this));
        // Adds an event listener to input element (select) for detecting changes and toggling the elevation input field
        inputType.addEventListener('change', this._toggleElevationField);
        // Adds an event listener to x so when you click workout in list it moves to pin on map
        containerWorkouts.addEventListener(
            'click',
            this._moveToPopup.bind(this)
        );
    }

    _getPosition() {
        if (navigator.geolocation)
            // if, Checks if geolocation API is available in the browser
            navigator.geolocation.getCurrentPosition(
                // Callback function for success
                // If geolocation is successful, '_loadMap' is called with the bound 'this' context
                // by using bind(), you ensure that when _loadMap is called as the success callback ...
                // ... for getting the geolocation, 'this' inside _loadMap still refers to the class instance ...
                // ... allowing access to the class's private fields or any other methods
                this._loadMap.bind(this),
                function (error) {
                    // Error callback function
                    alert('could not get your position!');
                    console.log('Error occured: ' + error.message);
                }
            );
    }
    _loadMap(position) {
        // Position object from Geolocation API passed in
        const { latitude } = position.coords; // Destructuring to get latitude from the position object
        const { longitude } = position.coords; // Destructuring to get longitude from the position object
        const coords = [latitude, longitude]; // Creates an array with latitude and longitude

        // Connect leaflet map (L) to map id on html page
        // Initializes a Leaflet map and sets the view to the user's coordinates with a zoom level of 13
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        // Sets the tile layer for the map using OpenStreetMap tiles with Leaflet
        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            // Attribution for the tiles used
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map); // Adds the tile layer to the map

        // Reveal form on click
        // Adds a click event listener to the map, binding the 'this' context for the '_showForm' method
        this.#map.on('click', this._showForm.bind(this));
    }
    _showForm(mapE) {
        // Stores the click event object in the private field
        this.#mapEvent = mapE;
        // Removes the 'hidden' class from the form to make it visible
        form.classList.remove('hidden');
        // Sets the input focus to the inputDistance element to allow immediate input
        inputDistance.focus();
    }
    _hideForm() {
        // Clears all the input fields of workout form by setting their values to an empty string
        inputDistance.value =
            inputDuration.value =
            inputCadence.value =
            inputElevation.value =
                '';
        // Add the 'hidden' class from the form to make it invisible
        // FIXME: hack here to remove form on new workout submit ...
        // ... then change display value to get ready for next animation of form
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => (form.style.display = 'grid'), 1000);
    }
    _toggleElevationField() {
        // Event to toggle visibility of fields for running and cycling
        // Use closest() to traverse DOM and make nearest parent toggle class
        inputElevation
            .closest('.form__row') // Finds the closest ancestor of the inputElevation element with the class 'form__row'
            .classList.toggle('form__row--hidden'); // Toggles the class that hides the row
        inputCadence
            .closest('.form__row') // Finds the closest ancestor of the inputCadence element with the same class
            .classList.toggle('form__row--hidden'); // Toggles the class for visibility as well
    }
    _newWorkout(e) {
        e.preventDefault();

        // ⚙️ Helper function 1 --> for form validation
        // Use rest operator to take any amount of arguments in the form of a created array
        // Loop over array of form input values, and check if each number is finite
        // Returns true or false
        const validInputs = (...inputs) =>
            inputs.every(inp => Number.isFinite(inp));

        // ⚙️ Helper function 2 --> for form validation
        // Check if numbers inputted are positive
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);

        // 1a - Get data from the form
        const type = inputType.value;
        const distance = +inputDistance.value; // + = convert to number
        const duration = +inputDuration.value; // + = convert to number

        // 1b - Set block scope variables to use throughout function
        // Extracts latitude and longitude from the map click event object
        // --> Destructure property (latlng) from click object
        const { lat, lng } = this.#mapEvent.latlng;
        // Make workout variable available across function scope
        let workout;

        // 2a - If activity running, create running object
        // 'running' is value from select input
        if (type === 'running') {
            const cadence = +inputCadence.value; // + = convert to number
            // Check if data is valid
            // Guard. If not number, return instantly with alert (error)
            if (
                // !Number.isFinite(distance) ||
                // !Number.isFinite(duration) ||
                // !Number.isFinite(cadence)
                // Use helper functions to reduce duplication
                !validInputs(distance, duration, cadence) ||
                !allPositive(distance, duration, cadence)
            )
                return alert('Inputs have to be positive numbers');

            // If valid, create new Class object with values
            workout = new Running([lat, lng], distance, duration, cadence);
        }

        // 2b - If activity cycling, create cycling object
        // 'cycling' is value from select input
        if (type === 'cycling') {
            const elevation = +inputElevation.value; // + = convert to number
            // Check if data is valid
            // Guard. If not number, return instantly with alert (error)
            if (
                // Same helper function approach as running
                !validInputs(distance, duration, elevation) ||
                !allPositive(distance, duration, elevation)
            )
                return alert('Inputs have to be positive numbers');

            // If valid, create new Class object with values
            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        // 2c - Add new workout to workouts array
        this.#workouts.push(workout);

        // TODO: 3 - Add new object to workout array

        // 4 - Render workout on map as marker
        this._renderWorkoutMarker(workout);

        // 5 - Render workout on list
        this._renderWorkout(workout);

        // 6 - Hide form + Clear fields
        this._hideForm();
    }

    _renderWorkoutMarker(workout) {
        // Display/create Leaflet marker on map at the clicked location
        // pass in workout object coordinates (lat+lng)
        L.marker(workout.coords)
            .addTo(this.#map) // Adds the marker to the map
            .bindPopup(
                // Binds a popup to the marker
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false, // Prevents the popup from closing when the user clicks on the map
                    className: `${workout.type}-popup`, // Adds a custom class name to the popup for styling
                })
            )
            .setPopupContent(
                `${workout.type === 'running' ? '🏃‍♂️' : '🚴'} ${
                    workout.description
                }`
            ) // Sets the content of the popup
            .openPopup(); // Opens the popup immediately
    }
    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id="${
            workout.id
        }">
                <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__details">
                    <span class="workout__icon">${
                        workout.type === 'running' ? '🏃‍♂️' : '🚴'
                    }</span>
                    <span class="workout__value">${workout.distance}</span>
                    <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workout.duration}</span>
                    <span class="workout__unit">min</span>
                </div>
        `;
        if (workout.type === 'running') {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
            </div>
            </li>
            `;
        }
        if (workout.type === 'cycling') {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
            </div>
            </li>
            `;
        }
        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');
        // Guard clause. If no workout clicked (so null) just return
        if (!workoutEl) return;

        const workout = this.#workouts.find(
            work => work.id === workoutEl.dataset.id
        );

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1,
            },
        });
    }
}

// Creates a new instance of the App class
const app = new App();
