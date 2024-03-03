// Goal of this file is to contain functions the we reuse several times in our project

////////////////////////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////////////////////////

import { TIMEOUT_SEC } from './config.js';

////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

// Function returns a new promise
// Which will reject after a certain amount of seconds
const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(
                new Error(`Request took too long! Timeout after ${s} second`)
            );
        }, s * 1000);
    });
};

export const getJSON = async function (url) {
    try {
        // Await promises, fetches recipe data from the API
        // Races 2 promises, fetch() against timeout
        // If timeout wins (promise fulfilled first), rejects with timeout message
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        // Await promise, parses the JSON response from the API.
        const data = await res.json();
        // If response not ok, throw new error
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        // Result data of promise that function returns
        return data;
    } catch (err) {
        // Rethrow new error
        throw err;
    }
};

// Used with upload recipe
export const sendJSON = async function (url, uploadData) {
    try {
        // Initialize the fetch operation with the given URL and request configuration.
        // This operation is asynchronous but not awaited here, allowing it to be used in a Promise.race below
        const fetchPro = fetch(url, {
            method: 'POST', // Use the POST method to send data.
            headers: {
                'Content-Type': 'application/json', // Set the content type of the request body to JSON.
            },
            body: JSON.stringify(uploadData), // Convert the `uploadData` object to a JSON string for the request body.
        });
        // Await promises, fetches recipe data from the API
        // Races 2 promises, fetch() against timeout
        // If timeout wins (promise fulfilled first), rejects with timeout message
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        // Await promise, parses the JSON response from the API.
        const data = await res.json();
        // If response not ok, throw new error
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        // Result data of promise that function returns
        return data;
    } catch (err) {
        // Rethrow new error
        throw err;
    }
};
