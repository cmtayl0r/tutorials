// -----------------------------------------------------------------------------
// SETTIMEOUT
// -----------------------------------------------------------------------------

function showNotification(message, duration) {
    const notification = document.createElement('div');
    notification.innerHTML = message;
    notification.className = 'notification';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, duration);
}

showNotification('This is a notification message', 4000);

// -----------------------------------------------------------------------------
// SETINTERVAL
// -----------------------------------------------------------------------------

// Random colors
const colorBlocks = document.querySelectorAll('.clr-blk');

function randomRGB() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

// function to change the color of the blocks
function randomColors() {
    // loop through the color blocks and change the color
    colorBlocks.forEach(div => {
        div.style.backgroundColor = randomRGB();
    });
}
// call the function every 1.5 seconds
// setInterval(randomColors, 1000);

// countdown
const timerText = document.querySelector('.timer');

function startCountdown(duration) {
    let secondsRemaining = duration;
    const timer = setInterval(function () {
        console.log(`⏲️ ${secondsRemaining} seconds remain`);
        timerText.innerText = `⏲️ ${secondsRemaining}`;
        secondsRemaining--;

        if (secondsRemaining === -1) {
            console.log('Timer finished!');
            timerText.innerText = `🏁 Timer finished!`;
            clearInterval(timer);
        }
    }, 1000);
}

// startCountdown(10);

// -----------------------------------------------------------------------------
// DEBOUNCE
// -----------------------------------------------------------------------------

const searchInput = document.querySelector('#search');

// Debounce function
// This function will return a new function that will be called ...
// every time an event is triggered
// parameters are the callback function and the delay
function debounce(callback, delay = 1000) {
    // variable to store the timeoutID
    let timeoutID;

    // return a new function that will be called every time the event is triggered
    // spread operator to get all the arguments from the debounced function
    return function (...args) {
        // save the context of the function
        const context = this;

        // if event is triggered again, the timeout will be cleared
        clearTimeout(timeoutID);

        // if event is not triggered again, the timeout will be set
        timeoutID = setTimeout(() => {
            // when timeout is finished ...
            // apply the callback function with the arguments and context
            callback.apply(context, args);
        }, delay);
    };
}

// Function to debounce on input entry
function fakeQueryAPI(searchTerm, otherArg) {
    console.log(`SEARCHING THE API for ${searchTerm}`);
    console.log('MAKING AN API REQUEST');
    console.log(`ANOTHER ARGUMENT: ${otherArg}`);
}

// const debouncedQueryAPI = debounce(fakeQueryAPI, 1000);

// Event listener for the search input to call the debounced function
searchInput.addEventListener(
    'input',
    debounce(() => {
        // 'this' refers to the searchInput
        fakeQueryAPI(this.value, '2nd Argument');
    }, 1000)
);

// -----------------------------------------------------------------------------
// THROTTLE
// -----------------------------------------------------------------------------

const content = document.getElementById('content');
const SCROLL_THRESHOLD = 200; // Threshold for loading more items

function throttle(callback, limit) {
    let isThrottled = false; // Closure variable to track timeout
    return function () {
        if (!isThrottled) {
            callback.apply(null, arguments); // Execute function with context and arguments
            isThrottled = true;
            setTimeout(function () {
                isThrottled = false; // Reset isThrottled flag after the limit period
            }, limit);
        }
    };
}

function getRandomColor() {
    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
    })`;
}

// Function to load more items when the user scrolls to the bottom of the page
// this will be throttled to only run every 1 second
function loadMoreItems() {
    // calculate the distance to the bottom of the page

    const scrollDistanceToBottom =
        document.documentElement.scrollHeight -
        window.scrollY -
        window.innerHeight;

    // if the distance to the bottom is less than 200px
    if (scrollDistanceToBottom < SCROLL_THRESHOLD) {
        console.log('LOADING MORE ITEMS FROM API!');
        // append 10 more items to the content div
        // doesnt append when scrolling up
        for (let i = 0; i < 10; i++) {
            const item = document.createElement('div');
            item.className = 'item';
            item.innerText = `Item ${content.children.length + 1}`; // number of items + 1
            item.style.backgroundColor = getRandomColor();
            content.appendChild(item);
            item.setAttribute('aria-live', 'polite'); // Making dynamic content accessible
        }
    }
}

// Event listener for scroll event
window.addEventListener(
    'scroll',
    throttle(() => {
        loadMoreItems();
    }, 500)
);

loadMoreItems(); // initial load of first 10 items
