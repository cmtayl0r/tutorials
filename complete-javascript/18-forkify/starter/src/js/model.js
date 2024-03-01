// https://forkify-api.herokuapp.com/v2
// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886

////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

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
};

////////////////////////////////////////////////////////////////////////////////
// LOAD RECIPE DATA
////////////////////////////////////////////////////////////////////////////////

// function called by the controller
export const loadRecipe = async function (id) {
    try {
        // Call helper async function to fetch and parse JSON data
        // Store returned value from promise (getJSON())
        const data = await getJSON(`${API_URL}/${id}`);

        console.log(data);

        // Destructures and reformats the recipe data fetched from the API.
        const { recipe } = data.data;

        // Add formatted object data to state object
        state.recipe = {
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
        const data = await getJSON(`${API_URL}?search=${query}`);

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
