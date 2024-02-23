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

class ResultsView extends View {
    _parentElement = document.querySelector('.results'); // results ul
    _errorMessage = 'We could not find that recipe. Please try another one!';
    _emptyMessage =
        'Start by searching for a recipe or an ingredient. Have fun!';

    // ------------------- Private methods

    _generateMarkup() {
        console.log(this._data);
        // iterate over each element in the _data array
        // For each element, the method is called with the current element passed as an argument
        // Return a new array with the results
        // These results are then joined together into a single string with no spaces
        return this._data.map(this._generateMarkupPreview).join('');
    }

    _generateMarkupPreview(result) {
        return `
        <li class="preview">
            <a class="preview__link preview" href="#${result.id}">
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

export default new ResultsView();
