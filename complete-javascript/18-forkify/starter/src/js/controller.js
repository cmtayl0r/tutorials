////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

import * as model from './model.js';
import recipeView from './views/recipe-view.js';

////////////////////////////////////////////////////////////////////////////////
// DOM ELEMENTS
////////////////////////////////////////////////////////////////////////////////

const recipeContainer = document.querySelector('.recipe');

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
        // Render recipeView error markup
        recipeView.renderError();
    }
};

////////////////////////////////////////////////////////////////////////////////
// INIT / START PROGRAM
////////////////////////////////////////////////////////////////////////////////

const init = function () {
    // Publisher-subscriber design pattern
    // Pass handler function we want to execute as soon as the event happens
    recipeView.addHandlerRender(controlRecipes);
};
init();
