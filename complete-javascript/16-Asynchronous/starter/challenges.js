'use strict';

// CHALLENGE 1

/*
const whereAmI = function (lat, lng) {
    // Fetch data from Geocode API
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        // Get and convert the response to JSON and return it as a new promise
        .then(response => {
            // Reject promise if geocode data not found
            if (!response.ok)
                throw new Error(`Problem with geocoding ${response.status}`);
            return response.json();
        })
        // Do something with the response object
        .then(data => {
            console.log(`You are in ${data.city}, ${data.country}`);
            // fetch data from new API using data from original API
            return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
        })
        // Convert the response to JSON and return it as a new promise
        .then(response => {
            // Reject promise if country not found
            if (!response.ok)
                throw new Error(`Country not found ${response.status}`);
            return response.json();
        })
        // Do something with the response object
        .then(data => {
            // Run helper function to render country
            return renderCountry(data[0]);
        })
        .catch(err => {
            // Run error function
            renderError(`Summat went wrong bruv ${err.message}`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};

whereAmI('52.508', '13.381');
*/
