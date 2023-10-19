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
