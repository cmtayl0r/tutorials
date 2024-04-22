// -----------------------------------------------------------------------------
// DARK MODE TOGGLE
// -----------------------------------------------------------------------------

const toggleBtn = document.querySelector('#toggleMode');

const toggleTheme = () => {
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'light');
        toggleBtn.textContent = 'Enable Dark Mode';
        document.body.classList.remove('dark-mode');
    } else {
        localStorage.setItem('theme', 'dark');
        toggleBtn.textContent = 'Enable Light Mode';
        document.body.classList.add('dark-mode');
    }
};

const applyTheme = () => {
    // Set theme saved on page refresh
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggleBtn.textContent = 'Enable Light Mode';
        document.body.classList.add('dark-mode');
    } else {
        toggleBtn.textContent = 'Enable Dark Mode';
        document.body.classList.remove('dark-mode');
    }
};

toggleBtn.addEventListener('click', toggleTheme); // Toggle theme on button click
applyTheme(); // Apply theme on page load

// -----------------------------------------------------------------------------
// NOTES APP
// -----------------------------------------------------------------------------

class NotesApp {
    constructor(noteInput, saveBtn, notesContainer, clearBtn) {
        // Select elements
        this.textArea = document.querySelector(noteInput);
        this.saveNoteBtn = document.querySelector(saveBtn);
        this.notesContainer = document.querySelector(notesContainer);
        this.clearNotesBtn = document.querySelector(clearBtn);
        // Get notes from localStorage or empty array
        this.notes = JSON.parse(localStorage.getItem('notes')) ?? [];
        // Bind event listeners
        this.saveNoteBtn.addEventListener('click', this.saveNote.bind(this));
        this.clearNotesBtn.addEventListener(
            'click',
            this.clearNotes.bind(this)
        );
        // Load notes on page load
        this.loadNotes();
    }

    loadNotes() {
        // If no notes saved, return empty array with nullish coalescing operator from constructor
        this.notes.forEach(this.createNoteElement.bind(this));
    }

    createNoteElement(content) {
        const noteElement = document.createElement('li');
        noteElement.textContent = content;
        this.notesContainer.appendChild(noteElement);
    }

    saveNote() {
        const noteContent = this.textArea.value.trim();
        if (noteContent) {
            // if noteContent is not empty, create note element and save note
            this.createNoteElement(noteContent);
            this.textArea.value = '';
            this.notes.push(noteContent); // Add note to notes array
            this.updateLocalStorage();
        }
    }

    clearNotes() {
        this.notesContainer.innerHTML = '';
        localStorage.removeItem('notes');
    }
    updateLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }
}

new NotesApp('#noteInput', '#saveNote', '#notesContainer', '#clearNotes');

// -----------------------------------------------------------------------------
// Storage Event
// -----------------------------------------------------------------------------

window.addEventListener('storage', event => {
    console.log('Storage event fired:', event);
    if (event.key === 'theme') {
        applyTheme(); // Apply theme on storage event
    }
});

// -----------------------------------------------------------------------------
// SessionStorage
// -----------------------------------------------------------------------------

// sessionStorage.setItem('sessionKey', 'sessionValue'); // Set session storage
// const sessionValue = sessionStorage.getItem('sessionKey'); // Get session storage
// sessionStorage.removeItem('sessionKey'); // Remove session storage
// sessionStorage.clear(); // Clear all session storage

// function warnUserOnce() {
//     if (!localStorage.getItem('shownWarning')) {
//         console.log('WARNING! We Are Shutting Down our entire app');
//     }
//     localStorage.setItem('shownWarning', 'true');
// }

// warnUserOnce();

const searchField = document.querySelector('#searchField');
searchField.addEventListener('input', e => {
    sessionStorage.setItem('searchField', e.target.value);
});

const populateSearch = () => {
    const previousSearch = sessionStorage.getItem('searchField');
    searchField.value = previousSearch;
};

populateSearch();

// Session Storage Form Data

const form = document.querySelector('#checkoutForm');

// Listen for input events on the form
form.addEventListener('input', e => {
    // If any of the 3 inputs change we want to save the data
    // Destructure the name and value from the input
    const { name, value } = e.target;
    // Look to see if we have anything stored already, or create an empty object
    const formData = JSON.parse(sessionStorage.getItem('formData')) ?? {};
    // Add the name and value of the input to the object
    formData[name] = value;
    // Save the object to session storage
    sessionStorage.setItem('formData', JSON.stringify(formData));
});

// Function to populate the form with the data from session storage
// so that it persists on page refresh and the user can continue where they left off
const populateForm = () => {
    // Get the form data from session storage
    const formData = JSON.parse(sessionStorage.getItem('formData')) ?? {};
    // If we have form data, loop over each key and value and populate the form
    if (formData) {
        Object.entries(formData).forEach(([name, value]) => {
            form.querySelector(`[name=${name}]`).value = value;
        });
    }
};
// Call the function to populate the form
populateForm();
