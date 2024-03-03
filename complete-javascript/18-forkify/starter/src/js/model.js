// https://forkify-api.herokuapp.com/v2
// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886

////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { AJAX } from './helpers.js';

////////////////////////////////////////////////////////////////////////////////
// MODEL / STATE
////////////////////////////////////////////////////////////////////////////////

// Contains all the data we need in order to build our application
export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
};

////////////////////////////////////////////////////////////////////////////////
// LOAD RECIPE DATA
////////////////////////////////////////////////////////////////////////////////

const createRecipeObject = function (data) {
    // Destructures and reformats the recipe data fetched from the API.
    const { recipe } = data.data;

    // Return formatted object data
    return {
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
        ...(recipe.key && { key: recipe.key }), // if recipe key doesnt exist, nothing happens. If exists, spread and add object
    };
};

// function called by the controller
export const loadRecipe = async function (id) {
    try {
        // Call helper async function to fetch and parse JSON data
        // Store returned value from promise (getJSON())
        const data = await AJAX(`${API_URL}/${id}`);

        //  Add formatted state object to the state object
        state.recipe = createRecipeObject(data);

        // Check bookmarks array
        // Look for id of recipe pushed to array
        // If true will maintain bookmarked button icon state
        if (state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;
    } catch (err) {
        // Rethrow new error, so can deal with in the controller
        throw err;
    }
};

////////////////////////////////////////////////////////////////////////////////
// LOAD SEARCH RESULTS DATA
////////////////////////////////////////////////////////////////////////////////

// function called by the controller
export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        // Call helper async function to fetch and parse JSON data
        // Store returned value from promise (getJSON())
        const data = await AJAX(`${API_URL}?search=${query}`);

        // Map over array given by API, return reformatted objects
        // Add map objects to array in state object
        state.search.results = data.data.recipes.map(rec => {
            return {
                // Reformats the keys and values of the recipe object.
                // rename api data keys that have underscores
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });

        // When load any new search results, page resets to 1 in state
        // Corrects search pagination issues...
        // ... when on page 3 of results (Pizza), do another search (Pasta), still on page 3
        state.search.page = 1;
    } catch (err) {
        // Rethrow new error, so can deal with in the controller
        throw err;
    }
};

////////////////////////////////////////////////////////////////////////////////
// SET SEARCH RESULTS PAGINATION
////////////////////////////////////////////////////////////////////////////////

export const getSearchResultsPage = function (page = state.search.page) {
    // resultsPerPage is important data and should go into the state object
    state.search.page = page;
    // Determine the starting index of the results for the current page
    const start = (page - 1) * state.search.resultsPerPage;
    // Determine the ending index of the results for the current page
    const end = page * state.search.resultsPerPage;
    // returns a portion of the search results array using slice method
    return state.search.results.slice(start, end);
};

////////////////////////////////////////////////////////////////////////////////
// UPDATE SERVINGS CALCULATION
////////////////////////////////////////////////////////////////////////////////

export const updateServings = function (newServings) {
    // reach in to each ingredient of the recipe and change quantity
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
        // newQt = oldQt * newServings / oldServings
    });

    // Update servings in the state
    state.recipe.servings = newServings;
};

////////////////////////////////////////////////////////////////////////////////
// ADD and DELETE BOOKMARK
////////////////////////////////////////////////////////////////////////////////

const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
    // Add bookmark to array
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmark
    // Set new property on state object (bookmarked)
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    // Add bookmark to local storage
    persistBookmarks();
};

export const deleteBookmark = function (id) {
    // Find the index of the recipe id in the bookmarks array
    const index = state.bookmarks.findIndex(el => el.id === id);
    // Delete that id from the bookmarks array
    state.bookmarks.splice(index, 1);

    // Mark current recipe as NOT bookmarked
    // Set new property on state object (bookmarked)
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    // Add bookmark to local storage
    persistBookmarks();
};

const init = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
    localStorage.clear('bookmarks');
};

////////////////////////////////////////////////////////////////////////////////
// UPLOAD RECIPE
////////////////////////////////////////////////////////////////////////////////

export const uploadRecipe = async function (newRecipe) {
    try {
        // Take created object of the uploaded recipe (new recipe)
        // Filter out the ata we are interested in
        // Create new array with array elements that start with 'ingredient' (0)
        // ... and don't have an empty string as second value (1)
        const ingredients = Object.entries(newRecipe)
            .filter(
                entry => entry[0].startsWith('ingredient') && entry[1] !== ''
            )
            .map(ing => {
                const ingArr = ing[1].replaceAll(' ', '').split(',');
                if (ingArr.length !== 3)
                    throw new Error(
                        'Wrong ingredient format! Please use the correct format.'
                    );
                const [quantity, unit, description] = ingArr;
                return {
                    quantity: quantity ? +quantity : null,
                    unit,
                    description,
                };
            });
        // turn into object to send to API
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        };
        console.log(recipe);
        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
        //  Add formatted state object to the state object
        state.recipe = createRecipeObject(data);
        // Add uploaded recipe as bookmark
        addBookmark(state.recipe);
    } catch (err) {
        throw err;
    }
};
