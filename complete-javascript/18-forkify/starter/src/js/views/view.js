////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

// Importing icons from a given path using Parcel's URL loader syntax
import icons from 'url:../../img/icons.svg';

////////////////////////////////////////////////////////////////////////////////
// PARENT CLASS
////////////////////////////////////////////////////////////////////////////////

// Parent class for views ...
// --> results-view.js
// --> search-view.js
// Exported and default because we won't be making any instances of this class
export default class View {
    _data; // API data from state/model

    render(data) {
        // Function is responsible for putting the HTML markup on the page

        // Takes data state from controller (showRecipe() async function)
        // So it can be used anywhere in this object
        this._data = data;

        // Get returned markup from private method of class
        const markup = this._generateMarkup();
        // Clear parent container
        this._clear();
        // Inserts the recipe markup into the parent container (.recipe)
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
        // Clears the recipe container (empty state content)
        // Used in other local functions
        this._parentElement.innerHTML = '';
    }

    renderSpinner() {
        // Render a loading spinner inside a parent element
        // Constructs HTML markup for displaying the spinner.
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div> 
        `;
        // Clear parent container
        this._clear();
        // Inserts the spinner's HTML at the beginning of the parent element (.recipe)
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMessage) {
        // by default, message = error message set as private field in class
        const markup = `
          <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
          </div> 
        `;
        // Clear parent container
        this._clear();
        // Inserts the error HTML at the beginning of the parent element (.recipe)
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._emptyMessage) {
        // by default, message = empty state message set as private field in class
        const markup = `
          <div class="message">
              <div>
                  <svg>
                      <use href="${icons}#icon-smile"></use>
                  </svg>
              </div>
              <p>${message}</p>
          </div>
        `;
        // Clear parent container
        this._clear();
        // Inserts the error HTML at the beginning of the parent element (.recipe)
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}
