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
    // console.log(data);

    // Specific values from API data
    const languageKey = Object.keys(data.languages || {})[0];
    const language = languageKey ? data.languages[languageKey] : 'N/A';
    const currencyKey = Object.keys(data.currencies || {})[0];
    const currency = currencyKey ? data.currencies[currencyKey] : 'N/A';

    // Render HTML with API data values
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
    // Make Card container visible
    countriesContainer.style.opacity = 1;
};

// Render error on API promise errors
const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    // Make Card container visible
    countriesContainer.style.opacity = 1;
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

/*
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
    getCountryData('austria');
});
*/

/*
--------------------------------------------------------------------------------
THE EVENT LOOP IN PRACTICE
--------------------------------------------------------------------------------
*/

/*
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved Promise 1').then(res => console.log(res));
Promise.resolve('Resolved Promise 2').then(res => {
    for (let i = 0; i < 1000000000; i++) {
        // Simulate microtask is taking a long time
        // setTimeout will only be executed after the microtask (promise)
    }
    console.log(res);
});
console.log('Test end');
*/

/*
Execution order:
Test start (synchronous executed first)
Test end (synchronous executed first)
Resolved Promise 1 (microtask queue prioritised over callback queue)
Resolved Promise 2 (microtask queue prioritised over callback queue)
0 sec timer (callback queue)
*/

/*
--------------------------------------------------------------------------------
BUILDING A SIMPLE PROMISE
--------------------------------------------------------------------------------
*/

// Promise constructor = special kind of object in JavaScript
// Takes 1 argument, the "executor function"
// The executer function passes in 2 arguments as functions (resolve and reject)
/*
const lotteryPromise = new Promise(function (resolve, reject) {
    if (Math.random() >= 0.5) {
        resolve('you WIN! 💰');
    } else {
        reject(new Error('You lost your money 💩'));
    }
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
*/
/*
// A function that returns a promise
// Just like the Fetch API function
// Promisifying setTimeout
*/
const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

// Consume the promise
// chain promises then by return the function containing a promise
// wait(2)
//     .then(() => {
//         console.log('I waited for 2 seconds');
//         return wait(1);
//     })
//     .then(() => {
//         console.log('I waited for 1 second');
//         return wait(3);
//     })
//     .then(() => {
//         console.log('I waited for 3 seconds');
//     });

/*
--------------------------------------------------------------------------------
Promisifying the Geolocation API
--------------------------------------------------------------------------------
*/

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            err => reject(err)
        );
    });
};

// getPosition().then(pos => console.log(pos));

/*
const whereAmI = function () {
    getPosition()
        .then(pos => {
            // destructure latitude and longitude values from geolocation object
            const { latitude: lat, longitude: lng } = pos.coords;
            // Return new promise and fetch data from Geocode API
            return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        })
        .then(res => {
            // Use response object returned by geocode
            // Reject promise if geocode data not found
            if (!res.ok)
                throw new Error(`Problem with geocoding ${res.status}`);
            // Convert the response to JSON and return it as a new promise
            return res.json();
        })
        .then(data => {
            console.log(`You are in ${data.city}, ${data.country}`);
            return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
        })
        .then(res => {
            // Use response object returned by restcountries
            // Reject promise if geocode data not found
            if (!res.ok) throw new Error(`Country not found (${res.status})`);
            // Convert the response to JSON and return it as a new promise
            return res.json();
        })
        // Run helper function to render country card
        .catch(err => {
            console.error(`${err.message} 💥`);
            renderError(
                `Something went wrong 💥💥💥 ${err.message}. Try again!`
            );
        })
        // 'finally' executes code regardless of the promises fate
        // example - show loading spinner, hide when promise fulfilled
        // this example, fade in the country card, OR the error message
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};

btn.addEventListener('click', whereAmI);
*/

/*
--------------------------------------------------------------------------------
ASYNC / AWAIT
--------------------------------------------------------------------------------
*/

// Async await is syntactic sugar over then() in promises

// Function runs asynchronously in the background, not blocking the call stack
const whereAmI = async function () {
    try {
        // 1 - Geolocation
        // Await until promise fulfilled
        const position = await getPosition();
        // Destructure values from Geolocation object
        const { latitude: lat, longitude: lng } = position.coords;
        // Defined in promise (getPromise()), any error here will get caught in the catch block

        // 2 - Reverse geocoding
        // Await until promise fulfilled
        const resGeo = await fetch(
            `https://geocode.xyz/${lat},${lng}?geoit=json`
        );
        // Guard clause - handles any error in the fetch
        if (!resGeo.ok) throw new Error('Problem getting location data');
        // Use the JSON from the response, return a new promise
        // Await until promise fulfilled
        const dataGeo = await resGeo.json();

        // 3 - Country data
        // Await until promise fulfilled
        const res = await fetch(
            `https://restcountries.com/v3.1/name/${dataGeo.country}`
        );
        // Guard clause - handles any error in the fetch
        if (!res.ok) throw new Error('Problem getting country');
        // Use the JSON from the response, return a new promise
        // Await until promise fulfilled
        const data = await res.json();

        // Run helper function to generate country card from API data
        renderCountry(data[0]);

        return `You are in ${dataGeo.city}, ${dataGeo.country}`;
    } catch {
        console.error(err);
    }
};

console.log('1: Will get location');
(async function () {
    try {
        // display returned value from whereAmI() async function
        const returnValue = await whereAmI();
        console.log(`2: ${returnValue}`);
    } catch {
        console.log(`2: ${err.message} `);
    }
    // Outside try catch blocks is like "finally()" in promises
    console.log('3: Finished getting location');
})();

/*
--------------------------------------------------------------------------------
RUNNING PROMISES IN PARALLEL
--------------------------------------------------------------------------------
*/

const get3countries = async function (c1, c2, c3) {
    try {
        // const [data1] = await getJSON(
        //     `https://restcountries.com/v3.1/name/${c1}`
        // );
        // const [data2] = await getJSON(
        //     `https://restcountries.com/v3.1/name/${c2}`
        // );
        // const [data3] = await getJSON(
        //     `https://restcountries.com/v3.1/name/${c3}`
        // );
        // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);

        // Take in an array of promises and return a new promise at the same time
        const data = await Promise.all([
            getJSON(`https://restcountries.com/v3.1/name/${c1}`),
            getJSON(`https://restcountries.com/v3.1/name/${c2}`),
            getJSON(`https://restcountries.com/v3.1/name/${c3}`),
        ]);
        // Loop over returned arrays and get value we need  (d = the array)
        console.log(data.map(d => d[0].capital[0]));
    } catch {
        console.error(err);
    }
};
get3countries('germany', 'canada', 'tanzania');
