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

        // Guard clause if no results or data, exit function immediately
        // If no data (results) exist, render error message
        // If no data OR array has 0 entries/length
        if (!data || (Array.isArray(data) && data.length === 0))
            return this.renderError();

        // Takes data state from controller
        // Update the internal data reference with the new data.
        this._data = data;

        // Generate the new markup based on the updated data.
        // Get returned markup from private method of this class
        const markup = this._generateMarkup();

        // Clear parent container
        this._clear();

        // Inserts the recipe markup into the parent container (.recipe)
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
        // This method optimizes DOM updates by only modifying elements that actually changed.
        // - Select bookmark
        // - Change servings

        // Takes data state from controller
        // Update the internal data reference with the new data.
        this._data = data;

        // Generate the new markup based on the updated data.
        // Get returned markup from private method of this class
        const newMarkup = this._generateMarkup();

        // Convert the new markup string to a DOM structure for comparison.
        // This creates a virtual representation of the new markup.
        const newDOM = document
            .createRange()
            .createContextualFragment(newMarkup);

        // Select all elements from the new and current DOM for comparison.
        // Convert new and cur DOM's into an Array
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(
            this._parentElement.querySelectorAll('*')
        );

        // Iterate through each element in the new DOM.
        newElements.forEach((newEl, i) => {
            const curEl = curElements[i]; // Corresponding element in the current DOM.

            // console.log(curEl, newEl.isEqualNode(curEl));

            // A - Updates changed TEXT
            // Check if the element itself has changed (excluding its children).
            // If the text content is different, update the current DOM's text content.
            if (
                !newEl.isEqualNode(curEl) &&
                newEl.firstChild?.nodeValue.trim() !== '' &&
                newEl.firstChild?.nodeValue.trim() !== undefined
            ) {
                // Mutate/update the current DOM to have changes
                curEl.textContent = newEl.textContent;
            }

            // B - Updates changed ATTRIBUTES
            // If the element's attributes have changed, update them in the current DOM.
            // This ensures that changes to attributes like class, id, style, etc., are correctly applied.
            if (!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach(attr =>
                    curEl.setAttribute(attr.name, attr.value)
                );
            }
        });
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
