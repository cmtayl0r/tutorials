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
        console.log(url);
        // Await promises, fetches recipe data from the API
        // Races 2 promises, fetch() against timeout
        // If timeout wins (promise fulfilled first), rejects with timeout message
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        // Await promise, parses the JSON response from the API.
        const data = await res.json();
        // If response not ok, throw new error
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        // Result data of promise that function returns
        console.log(data);
        return data;
    } catch (err) {
        throw err;
    }
};
