'use strict';

// https://countries-api-836d.onrender.com/countries/

// Selecting DOM elements
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

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

const getCountryData = function (country) {
    // Chaining promises

    // Country 1
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        // Convert response from API to JSON
        .then(response => response.json())
        .then(data => {
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
    getCountryData('united kingdom');
});
