////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

import * as model from './model.js';
import recipeView from './views/recipe-view.js';

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

        // Calls renderSpinner to show a loading spinner in the recipe container
        renderSpinner(recipeContainer);

        // 2 - Loading recipe

        // Async function returns a promise
        // Load date, store it in the state
        await model.loadRecipe(id);

        // 3 - Rendering recipe

        // Data taken from step 2 and passed into the render() method
        recipeView.render(model.state.recipe);

        // Constructs HTML markup for displaying the recipe.
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
