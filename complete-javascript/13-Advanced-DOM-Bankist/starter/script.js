'use strict';

// -----------------------------------------------------------------------------
// 🧩 MODAL WINDOW
// -----------------------------------------------------------------------------

// DOM elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

////////////////////////////////////////////////////////////////////////////////
// LECTURE 186
/*
//------------------------
// SELECTION
//------------------------

const header = document.querySelector('.header');
// 👍 USE THIS
// specific element with class name

const allSections = document.querySelectorAll('.section');
// 👍 USE THIS
// All elements with class name
// output as a NodeList
console.log(allSections);

document.getElementById('section--1');
// specific ID element
// 👴🏻 OLD METHOD

const allButtons = document.getElementsByTagName('button');
// all elements by tag name
// HTMLCollection, a "live collection"
// 👴🏻 OLD METHOD
console.log(allButtons);

//------------------------
// CREATING AND INSERTING
//------------------------

// 👍 USE THIS
// insertAdjacentHTML

// Return DOM element
const message = document.createElement('div');
// add class to DOM element
message.classList.add('cookie-message');
// Add HTML to DOM element
message.innerHTML =
    'We use cookies for improved analytics <button class="btn btn-close-cookie">Got it!</button>';
// Append (and insert) DOM element to another element
header.append(message);

//------------------------
// DELETION
//------------------------

document
    .querySelector('.btn-close-cookie')
    .addEventListener('click', function () {
        message.remove();
    });
*/
