'use strict';

const whereAmI = function (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            console.log(`You are in ${data.city}, ${data.country}`);
            return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            return renderCountry(data[0]);
        })
        .catch(err => {
            renderError(`Summat went wrong bruv ${err}`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};

whereAmI('-33.933', '18.474');
