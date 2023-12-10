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

/*
// CONSUME THE PROMISE
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
*/

// -----------------------------------------------------------------------------
// CHALLENGE 3
// -----------------------------------------------------------------------------

// PART 1
const loadNPause = async function () {
    try {
        // Load image 1
        let img = await createImage('img/img-1.jpg');
        console.log('Image 1 loaded');
        await waitFn(2);
        img.style.display = 'none';
        // Load image 2
        img = await createImage('img/img-2.jpg');
        console.log('Image 2 loaded');
        await waitFn(2);
        img.style.display = 'none';
        // Load image 3
        img = await createImage('img/img-3.jpg');
        console.log('Image 3 loaded');
    } catch (err) {
        console.error(err);
    }
};
// loadNPause();
// PART 2

// asynchronous function that takes an array (imgArr) of image paths
const loadAll = async function (imgArr) {
    try {
        // Maps over each image path in imgArr,
        // calling createImage() for each one and awaiting its resolution.
        // This results in an array of promises.
        const imgs = imgArr.map(async img => await createImage(img));
        console.log(imgs); // [Promise, Promise, Promise]

        // Awaits the resolution of all promises in the imgs array using Promise.all
        // resulting in an array of image element
        const imgEl = await Promise.all(imgs);
        console.log(imgEl); // [img, img, img]

        // Adds the class parallel to each image element in the imgEl array.
        imgEl.forEach(img => img.classList.add('parallel'));
    } catch (err) {
        console.error(err);
    }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
