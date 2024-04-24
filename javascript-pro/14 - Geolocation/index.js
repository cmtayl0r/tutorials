// -----------------------------------------------------------------------------
// GEOLOCATION
// -----------------------------------------------------------------------------

const locationDisplay = document.querySelector('#locationDisplay');

document.querySelector('#getLocation').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayGeoData, displayError);
    }
});

const displayGeoData = position => {
    console.log(position);
    const { latitude, longitude } = position.coords;
    locationDisplay.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
};

const displayError = error => {
    locationDisplay.textContent = error.message || 'An unknown error occurred';
    console.log(error);
};
