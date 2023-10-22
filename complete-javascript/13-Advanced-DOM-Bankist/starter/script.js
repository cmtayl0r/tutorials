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
// ⚙️ FN: REVEAL SECTIONS
// -----------------------------------------------------------------------------

// 01 - creates node list of each section
const allSections = document.querySelectorAll('.section');

// 02 - Callback function for observer
const revealSection = function (entries, observer) {
    const [entry] = entries; // use destructuring
    // guard clause
    // if not intersecting, just cancel the function right away
    if (!entry.isIntersecting) return;
    // Make section visible (remove hidden class)
    entry.target.classList.remove('section--hidden');
    // Unobserve after event triggered first time
    observer.unobserve(entry.target);
};

// 03 - Create Intersection observer
const sectionObserver = new IntersectionObserver(revealSection, {
    // Observe object options
    root: null,
    threshold: 0.15,
});

// 04 - loop over sections node list to observe
allSections.forEach(section => {
    // observe each element (section) from node list
    sectionObserver.observe(section);
    // Hide all sections when page loads (add hidden class)
    section.classList.add('section--hidden');
});

// -----------------------------------------------------------------------------
// ⚙️ FN: LAZY LOADING IMAGES
// -----------------------------------------------------------------------------

// 01 - Select all <img> elements that have a data-src attribute.
const imgTargets = document.querySelectorAll('img[data-src]');

// 02 - Define a function called loadImg to handle lazy loading of images.
const loadImg = function (entries, observer) {
    // Destructure the first entry from the array of entries.
    const [entry] = entries;
    // Guard clause
    // If the image isn't intersecting the viewport, exit the function.
    if (!entry.isIntersecting) return;
    // Switch from low res img to actual img
    // Set the src attribute of the image element to the value of the data-src attribute.
    entry.target.src = entry.target.dataset.src;
    // Add an event listener that removes the 'lazy-img' class from the image once it's loaded.
    // "Un blurs" the image
    entry.target.addEventListener('load', () =>
        entry.target.classList.remove('lazy-img')
    );
    // Stop observing the image now that it has started loading.
    observer.unobserve(entry.target);
};

// 03 - Create a new IntersectionObserver instance with the specified callback and options.
const imageObserver = new IntersectionObserver(loadImg, {
    // Observer object options
    root: null, // Observe the intersection relative to the viewport.
    threshold: 0, // Observe when even a single pixel of the target is visible.
    rootMargin: '200px', // Extend the 'viewport' by 200 pixels on all sides.
});

// 04 - Loop over node list from DOM element to observe
// Observe each image with the IntersectionObserver.
imgTargets.forEach(img => imageObserver.observe(img));

// -----------------------------------------------------------------------------
// 🧩 TABS
// -----------------------------------------------------------------------------

// Event handlers
// Using forEach is bad practice for performance, use event delegation
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

// -----------------------------------------------------------------------------
// 🧩 SLIDER
// -----------------------------------------------------------------------------

// Create wrapping function, so not to pollute the global namespace
const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let currentSlide = 0;
    const maxSlide = slides.length;

    // dots__dot
    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    };

    const activateDot = function (slide) {
        document
            .querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove('dots__dot--active'));

        document
            .querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        // console.log(slide); // Slide = 0, 1, 2, 3
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    };

    const nextSlide = function () {
        if (currentSlide === maxSlide - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        goToSlide(currentSlide);
        activateDot(currentSlide);
    };

    const prevSlide = function () {
        if (currentSlide === 0) {
            currentSlide = maxSlide - 1;
        } else {
            currentSlide--;
        }
        goToSlide(currentSlide);
        activateDot(currentSlide);
    };

    const init = function () {
        goToSlide(0);
        createDots();
        activateDot(0);
    };
    init();

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        else if (e.key === 'ArrowRight') nextSlide();
    });

    // dots__dot--active
    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
slider();
