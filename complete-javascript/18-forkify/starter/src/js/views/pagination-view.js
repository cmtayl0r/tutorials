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
class PaginationView extends View {
    _parentElement = document.querySelector('.pagination'); // pagination div

    // Method the render function will call to render the pagination
    _generateMarkup() {
        // this._data is the entire search results object from render() in parent class
        // Set a current page variable
        const curPage = this._data.page;

        // Math.ceil = Round up to a single digit number
        // Length of results array / defined results per page value
        const numPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );
        console.log(numPages);
        // Page 1, and are other pages
        if (curPage === 1 && numPages > 1) {
            console.log('PAGE 1');
            return `
            <button class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        }
        // Last page
        if (curPage === numPages && numPages > 1) {
            console.log('LAST PAGE');
            return `
            <button class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
            `;
        }
        // Other pages
        if (curPage < numPages) {
            console.log('OTHER PAGES!');
            return `
            <button class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
            <button class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        }
        // Page 1, and there are NO other pages. test
        return '';
    }
}
export default new PaginationView();
