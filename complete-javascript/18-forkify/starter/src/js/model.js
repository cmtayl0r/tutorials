// https://forkify-api.herokuapp.com/v2
// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886

////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

import { API_URL } from './config.js';

////////////////////////////////////////////////////////////////////////////////
// MODEL / STATE
////////////////////////////////////////////////////////////////////////////////

export const state = {
    recipe: {},
};

////////////////////////////////////////////////////////////////////////////////
// FETCH DATA
////////////////////////////////////////////////////////////////////////////////

export const loadRecipe = async function (id) {
    try {
        // Await promise, fetches recipe data from the API
        const res = await fetch(`${API_URL}/${id}`);
        // Await promise, parses the JSON response from the API.
        const data = await res.json();
        // If response not ok, throw new error
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        // Destructures and reformats the recipe data fetched from the API.
        const { recipe } = data.data;
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

        console.log(state.recipe);
    } catch (err) {
        alert(err);
    }
};
