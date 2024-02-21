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

export const state = {
    recipe: {},
};

////////////////////////////////////////////////////////////////////////////////
// LOAD RECIPE DATA
////////////////////////////////////////////////////////////////////////////////

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
        // Rethrow new error
        // For any errors from getJSON() promise
        throw err;
    }
};
