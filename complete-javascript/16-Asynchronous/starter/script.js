'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// https://countries-api-836d.onrender.com/countries/

// AJAX call country 1
const getCountryData = function (country, className = '') {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    // Function to render country
    const renderCountry = function (data) {
        // Access first values of nested object values in API
        const firstLanguageKey = Object.keys(data.languages)[0];
        const firstLanguage = data.languages[firstLanguageKey];
        const firstCurrencyKey = Object.keys(data.currencies)[0];
        const firstCurrency = data.currencies[firstCurrencyKey].name;

        // Calc population = use + to convert to number, then calculate
        const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${firstLanguage}</p>
            <p class="country__row"><span>💰</span>${firstCurrency}</p>
          </div>
        </article>
        `;

        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
    };

    request.addEventListener('load', function () {
        //this = the request
        // Convert JSON string into an object (JSON.parse)
        // Destructure to directly extract the first element from the array...
        // ... without having to access it with an index like array[0]
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        // Render country 1
        renderCountry(data);

        const neighbour = data.borders?.[0];

        // Guard claus eif no neighbours exists
        if (!neighbour) return;

        // AJAX call country 2
        const request2 = new XMLHttpRequest();
        request2.open(
            'GET',
            `https://restcountries.com/v3.1/alpha?codes=${neighbour}`
        );
        request2.send();

        request2.addEventListener('load', function () {
            const [data2] = JSON.parse(this.responseText);
            console.log(data2);

            // Render country 2
            renderCountry(data2, 'neighbour');
        });
    });
};

getCountryData('usa');
