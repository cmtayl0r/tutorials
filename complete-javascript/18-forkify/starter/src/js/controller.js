////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

// Importing icons from a given path using Parcel's URL loader syntax
import icons from 'url:../img/icons.svg';

////////////////////////////////////////////////////////////////////////////////
// DOM ELEMENTS
////////////////////////////////////////////////////////////////////////////////

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(
                new Error(`Request took too long! Timeout after ${s} second`)
            );
        }, s * 1000);
    });
};

////////////////////////////////////////////////////////////////////////////////
// SHOW RECIPE
////////////////////////////////////////////////////////////////////////////////
// https://forkify-api.herokuapp.com/v2
// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886

// 🛠️ Render a loading spinner inside a parent element
const renderSpinner = function (parentEl) {
    // Constructs HTML markup for displaying the spinner.
    const markup = `
    <div class="spinner">
        <svg>
            <use href="${icons}#icon-loader"></use>
        </svg>
    </div> 
    `;
    // Clears the content of the parent element.
    parentEl.innerHTML = '';
    // Inserts the spinner's HTML at the beginning of the parent element.
    parentEl.insertAdjacentHTML('afterbegin', markup);
};

// 🛠️ Show recipe
const showRecipe = async function () {
    try {
        // 1 - Get recipe ID

        // Extracts the recipe ID from the URL hash, to add to fetch call.
        // Slice of the hash in order to use correctly.
        const id = window.location.hash.slice(1);
        // guard clause, conditional early return pattern (truthy)
        // proceed only if valid id present, if not, immediately exit function
        if (!id) return;

        // 2 - Loading recipe

        // Calls renderSpinner to show a loading spinner in the recipe container
        renderSpinner(recipeContainer);
        // Await promise, fetches recipe data from the API
        const res = await fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        // Await promise, parses the JSON response from the API.
        const data = await res.json();
        // If response not ok, throw new error
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        // Destructures and reformats the recipe data fetched from the API.
        let { recipe } = data.data;
        recipe = {
            // Reformats the keys and values of the recipe object.
            // rename api data keys that have underscores
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            servings: recipe.servings,
        };

        // 3 - Rendering recipe

        // Constructs HTML markup for displaying the recipe.
        const markup = `
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="${
            recipe.title
        }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
                recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
                recipe.servings
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
            ${recipe.ingredients
                .map(ing => {
                    // Need to return a string of HTML, so use map() array method
                    // Loop over api object
                    return `
                <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${ing.quantity}</div>
                    <div class="recipe__description">
                        <span class="recipe__unit">${ing.unit}</span>
                        ${ing.description}
                    </div>
                </li>
                `;
                })
                .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
                recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;

        // Clears the recipe container (empty state content)
        recipeContainer.innerHTML = '';
        // Inserts the recipe markup into the container.
        recipeContainer.insertAdjacentHTML('afterbegin', markup);
    } catch (err) {
        // Alerts the user if there's an error.
        alert(err);
    }
};

// Setup event listeners for two different events on global (window)
// 1) URL's hash part changes or 2) when the page is initially loaded
// Both will execute the showRecipe function, to show the recipe
// An array of these event types is used to iterate over
['hashchange', 'load'].forEach(evt => window.addEventListener(evt, showRecipe));
// Ineffecient alternative would be...
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
