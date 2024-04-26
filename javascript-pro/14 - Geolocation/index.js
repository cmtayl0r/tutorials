// -----------------------------------------------------------------------------
// GEOLOCATION
// -----------------------------------------------------------------------------

const locationDisplay = document.querySelector('#locationDisplay');

// Check if the browser supports geolocation
// If it does, add an event listener to the button
document.querySelector('#getLocation').addEventListener('click', () => {
    if (navigator.geolocation) {
        // If ok, execute displayGeoData function
        // If not, execute displayError function
        navigator.geolocation.getCurrentPosition(displayGeoData, displayError);
    }
});

const displayGeoData = position => {
    // Destructuring the position object
    const { latitude, longitude } = position.coords;
    locationDisplay.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
};

const displayError = error => {
    locationDisplay.textContent = error.message || 'An unknown error occurred';
};

// -----------------------------------------------------------------------------
// INTERSECTION OBSERVER
// -----------------------------------------------------------------------------

// Create a new IntersectionObserver object
// receives a callback function as an argument, which receives an array of entries
// const observer = new IntersectionObserver(entries => {
//     // Loop through the entries
//     entries.forEach(entry => {
//         // If the entry is intersecting the viewport, log a message
//         if (entry.isIntersecting) {
//             console.log('Element is in view');
//         }
//     });
// });

// // Select the target element
// const target = document.querySelector('.targetElement');
// // Observe the target element
// observer.observe(target);

// Select all the ads
const ads = document.querySelectorAll('.ad');

let adViewTimes = []; // Array to store the time the ad was visible
let adVisibleStartTime; // Time when the ad became visible

// 1 - Observer options object
let options = {
    root: null, // viewport is the root
    rootMargin: '0px', // no margin around the root
    threshold: 0.5, // entry is considered visible when 100% of it is visible
};

// 2 - Observer callback function
// const observerCallback = function(entries)

// 3 - Create a new IntersectionObserver object
// has a callback function and the options object as arguments
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // destructuring the entry object to get the isIntersecting and id properties
        const { isIntersecting } = entry;
        const { id } = entry.target;
        if (isIntersecting) {
            console.log(`${id} ad is showing 👀`);
        } else {
            console.log(`${id} ad is NOT showing 🙈`);
        }
    });
}, options);

// 4 - Observe the target elements
// Loop through the ads and observe each one
ads.forEach(ad => observer.observe(ad));
