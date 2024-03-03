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

class ResultsView extends View {
    _parentElement = document.querySelector('.results'); // results ul
    _errorMessage = 'No recipes found. Please search again!';
    _emptyMessage =
        'Start by searching for a recipe or an ingredient. Have fun!';

    // ------------------- Private methods

    _generateMarkup() {
        // iterate over each element in the _data array
        // For each element, the previewView.render() method is called
        // Return a new array with the results
        // These result results are then joined together into a single string with no spaces
        return this._data
            .map(result => previewView.render(result, false))
            .join('');
    }
}

export default new ResultsView();
