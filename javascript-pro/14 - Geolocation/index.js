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
// INTERSECTION OBSERVER [LAZY LOADING]
// -----------------------------------------------------------------------------

const IMAGE_URL = 'https://source.unsplash.com/random/';
const allImages = document.querySelectorAll('.lazy');

const options = {
    root: null, // viewport is the root
    rootMargin: '0px', // no margin around the root
    threshold: 0.8, // entry is considered visible when 100% of it is visible
};

// callback function for the IntersectionObserver
// receives an array of entries and the observer object
const loadImage = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // The image element being observed
            const img = entry.target;

            // Generate a random number between 0 and 1000
            // Create random URL for the image from Unsplash
            let randomImage = Math.floor(Math.random() * 1000);
            img.src = `${IMAGE_URL}${randomImage}`;

            // When the image is loaded, remove the 'lazy' class
            img.onload = () => {
                entry.target.classList.remove('lazy');
            };
            // Stop observing the image
            observer.unobserve(img);
        }
    });
};

const observer = new IntersectionObserver(loadImage, options);

allImages.forEach(image => observer.observe(image));

// -----------------------------------------------------------------------------
// INTERSECTION OBSERVER [STICKY NAVIGATION]
// -----------------------------------------------------------------------------

const navPrimary = document.querySelector('.navPrimary');
const navHeightPrimary = navPrimary.getBoundingClientRect().height;
const headerPrimary = document.querySelector('.headerPrimary');

const navSecondary = document.querySelector('.navSecondary');
const navHeightSecondary = navSecondary.getBoundingClientRect().height;
const headerSecondary = document.querySelector('.headerSecondary');

// Function to update the top position of the secondary nav
const updateSecondaryNavTop = () => {
    navSecondary.style.top = `${navHeightPrimary}px`;
};
// Call the function initially to set the correct top position
updateSecondaryNavTop();
// Call the function whenever the window is resized
window.addEventListener('resize', updateSecondaryNavTop);

const stickyPrimaryNav = (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        navPrimary.classList.add('sticky');
        navPrimary.style.top = '0';
    } else {
        navPrimary.classList.remove('sticky');
        navPrimary.removeAttribute('style');
    }
};

const observerPrimary = new IntersectionObserver(stickyPrimaryNav, {
    root: null,
    threshold: 0,
    rootMargin: `0px`,
});

const stickySecondaryNav = (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        navSecondary.classList.add('sticky');
        navSecondary.style.top = `${navHeightPrimary}px`;
    } else {
        navSecondary.classList.remove('sticky');
        navSecondary.removeAttribute('style');
    }
};

const observerSecondary = new IntersectionObserver(stickySecondaryNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeightSecondary}px`,
});

observerPrimary.observe(headerPrimary);
observerSecondary.observe(headerSecondary);
