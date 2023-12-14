'use strict';

// https://api.weatherapi.com/v1/current.json?key=3d4405718ac2405eb42205350231312&q=london

const fetchData = function (city) {
    // Fetch returns a promise
    // No need to wrap fetch in a "new Promise" (promise wrapping)
    return fetch(
        `https://api.weatherapi.com/v1/current.json?key=3d4405718ac2405eb42205350231312&q=${city}`
    ).then(response => {
        if (response.ok) {
            // Return parsed response object
            return response.json();
        } else {
            // Response not ok, throw error
            // throw to external handling (catch) when function called
            throw new Error('Data response was not ok 🥺');
        }
    });
};

fetchData('berlin').then(data => {
    console.log(data);

    const testData = document.querySelector('.test-data');
    testData.textContent = data.location.name;

    const icon = document.createElement('img');
    document.body.appendChild(icon);
    icon.setAttribute('src', data.current.condition.icon);
});
