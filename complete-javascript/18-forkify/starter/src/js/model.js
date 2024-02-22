// https://forkify-api.herokuapp.com/v2
// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886

////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

////////////////////////////////////////////////////////////////////////////////
// MODEL / STATE
////////////////////////////////////////////////////////////////////////////////

// COntains all the data we need in order to build our application
export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
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
    } catch (err) {
        // Rethrow new error, so can deal with in the controller
        throw err;
    }
};
loadSearchResults('pizza');
