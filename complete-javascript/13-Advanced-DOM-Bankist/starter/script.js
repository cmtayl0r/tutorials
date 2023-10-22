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
const nav = document.querySelector('.nav');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Sticky nav
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height; // 90px

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
// ⚙️ FN: PAGE ANCHORS
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
// ⚙️ FN: MENU FADE ANIMATION
// -----------------------------------------------------------------------------

// Define the handleHover function which is triggered on a mouse event
// the variable 'e' refers to the event object that gets automatically passed when an event listener triggers the function
const handleHover = function (e) {
    // console.log(this); // 1 or 0.5
    // Matching strategy (Event Delegation)
    // --> Check if the target of the event (the element being hovered) has a class 'nav__link'
    if (e.target.classList.contains('nav__link')) {
        // Store the actual link that's being hovered in the variable 'link'
        const link = e.target;

        // Find the closest ancestor element with class 'nav' (likely the navbar container)
        // then query all elements with class 'nav__link' within it to get the siblings (all the other links)
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');

        // Find the closest ancestor element with class 'nav'
        // then query for an 'img' element (likely the logo) within it.
        const logo = link.closest('.nav').querySelector('img');

        // Iterate over each link in 'siblings'.
        // Fade out links NOT hovered (!== link)
        siblings.forEach(el => {
            // If the current link in the iteration isn't the one being hovered...
            // set its opacity to the value of 'this' (0.5 or 1, based on binding)
            if (el !== link) el.style.opacity = this;
        });

        // Set the opacity of the logo to the value of 'this' (0.5 or 1, based on binding)
        logo.style.opacity = this;
    }
};

// Attach an event listener to the 'nav' element (parent container)

// --> When the mouse is over the 'nav' element...
// --> the handleHover function is invoked with 'this' set to 0.5 (reduce opacity).
nav.addEventListener('mouseover', handleHover.bind(0.5));
// --> When the mouse leaves the 'nav' element...
// --> the handleHover function is invoked with 'this' set to 1 (restore opacity).
nav.addEventListener('mouseout', handleHover.bind(1));

// NOTE: When using the bind() method...
// the first argument is used to set the value of 'this' inside the bound function

// -----------------------------------------------------------------------------
// ⚙️ FN: STICKY NAV BAR
// -----------------------------------------------------------------------------

const stickyNav = ([entry]) => {
    // same as writing entries [0], but using destructuring
    // const [entry] = entries;
    // If entry isIntersecting = false, add sticky class
    entry.isIntersecting
        ? nav.classList.remove('sticky')
        : nav.classList.add('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
    // Observer options direct in argument
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`, // Height of navigation, margin before threshold
});
headerObserver.observe(header);

// -----------------------------------------------------------------------------
// 🧩 TABS
// -----------------------------------------------------------------------------

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
    // --> Remove active style on tabs
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
