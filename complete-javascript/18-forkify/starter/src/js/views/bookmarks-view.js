////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

// Import parent class
import View from './view.js';

// Import child class that handles generating result markup for both bookmarks and search results
import previewView from './preview-view.js';

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

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkup() {
        // iterate over each element in the _data array
        // For each element, the previewView.render() method is called
        // Return a new array with the bookmarks
        // These bookmark results are then joined together into a single string with no spaces
        return this._data
            .map(bookmark => previewView.render(bookmark, false))
            .join('');
    }
}

export default new BookmarksView();
