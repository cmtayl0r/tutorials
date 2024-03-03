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

class PreviewView extends View {
    _parentElement = '';

    // ------------------- Private methods

    _generateMarkup() {
        // Get id to determine selected search result, and apply class below
        const id = window.location.hash.slice(1);

        return `
        <li class="preview">
            <a class="preview__link preview ${
                this._data.id === id ? 'preview__link--active' : ''
            }" href="#${this._data.id}">
            <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
                <div class="preview__user-generated ${
                    this._data.key ? '' : 'hidden'
                }">
                    <svg>
                        <use href="${icons}#icon-user"></use>
                    </svg>
                </div>
            </div>
            
            </a>
        </li>
    `;
    }
}

export default new PreviewView();
