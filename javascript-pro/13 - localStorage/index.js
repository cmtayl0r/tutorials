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

toggleBtn.addEventListener('click', toggleTheme);
applyTheme();

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
            this.notes.push(noteContent);
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
