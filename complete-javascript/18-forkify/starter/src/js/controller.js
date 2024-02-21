////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

import * as model from './model.js';
import recipeView from './views/recipe-view.js';

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
// CONTROLLER
////////////////////////////////////////////////////////////////////////////////

const controlRecipes = async function () {
    try {
        // 1 - Get recipe ID

        // --> Extracts the recipe ID from the URL hash, to add to fetch call.
        // --> Slice of the hash in order to use correctly.
        const id = window.location.hash.slice(1);
        // --> guard clause, conditional early return pattern (truthy)
        // --> proceed only if valid id present, if not, immediately exit function
        if (!id) return;
        // --> Call function from recipeView Class
        // --> Calls renderSpinner to show a loading spinner in the recipe container
        recipeView.renderSpinner();

        // 2 - Loading recipe

        // --> Async function returns a promise
        // --> Load data, store it in the state object
        await model.loadRecipe(id);

        // 3 - Rendering recipe

        // --> Call function from recipeView Class
        // --> Data taken from step 2 and passed into the render() method
        recipeView.render(model.state.recipe);
    } catch (err) {
        // Alerts the user if there's an error.
        alert(err);
    }
};

// Setup event listeners for two different events on global (window)
// 1) URL's hash part changes or 2) when the page is initially loaded
// Both will execute the controlRecipes function, to show the recipe
// An array of these event types is used to iterate over
['hashchange', 'load'].forEach(evt =>
    window.addEventListener(evt, controlRecipes)
);
// Ineffecient alternative would be...
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
