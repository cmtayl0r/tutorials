'use strict';

// -----------------------------------------------------------------------------
// CHALLENGE 1
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// CHALLENGE 2
// -----------------------------------------------------------------------------

// DOM elements
const imageContainer = document.querySelector('.images');

// Helper function
const waitFn = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

// CREATE THE PROMISE

const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        // 1. Create image element in DOM, set src attribute
        const image = document.createElement('img');
        image.setAttribute('src', imgPath);

        // 2. When image done loading
        image.addEventListener('load', function () {
            // Append image to container
            imageContainer.append(image);
            // Resolve the promise
            // Resolve vale should be the image
            resolve(image);
        });
        // 3. If error occurs in loading
        image.addEventListener('error', function () {
            // Reject the promise
            reject(new Error('Image not found 💥'));
        });
    });
};

// Set global variable to hide images in promise chain
let currentImg;

// CONSUME THE PROMISE'
createImage('img/img-1.jpg')
    // Receive 'image' as the resolved value
    .then(image => {
        currentImg = image;
        console.log('Image 1 loaded');
        return waitFn(2);
    })
    .then(() => {
        currentImg.style.display = 'none';
        return createImage('img/img-2.jpg');
    })
    .then(image => {
        currentImg = image;
        console.log('Image 2 loaded');
        return waitFn(2);
    })
    .then(() => {
        currentImg.style.display = 'none';
        return createImage('img/img-3.jpg');
    })
    .then(image => {
        currentImg = image;
        console.log('Image 3 loaded');
        return waitFn(2);
    })
    .then(() => {
        currentImg.style.display = 'none';
    })
    .catch(err => console.error(`${err.message}`));
