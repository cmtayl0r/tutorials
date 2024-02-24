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

    // ------------------- Public methods

    addHandlerClick(handler) {
        // "Publisher" function listening for events in the view
        // Receives handler function we want to execute as soon as the event happens

        // add listener to parent, not each button
        this._parentElement.addEventListener('click', function (e) {
            // Search up in the DOM tree (using closest) ...
            // ... for an ancestor element that has the class btn--inline
            const btn = e.target.closest('.btn--inline');

            // Guard clause, if no button return immediately
            if (!btn) return;

            // use data-set attribute on button, to connect code and DOM
            // data-set indicates what page to go tp
            const goToPage = parseInt(btn.dataset.goto, 10);

            // Pass page number into handler
            handler(goToPage); // call handler (controlPagination) in controller
        });
    }

    // By using a getter, you remove the repeated code (curPage) in multiple methods.
    // Better solution than declaring in the constructor as its data that will change (dynamic not static)
    get currentPage() {
        return this._data.page;
    }

    // Method the render function will call to render the pagination
    _generateMarkup() {
        // this._data is the entire search results object from render() in parent class
        // Set a current page variable
        const curPage = this.currentPage;

        // Math.ceil = Round up to a single digit number
        // Length of results array / defined results per page value
        const numPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );
        console.log(`There are ${numPages} pages of results`);
        // Page 1, and are other pages
        if (curPage === 1 && numPages > 1) {
            return this._generateNextButton();
        }
        // Last page
        if (curPage === numPages && numPages > 1) {
            return this._generatePreviousButton();
        }
        // Other pages
        if (curPage < numPages) {
            return `
                ${this._generatePreviousButton()}
                ${this._generateNextButton()}
            `;
        }
        // Page 1, and there are NO other pages
        return '';
    }

    _generateNextButton() {
        const curPage = this.currentPage;
        return `
            <button data-goto="${
                curPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
    }
    _generatePreviousButton() {
        const curPage = this.currentPage;
        return `
            <button data-goto="${
                curPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
        `;
    }
}
export default new PaginationView();
