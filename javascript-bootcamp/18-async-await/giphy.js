'use strict';
/*
--------------------------------------------------------------------------------
GIPHY - https://www.theodinproject.com/lessons/node-path-javascript-async-and-await
--------------------------------------------------------------------------------
*/

// DOM elements
const img = document.querySelector('#gif');

// async function getDogs(searchQuery) {
//   fetch(
//     `https://api.giphy.com/v1/gifs/translate?api_key=Exa5gXbGLGErrkoWHv0IvkXzjE12ktDZ&s=${searchQuery}`
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (response) {
//       img.src = response.data.images.original.url;
//     });
// }

async function getDogs(searchQuery) {
    try {
        let response = await fetch(
            `https://api.giphy.com/v1/gifs/translate?api_key=Exa5gXbGLGErrkoWHv0IvkXzjE12ktDZ&s=${searchQuery}`
        );
        let giphyData = await response.json();
        img.src = giphyData.data.images.original.url;
    } catch (err) {
        console.error(err);
    }
}

getDogs('dog');
