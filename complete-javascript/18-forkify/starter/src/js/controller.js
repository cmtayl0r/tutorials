////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

// MODEL / STATE
import * as model from './model.js';

// VIEWS
import recipeView from './views/recipe-view.js';
import searchView from './views/search-view.js';
import resultsView from './views/results-view.js';
import paginationView from './views/pagination-view.js';

// Parcel
if (module.hot) {
    module.hot.accept;
}

////////////////////////////////////////////////////////////////////////////////
// CONTROLLER FUNCTIONS
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

const controlSearchResults = async function () {
    try {
        // --> Call function from resultsView Class
        // --> Calls renderSpinner to show a loading spinner in the results container
        resultsView.renderSpinner();

        // 1 - Get query from search input
        const query = searchView.getQuery();
        if (!query) return; // guard clause if no query

        // 2 - Load search results based on query
        await model.loadSearchResults(query);
        // console.log(model.state.search.results);

        // 3 - Render search results
        // Call search results pagination function from model.js
        // Start at page 1, set in state object
        resultsView.render(model.getSearchResultsPage());

        //  4 - Render initial pagination buttons
        // Pass in the whole search object of the state ...
        // ... so to access the results, page number etc
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
};

const controlPagination = function (goToPage) {
    console.log(`This is page ${goToPage}`);

    // use number from pagination button (goToPage)

    // 1 - Render NEW search results
    resultsView.render(model.getSearchResultsPage(goToPage));

    // 2 - Render NEW pagination buttons
    paginationView.render(model.state.search);
};

////////////////////////////////////////////////////////////////////////////////
// INIT / START PROGRAM
////////////////////////////////////////////////////////////////////////////////

const init = function () {
    // Publisher-subscriber design pattern
    // Subscribers in the controller "handle" the events the publisher functions are listening for

    // TODO: why a handler???
    // TODO: What is the publisher-subscriber pattern?

    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};
init();
