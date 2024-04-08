const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

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

const fetchPokemon = async id => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        console.log(data);
        console.log(data.name);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};
fetchPokemon(2);

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
