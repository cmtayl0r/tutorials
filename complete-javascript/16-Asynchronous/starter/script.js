'use strict';

// https://countries-api-836d.onrender.com/countries/
// https://restcountries.com/#endpoints-code

// Selecting DOM elements
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Helper function
// Render country on web page
const renderCountry = function (data, className = '') {
    console.log(data);

    const languageKey = Object.keys(data.languages || {})[0];
    const language = languageKey ? data.languages[languageKey] : 'N/A';
    const currencyKey = Object.keys(data.currencies || {})[0];
    const currency = currencyKey ? data.currencies[currencyKey] : 'N/A';

    const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
        ).toFixed(1)}m people</p>
        <p class="country__row"><span>🗣️</span>${language}</p>
        <p class="country__row"><span>💰</span>${currency.name}</p>
      </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
};

// Render error on API promise errors
const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
};

/*
const getCountryData = function (country) {
    // Chaining promises

    // Country 1
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        // Convert response from API to JSON
        .then(response => {
            console.log(response);
            // If response not "ok"
            if (!response.ok) {
                // throw immediately terminates a function
                // rejected promise always jumps to catch
                // Handles error content in err.message
                throw new Error(`Country not found (${response.status})`);
            }
            // Convert the response to JSON and return it as a new promise
            return response.json();
        })
        // Then do something with the response object data
        .then(data => {
            console.log(data);
            // render first country
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];

            // Guard clause if no neighbour exists
            if (!neighbour) return;

            // Country 2
            // return a new promise
            return fetch(
                `https://restcountries.com/v3.1/alpha?codes=${neighbour}`
            );
        })
        // Convert response from API to JSON
        .then(response => response.json())
        // render second country
        // add css class to container
        .then(data => renderCountry(data[0], 'neighbour'))
        // Catch any errors that occur in this promise chain
        .catch(err => {
            renderError(
                `Something went wrong 💥💥💥 ${err.message}. Try again!`
            );
        })
        // 'finally' executes code regardless of the promises fate
        // example - show loading spinner, hide when promise fulfilled
        // this example, fade in the country, OR the error message
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};
*/

// Helper function to reduce code duplication in promise
// This function will return a promise (because of 'then' usage)
const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
        // If response not "ok"
        if (!response.ok) {
            // throw immediately terminates a function
            // rejected promise always jumps to catch
            // Handles error content in err.message
            throw new Error(`${errorMsg} (${response.status})`);
        }
        // Convert the response to JSON and return it as a new promise
        return response.json();
    });
};

const getCountryData = function (country) {
    // Country 1
    getJSON(
        `https://restcountries.com/v3.1/name/${country}`,
        'Country not found'
    )
        .then(data => {
            // render first country
            renderCountry(data[0]);
            // Attach neighbour to a variable
            const neighbour = data[0].borders[0];

            console.log(neighbour);

            // Guard clause if no neighbour exists
            // reject promise
            if (!neighbour) throw new Error('No neighbour found!');

            // Country 2
            // return a new promise
            return getJSON(
                `https://restcountries.com/v3.1/alpha?codes=${neighbour}`,
                'Country not found'
            );
        })
        // render second country using helper function
        // add css class to container
        .then(data => renderCountry(data[0], 'neighbour'))
        // Catch any errors that occur in this promise chain
        .catch(err => {
            renderError(
                `Something went wrong 💥💥💥 ${err.message}. Try again!`
            );
        })
        // 'finally' executes code regardless of the promises fate
        // example - show loading spinner, hide when promise fulfilled
        // this example, fade in the country, OR the error message
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};

btn.addEventListener('click', function () {
    getCountryData('australia');
});
