'use strict';

////////////////////////////////////////////////////////////
// Coding challenge #1
////////////////////////////////////////////////////////////

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

/*
// Task 1
// Destructure array in object
const [players1, players2] = game.players;
console.log(`Team 1: ${players1}`);
console.log(`Team 2: ${players2}`);

// Task 2
// rest operator
const [gk, ...fieldPlayers] = players1;
console.log(`The Goalkeeper: ${gk}`);
console.log(`The Outfield Players: ${fieldPlayers}`);

// Task 3
// spread operator to merge
const allPlayers = [...players1, ...players2];
console.log(`All the players: ${allPlayers}`);

// Task 4
// spread operator to merge
const subsTeam1 = ['Thiago', 'Coutinho', 'Perisic'];
const players1Final = [...players1, ...subsTeam1];
console.log(`Team 1 players used: ${players1Final}`);

// Task 5
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

// Task 6
// spread operator to destructure the array to its values
const printGoals = function (...players) {
    console.log(`The goal scorers: ${players}`);
    console.log(`They scored ${players.length} goals`);
};
printGoals(...game.scored);

// Task 7
// find lowest value
// print lowest value
team1 < team2 && console.log('Team 1 is more likely to win');
team2 < team1 && console.log('Team 2 is more likely to win');
*/

////////////////////////////////////////////////////////////
// Coding challenge #2
////////////////////////////////////////////////////////////

/////////// TASK 1
// Print each player name to the console, along with the goal number
// entries() will give us an index number, just like a for loop over an array
for (const [i, scorer] of game.scored.entries()) {
    console.log(`Goal ${i + 1}: ${scorer}`);
}

/////////// TASK 2
// Use a loop to calculate the average odd and log it to the console

// creates a variable odds
// assigns it the values of the properties within the odds object of the game object
// odds becomes an array containing [1.33, 3.25, 6.5].
const odds = Object.values(game.odds);

// Initialize odd average
let oddAvg = 0;

// add odd to oddAvg using for of loop
for (const odd of odds) oddAvg += odd;

// divides the oddAvg by the number of odds in the array
// which is determined by odds.length.
oddAvg /= odds.length;

console.log(oddAvg.toFixed(2));

/////////// TASK 3
// Print the 3 odds to the console, but in a nice formatted way
console.log(`Odd of victory ${game.team1}: ${game.odds.team1}`);
console.log(`Odd of draw: ${game.odds.x}`);
console.log(`Odd of victory ${game.team2}: ${game.odds.team2}`);

////////////////////////////////////////////////////////////
// Coding challenge #3
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// Coding challenge #4
////////////////////////////////////////////////////////////
