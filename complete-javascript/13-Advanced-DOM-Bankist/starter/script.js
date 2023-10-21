'use strict';

// -----------------------------------------------------------------------------
// DOM SELECTIONS
// -----------------------------------------------------------------------------

// Modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// Navigation
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// -----------------------------------------------------------------------------
// 🧩 MODAL WINDOW
// -----------------------------------------------------------------------------

// ⚙️ FN: Open modal function
const openModal = function (e) {
    // Stop # on a links moving page to top
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

// ⚙️ FN: Close modal function
const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

// Add event listener for each of the buttons that trigger the modal (two)
// Provide callback function to forEach
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// Close modal via button
btnCloseModal.addEventListener('click', closeModal);
// Close modal via overlay
overlay.addEventListener('click', closeModal);
// Close modal via esc key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// -----------------------------------------------------------------------------
// ⚙️ FN: SMOOTH SCROLLING
// -----------------------------------------------------------------------------

btnScrollTo.addEventListener('click', function (e) {
    // Get coordinates of section 1
    const s1coords = section1.getBoundingClientRect();
    // Scrolling
    // --> OLD SCHOOL WAY
    // window.scrollTo({
    //     // .top is relevant to viewport, NOT top of the page
    //     // add (+ window) position relevant to the page
    //     // current position + current scroll
    //     left: s1coords.left + window.pageXOffset,
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth',
    // });
    // --> NEW SCHOOL WAY
    // built-in method available on DOM elements
    section1.scrollIntoView({ behavior: 'smooth' });
});

// -----------------------------------------------------------------------------
// 🧩 PAGE NAVIGATION
// -----------------------------------------------------------------------------

// EVENT DELEGATION
// Step 1 - add event listener to common parent element of all the elements we interested in
// Step 2 - determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
    console.log(e.target);
    // Prevent anchor jump to section
    e.preventDefault();
    // Matching strategy
    // --> match only the elements we are interested in (the links)
    // --> enables you to ignore clicks on the parent container (nav__links)
    if (e.target.classList.contains('nav__link')) {
        // Get ID attribute of link
        // e.target === this element
        const id = e.target.getAttribute('href');
        // Scroll to relevant id attribute
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

// -----------------------------------------------------------------------------
// 🧩 TABS
// -----------------------------------------------------------------------------

// DOM selections
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Event handlers
// using forEach is bad practice for performance, use event delegation
// Apply eventListener to parent element, catch child bubbling
tabsContainer.addEventListener('click', function (e) {
    e.preventDefault();

    // 01 - Matching strategy (Event Delegation)
    // --> Each button has a <span> in it which creates an issue, we need .closest
    // --> When we click the button or the span, we get the button
    const clicked = e.target.closest('.operations__tab');

    // 02 - Ignore clicks on container (return null)
    // --> A "Guard clause", stop code being executed if true by returning asap
    if (!clicked) return;

    // 03 - Remove active classes
    // --> Remove active style on other tabs
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    // --> Remove visibility of tab content for all tabs
    tabsContent.forEach(tc =>
        tc.classList.remove('operations__content--active')
    );

    // 04 - Activate tabs
    // --> Toggle active state on tab
    // --> Add class to create active state on clicked tab
    clicked.classList.add('operations__tab--active');

    // 05 - Activate content area
    // --> make visible relevant content area
    // --> We leverage the data-set attribute on the HTML of each content area
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

////////////////////////////////////////////////////////////////////////////////
// LECTURE 193 - DOM Traversing

/*
// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
    'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// Header
const header = document.querySelector('.header');
header.append(message);

// Styles
// Creating inline styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// CSS variables
// :root equivalent to document
// document.documentElement.style.setProperty('--color-primary', 'orangeRed');

// Attributes
const logo = document.querySelector('.nav__logo');

console.log(logo.className); // nav__logo
console.log(logo.getAttribute('src')); // img/logo.png
console.log(logo.setAttribute('company', 'Bankist'));

const link = document.querySelector('.twitter-link');
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

*/
