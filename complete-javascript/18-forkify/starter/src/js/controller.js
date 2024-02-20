////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

// Import icons file by using Parcel
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

// Loading Spinner helper function
const renderSpinner = function (parentEl) {
    // Add a spinner to any defined container using a generic parameter (parentEl)
    const markup = `
    <div class="spinner">
        <svg>
            <use href="${icons}#icon-loader"></use>
        </svg>
    </div> 
    `;
    // Remove empty state content and loading elements from HTML container
    parentEl.innerHTML = '';
    // Insert HTML markup in the container
    parentEl.insertAdjacentHTML('afterbegin', markup);
};

// Show recipe function
const showRecipe = async function () {
    try {
        // 1 - Loading recipe
        // Render loading spinner function in container
        renderSpinner(recipeContainer);
        // Await promise
        const res = await fetch(
            'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
        );
        // Await promise, turn response into JSON
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);

        console.log(data);

        let { recipe } = data.data;
        // Objective is to reformat the API data...
        // rename api data keys with underscores
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            servings: recipe.servings,
        };

        // 2 - Rendering recipe
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

        // Remove empty state content and loading elements from HTML container
        recipeContainer.innerHTML = '';
        // Fill empty container with recipe HTML defined above
        recipeContainer.insertAdjacentHTML('afterbegin', markup);

        console.log(recipe);
    } catch (err) {
        alert(err);
    }
};
showRecipe();
