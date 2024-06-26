// fetch(`${BASE_URL}/1`) // Receives a promise
//     .then(res1 => {
//         res1.json(); // Returns a new promise
//         console.log('First promise resolved', res1);
//         return fetch(`${BASE_URL}/2`); // Returns a new promise
//     })
//     .then(res2 => {
//         console.log('Second promise resolved', res2);
//         return fetch(`${BASE_URL}/3`); // Returns a new promise
//     })
//     .then(res3 => {
//         console.log('Third promise resolved', res3);
//     })
//     .catch(error => console.error(error));

// const fetchPokemon = async id => {
//     try {
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//         if (!response.ok) throw new Error(`Error ${response.status}`);
//         const data = await response.json();
//         console.log(data);
//         console.log(data.name);
//     } catch (error) {
//         console.error('Error fetching data:', error.message);
//     }
// };
// fetchPokemon(2);

// -----------------------------------------------------------------------------
// PARALLEL ASYNC OPERATIONS
// -----------------------------------------------------------------------------

// const results = [];
// // No sequence, execute whenever promised fulfilled
// fetch(`${BASE_URL}/1`).then(res => results.push(res));
// fetch(`${BASE_URL}/2`).then(res => results.push(res));
// fetch(`${BASE_URL}/3`).then(res => results.push(res));

// async function getPokemon(id) {
//     const response = await fetch(`${BASE_URL}/${id}`);
//     results.push(response);
// }

// getPokemon(1);
// getPokemon(2);
// getPokemon(3);
// console.log(results);

// -----------------------------------------------------------------------------
// SEQUENTIAL ASYNC OPERATIONS
// -----------------------------------------------------------------------------

// const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
// const results = [];

// async function get3Pokemons(pokeIds) {
//     try {
//         let promises = pokeIds.map(id => fetch(`${BASE_URL}/${id}`));
//         let responses = await Promise.all(promises);
//         responses.forEach(response => {
//             if (!response.ok) throw new Error(`Status: ${response.status}`);
//         });
//         let pokemon = await Promise.all(responses.map(res => res.json()));
//         console.log(pokemon);
//         let names = pokemon.map(poke => poke.name);
//         console.log(names);
//     } catch (error) {
//         console.error(error.message);
//     }
// }

// get3Pokemons([1, 2, 3]);

// -----------------------------------------------------------------------------
// PROMISIFIED FUNCTIONS
// -----------------------------------------------------------------------------

// Promisified callback function to simulate an async operation
// function wait(duration) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let condition = true;
//             if (condition) {
//                 resolve('👍 Success!');
//             } else {
//                 reject('🌧️ Failure!');
//             }
//         }, duration);
//     });
// }

// // Async function
// async function triggerWait() {
//     try {
//         let firstResult = await wait(2000);
//         console.log('Result 1:', firstResult);
//         let secondResult = await wait(3000);
//         console.log('Result 2:', secondResult);
//     } catch (err) {
//         console.error('An error occurred:', err);
//     }
// }

// // Call the async function
// triggerWait();

// -----------------------------------------------------------------------------
// ASYNC NUM CARDS PART 1
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// ASYNC NUM CARDS PART 2
// -----------------------------------------------------------------------------

// const BASE_URL = 'http://numbersapi.com';

// async function showNumberTrivia(id) {
//     try {
//         const response = await fetch(`${BASE_URL}/${id}`);
//         if (!response.ok) throw new Error(`Error: ${response.status}`);
//         const data = await response.text();
//         console.log(data);
//     } catch (err) {
//         console.error(err.message);
//     }
// }

// async function showNumberRace() {
//     const promises = [
//         fetch(`${BASE_URL}/1`),
//         fetch(`${BASE_URL}/2`),
//         fetch(`${BASE_URL}/3`),
//         fetch(`${BASE_URL}/4`),
//     ];
//     const winner = await Promise.race(promises);
//     const data = await winner.text();
//     console.log(data);
// }

// async function showNumberAll() {
//     try {
//         const promises = await Promise.allSettled([
//             fetch(`${BASE_URL}/1`).then(res => res.json()),
//             fetch(`${BASE_URL}/WRONG`).then(res => res.json()),
//             fetch(`${BASE_URL}/3`).then(res => res.json()),
//             fetch(`${BASE_URL}/4`).then(res => res.json()),
//         ]);

//         const fulfilled = promises
//             .filter(promise => promise.status === 'fulfilled')
//             .map(promise => promise.value.text());
//         const rejected = promises
//             .filter(promise => promise.status === 'rejected')
//             .map(promise => promise.reason.message);
//         console.log(`showNumberAll fulfilled: ${JSON.stringify(fulfilled)}`);
//         console.log(`showNumberAll rejected: ${JSON.stringify(rejected)}`);
//     } catch (err) {
//         console.error(err.message);
//     }
// }

// showNumberTrivia(10);
// showNumberRace();

const API_URL = 'https://deckofcardsapi.com/api/deck';
let deckId = null; // Store the current deck ID
const dealBtn = document.querySelector('#dealBtn');
const cardStack = document.querySelector('#stack');

window.addEventListener('load', async function () {
    // 1 - Create a new deck of cards
    // Fetch the deck from the API and wait for the response
    // The response is a promise, so we need to await it
    // The response is a JSON object, so we need to parse it
    const deck = await this.fetch(`${API_URL}/new/shuffle`).then(res =>
        res.json()
    );
    console.log(deck);
    // Store the deck ID, so we can draw cards later
    // deck_id is the key in the JSON response
    deckId = deck.deck_id;
});

