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
import bookmarksView from './views/bookmarks-view.js';
import addRecipeView from './views/addRecipe-view.js';

// Parcel
if (module.hot) {
    module.hot.accept;
}

////////////////////////////////////////////////////////////////////////////////
// CONTROLLER SUBSCRIBERS
////////////////////////////////////////////////////////////////////////////////

// *** Publisher-subscriber design pattern
// These controller functions (aka event handlers) are subscribers because they ...
// ... "subscribe" to listen for specific events (user actions, published from views) ...
// ... and execute in response to those events.

// Subscriber - Reacts to an event where a user selects a recipe to view its details.
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

        // 2 -  Update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage());

        // 3 - Loading recipe

        // --> Async function returns a promise
        // --> Load data, store it in the state object
        await model.loadRecipe(id);

        // 4 - Rendering recipe

        // --> Call function from recipeView Class
        // --> Data taken from step 2 and passed into the render() method
        recipeView.render(model.state.recipe);

        // 5 - Update bookmarks view to mark selected bookmark result
        bookmarksView.update(model.state.bookmarks);
    } catch (err) {
        // Render recipeView error markup
        recipeView.renderError();
    }
};

// Subscriber - Reacts to an event where a user submits a search query..
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

// Subscriber - Reacts to an event where a user navigates through search results using pagination.
const controlPagination = function (goToPage) {
    console.log(`This is page ${goToPage}`);

    // use number from pagination button (goToPage)

    // 1 - Render NEW search results
    resultsView.render(model.getSearchResultsPage(goToPage));

    // 2 - Render NEW pagination buttons
    paginationView.render(model.state.search);
};

// Subscriber - Reacts to an event where a user changes the servings, impacting the ingredient quantity
const controlServings = function (newServings) {
    // 1 - Update the recipe servings (in state)
    model.updateServings(newServings);

    // 2 - Update the recipe view
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
};

// Subscriber - Reacts to an event where the user bookmarks a recipe
const controlAddBookmark = function () {
    // 1 - Add/remove bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);
    // console.log(model.state.recipe);
    // console.log(model.state.bookmarked);

    // 2 - Update recipe view
    // update recipe view to see bookmarked style change
    recipeView.update(model.state.recipe);

    // 3 - Render bookmarks
    bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
    //
    bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
    try {
        // Upload new recipe data
        await model.uploadRecipe(newRecipe);

        console.log(model.state.recipe);
    } catch (err) {
        console.error('💥', err);
        addRecipeView.renderError(err.message);
    }
};

////////////////////////////////////////////////////////////////////////////////
// INIT [START APP] / BIND HANDLERS
////////////////////////////////////////////////////////////////////////////////

const init = function () {
    // *** Publisher-subscriber design pattern
    // Event/Bind handlers
    // Connect the publishers (user actions) to the subscribers (controller functions)
    // They set up the subscriptions, effectively binding user actions to specific controller logic

    // Each of these methods takes a controller function as an argument ...
    // ... and binds it to a specific user interaction or event ...
    // ... so, when event occurs (publisher) the subscriber function is executed

    // As soon as page is loaded, Bind handlers are in place to react to user actions
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
