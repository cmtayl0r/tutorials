////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

// Importing icons from a given path using Parcel's URL loader syntax
import icons from 'url:../../img/icons.svg';
// Package used for quantity value conversion
// Destructure right away to clean up
import { Fractional } from 'fractional';

////////////////////////////////////////////////////////////////////////////////
// CLASSES
////////////////////////////////////////////////////////////////////////////////
class RecipeView {
    #parentElement = document.querySelector('.recipe'); // Container for recipes
    #data; // API data from state/model
    #errorMessage = 'We could not find that recipe. Please try another one!';
    #emptyMessage =
        'Start by searching for a recipe or an ingredient. Have fun!';

    // ------------------- Public methods

    render(data) {
        // Function is responsible for putting the HTML markup on the page

        // Takes data state from controller (showRecipe() async function)
        // So it can be used anywhere in this object
        this.#data = data;

        // Get returned markup from private method of class
        const markup = this.#generateMarkup();
        // Clear parent container
        this.#clear();
        // Inserts the recipe markup into the parent container (.recipe)
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
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
        this.#clear();
        // Inserts the spinner's HTML at the beginning of the parent element (.recipe)
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this.#errorMessage) {
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
        this.#clear();
        // Inserts the error HTML at the beginning of the parent element (.recipe)
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this.#emptyMessage) {
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
        this.#clear();
        // Inserts the error HTML at the beginning of the parent element (.recipe)
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    addHandlerRender(handler) {
        // Listen for events in the view
        // Receive function we want to execute as soon as the event happens

        // Setup event listeners for two different events on global (window)
        // 1) URL's hash part changes or 2) when the page is initially loaded
        // Both will execute the controlRecipes function, to show the recipe
        // An array of these event types is used to iterate over using forEach
        ['hashchange', 'load'].forEach(evt =>
            window.addEventListener(evt, handler)
        );
        // Ineffecient alternative would be...
        // window.addEventListener('hashchange', controlRecipes);
        // window.addEventListener('load', controlRecipes);
    }

    // ------------------- Private methods

    #clear() {
        // Clears the recipe container (empty state content)
        // Used in other local functions
        this.#parentElement.innerHTML = '';
    }

    #generateMarkup() {
        return `
        <figure class="recipe__fig">
          <img src="${this.#data.image}" alt="${
            this.#data.title
        }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
                this.#data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
                this.#data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this.#data.ingredients
                .map(this.#generateMarkupIngredient)
                .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
                this.#data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
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

    #generateMarkupIngredient(ing) {
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
