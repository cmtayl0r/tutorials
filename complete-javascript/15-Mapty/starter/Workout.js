'use strict';
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
