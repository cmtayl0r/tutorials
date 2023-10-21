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

////////////////////////////////////////////////////////////////////////////////
// LECTURE 193 - DOM Traversing

const h1 = document.querySelector('h1');

// 1 - Going downwards / Selecting child elements
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
// NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
console.log(h1.children);
// HTMLCollection(3) [span.highlight, br, span.highlight]
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// 2 - Going upwards / Parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// 3 - Sideways / Siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// get siblings via parent
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (el) {
    if (el !== h1) el.style.transform = 'scale(0.5)';
});

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
