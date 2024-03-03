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

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list'); // bookmarks ul
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
    _emptyMessage = '';

    // ------------------- Private methods

    _generateMarkup() {
        // iterate over each element in the _data array
        // For each element, the method is called with the current element passed as an argument
        // Return a new array with the results
        // These results are then joined together into a single string with no spaces
        return this._data.map(this._generateMarkupPreview).join('');
    }

    _generateMarkupPreview(result) {
        // Get id to determine selected search result, and apply class below
        const id = window.location.hash.slice(1);

        return `
        <li class="preview">
            <a class="preview__link preview ${
                result.id === id ? 'preview__link--active' : ''
            }" href="#${result.id}">
            <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
            </div>
            </a>
        </li>
    `;
    }
}

export default new BookmarksView();
