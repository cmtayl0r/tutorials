////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

// Import parent class
import View from './view.js';

// Importing icons from a given path using Parcel's URL loader syntax
import icons from 'url:../../img/icons.svg';

// Package used for quantity value conversion
// Destructure right away to clean up
import { Fractional } from 'fractional';

////////////////////////////////////////////////////////////////////////////////
// CLASSES
////////////////////////////////////////////////////////////////////////////////
class RecipeView extends View {
    _parentElement = document.querySelector('.recipe'); // Container for recipes
    _errorMessage = 'We could not find that recipe. Please try another one!';
    _emptyMessage =
        'Start by searching for a recipe or an ingredient. Have fun!';

    // ------------------- Public methods

    addHandlerRender(handler) {
        // "Publisher" function listening for events in this view
        // when requested, "publishes" events that the application needs to respond to

        // Setup event listeners for two different events on global (window)
        // 1) URL's hash part changes or 2) when the page is initially loaded
        // Both will execute the controlRecipes function, to show the recipe
        // An array of these event types is used to iterate over using forEach
        ['hashchange', 'load'].forEach(
            evt => window.addEventListener(evt, handler) // call handler (controlRecipes) in controller
        );
        // Ineffecient alternative would be...
        // window.addEventListener('hashchange', controlRecipes);
        // window.addEventListener('load', controlRecipes);
    }

    addHandlerUpdateServings(handler) {
        // Event delegation
        // Listen for button clicks to update servings. This uses event delegation ...
        // ... to efficiently handle clicks on dynamically generated buttons.
        this._parentElement.addEventListener('click', function (evt) {
            // identify if click occurred on button or any of its descendants (svg etc)
            const btn = evt.target.closest('.btn--tiny');
            // Guard clause. If the clicked element isn't a button, exit the function.
            if (!btn) return;
            // Convert dataset attribute value on HTML element to number.
            const { updateTo } = btn.dataset;
            // Validate the converted number then call the passed-in handler function with the valid number.
            if (+updateTo > 0) handler(+updateTo);
        });
    }

    addHandlerAddBookmark(handler) {
        // Event delegation
        // Listen for an event on a parent element, figure out if click happened
        // This is because button not visible when page first loads
        this._parentElement.addEventListener('click', function (evt) {
            // identify if click occurred on button or any of its descendants (svg etc)
            const btn = evt.target.closest('.btn--bookmark');
            // Guard clause. If the clicked element isn't a button, exit the function.
            if (!btn) return;
            // Call handler
            handler();
        });
    }

    // ------------------- Private methods

    _generateMarkup() {
        return `
        <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
            this._data.title
        }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
                this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
                this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                  this._data.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to="${
                  this._data.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
            this._data.bookmarked ? '-fill' : ''
        }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients
                .map(this._generateMarkupIngredient)
                .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
                this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
    }

    _generateMarkupIngredient(ing) {
        // Call function in #generateMarkup
        // Loop over api ingredients object using map() array method
        // Return HTML and join to markup
        return `
            <li class="recipe__ingredient">
                <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${
                    // If null, just show empty string
                    ing.quantity
                        ? new Fraction(ing.quantity).toString()
                        : (ing.quantity = '')
                }</div>
                <div class="recipe__description">
                    <span class="recipe__unit">${ing.unit}</span>
                    ${ing.description}
                </div>
            </li>
            `;
    }
}

export default new RecipeView();