async function drawCard() {
    try {
        // 1 - Draw a card from the deck
        // Fetch the card from the API and wait for the response
        // The response is a promise, so we need to await it
        // The response is a JSON object, so we need to parse it
        const cardResponse = await fetch(
            `${API_URL}/${deckId}/draw/?count=1`
        ).then(response => response.json());

        console.log(cardResponse);

        // 2 - Check if the deck is empty
        if (cardResponse.remaining === 0) {
            cardStack.textContent = 'No cards remaining!';
            // Disable the deal button
            dealBtn.disabled = true;
            // Exit the function
            return;
        }
        // 3 - Display the card image
        // Check if the response is successful and there are cards
        if (cardResponse.success && cardResponse.cards.length > 0) {
            // Get the first card from the response
            // cards[0] is the key in the JSON response
            const card = cardResponse.cards[0];
            // Create an image element
            const cardImage = document.createElement('img');
            // Add the card class
            cardImage.classList.add('card');
            // Rotate the card randomly
            cardImage.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
            // Set the image source
            cardImage.src = card.image;
            // Set the alt text
            cardImage.alt = `${card.value} of ${card.suit}`;
            // Append the image to the stack
            cardStack.appendChild(cardImage);
        }
    } catch (error) {
        console.error(error);
    }
}

// Add an event listener to the deal button
// When the button is clicked, draw a card
dealBtn.addEventListener('click', drawCard);

// -----------------------------------------------------------------------------
// POKEMON APP
// -----------------------------------------------------------------------------

// TODO: Clear the stack before rendering new Pokemon
// TODO: Add a loading spinner while fetching data
// TODO: Add error handling for fetch requests
// TODO: Refactor as Class

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const catchBtn = document.querySelector('#catchBtn');
const pokeStack = document.querySelector('#poke-stack');

catchBtn.addEventListener('click', () => fetchRandomPoke(3));

// Fetch random Pokemon data
async function fetchRandomPoke(count) {
    try {
        // Destructure the results array from the JSON object
        const { results: pokemon } = await fetchPokeData();
        // Create array of random pokemon urls, amount determined by count
        const pokeURLs = Array.from(
            { length: count },
            () => pokemon[Math.floor(Math.random() * 100)].url
        );
        // Fetch data for chosen Pokemon
        const pokeData = await Promise.all(
            pokeURLs.map(async url => {
                const res = await fetch(url);
                if (!res.ok)
                    throw new Error(
                        `Error fetching Pokemon details [${res.status}]`
                    );
                return res.json();
            })
        );
        pokeData.forEach(poke => renderPoke(poke));
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Fetch initial 100 Pokemon data
async function fetchPokeData() {
    const response = await fetch(`${BASE_URL}?limit=100`);
    if (!response.ok)
        throw new Error(
            `Failed to fetch initial Pokemon data [${response.status}]`
        );
    return response.json();
}

// Helper function to render Pokemon data
// Destructure the object to get the name, sprites, and abilities
function renderPoke({ name, sprites, abilities }) {
    const abilityList = abilities
        .map(ability => `<li>${ability.ability.name}</li>`)
        .join(''); // Join the array into a string
    const markup = `
        <article class="poke-card">
            <h3>${name}</h3>
            <img src="${sprites.front_default}" />
            <ul>${abilityList}</ul>
        </article>
    `;
    pokeStack.insertAdjacentHTML('beforeend', markup);
}

////////////////////////////////////////////////////////////////////////////////

// function renderPokemon(data) {
//     const abilities = data.abilities
//         .map(ability => `<li>${ability.ability.name}</li>`)
//         .join('');
//     const markup = `
//         <article class="poke-card">
//             <h3>${data.name}</h3>
//             <img src="${data.sprites.front_default}" />
//             <ul>${abilities}</ul>
//         </article>
//     `;
//     pokeStack.insertAdjacentHTML('beforeend', markup);
// }

// async function getThreePokemon() {
//     try {
//         // 1 - Get initial Pokemon data of 100
//         const response = await fetch(`${BASE_URL}?limit=100`);
//         if (!response.ok)
//             throw new Error(`100 Pokemon error [${response.status}]`);
//         // Parse the response into JSON
//         // Destructure the results array from the JSON object, because we only need the results
//         const { results: pokemon } = await response.json();

//         // 2 - Get 3 random pokemon
//         // Create an array of 3 random numbers between 0 and 100
//         // Array.from creates a new array with a length of 3
//         const selectedIndexes = Array.from({ length: 3 }, () =>
//             Math.floor(Math.random() * 100)
//         );
//         // Create a new array based on array of random numbers
//         const pokeURLs = selectedIndexes.map(index => pokemon[index].url);
//         // Fetch data of 3 defined pokemon and create new array
//         const pokeData = await Promise.all(
//             pokeURLs.map(async url => {
//                 const res = await fetch(url);
//                 if (!res.ok)
//                     throw new Error(
//                         `Error fetching Pokemon details [${res.status}]`
//                     );
//                 return res.json();
//             })
//         );

//         console.log(pokeData);

//         // 4 - Run helper function on each array item
//         pokeData.forEach(renderPokemon);
//     } catch (error) {
//         console.error('Error fetching data:', error.message);
//     }
// }
