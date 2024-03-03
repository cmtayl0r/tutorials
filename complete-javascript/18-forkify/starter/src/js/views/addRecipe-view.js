////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

// Import parent class
import View from './view.js';

// Importing icons from a given path using Parcel's URL loader syntax
import icons from 'url:../../img/icons.svg';

////////////////////////////////////////////////////////////////////////////////
// CLASSES
////////////////////////////////////////////////////////////////////////////////
class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload'); // form
    _emptyMessage = 'Recipe was successfully uploaded';
    _window = document.querySelector('.add-recipe-window'); // The modal window
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor() {
        // Calls the constructor of the parent View class
        // the parent class must be initialized before the subclass can initialize its own properties or access "this"
        // Initialize event listeners for showing and hiding the add recipe modal
        /*
        The call to super() ensures that the View class's constructor is executed when an instance of AddRecipeView is created. This sets up any properties or initial state defined in the View class's constructor. Without calling super(), the AddRecipeView class wouldn't properly inherit from View, potentially leading to errors or unexpected behavior.
        */
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    // ------------------- Public methods

    // Toggles the visibility of the modal window
    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    // ------------------- Private methods

    // Adds an event listener to the button for opening the modal
    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
        /* 
        .bind(this) is used to explicitly set the this context of the toggleWindow method to the current instance of the AddRecipeView class. This ensures that when toggleWindow is invoked as an event handler, it retains the correct this context, allowing it to access other properties and methods of the class as intended.
         */
    }

    // Adds event listeners to close the modal
    _addHandlerHideWindow() {
        // Close modal on btn press
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        // Close modal on click outside
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    // Adds an event listener to the form submission
    // prevents the default form submission
    // gathers the form data, and passes it to the handler function
    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
            // Gathers form data as an array of [key, value] pairs
            const dataArr = [...new FormData(this)];
            // Converts array of entries into an object
            const data = Object.fromEntries(dataArr);
            // Passes the form data object to the provided handler function
            handler(data);
        });
    }

    // Method the render function will call to render the pagination
    _generateMarkup() {}
}
export default new AddRecipeView();
