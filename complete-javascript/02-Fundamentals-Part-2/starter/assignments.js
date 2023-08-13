'use strict';
/////////////////////////////////////////////////////////
// 33 - Functions
/////////////////////////////////////////////////////////

/*
function describeCountry(country, population, capitalCity) {
    const description = `${country} has ${population} million people and its capital city is ${capitalCity}`;
    return description;
}

const country1 = describeCountry('🇬🇧 United Kingdom', 9, 'London');
const country2 = describeCountry('🇨🇴 Colombia', 7.1, 'Bogata');
const country3 = describeCountry('🇩🇪 Germany', 3.7, 'Berlin');

console.log(country1);
console.log(country2);
console.log(country3);
*/

/////////////////////////////////////////////////////////
// 34 - Function Declarations vs. Expressions
/////////////////////////////////////////////////////////

/*
const percentageOfTheWorld1 = function (place, population) {
    // calculate % of world
    const percentage = (population / 7900) * 100;
    // return %
    return `${place} has ${percentage.toFixed(2)}% of the worlds population`;
};

console.log(percentageOfTheWorld1('London', 9));
console.log(percentageOfTheWorld1('Berlin', 3.6));

const percentageOfTheWorld2 = (place, population) => {
    // calculate % of world
    const percentage = (population / 7900) * 100;
    // return %
    return `${place} has ${percentage.toFixed(2)}% of the worlds population`;
};

console.log(percentageOfTheWorld2('Mexico City', 9.2));
console.log(percentageOfTheWorld2('Beijing', 21.5));
*/

/////////////////////////////////////////////////////////
// 35 - Arrow Functions
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
// 36 - Functions Calling Other Functions
/////////////////////////////////////////////////////////

/*
const percentageOfTheWorld = function (calcPopulation) {
    const percentage = (calcPopulation / 7900) * 100;
    return percentage;
};

const describePopulation = function (place, population) {
    const placePercentage = percentageOfTheWorld(population);
    return `${place} has ${placePercentage} of worlds poplation`;
};

console.log(describePopulation('London', 9.1));
*/

/////////////////////////////////////////////////////////
// 39 - Introduction to Arrays
/////////////////////////////////////////////////////////

/*
const populations = [9, 7.1, 3.6, 1.9];
console.log(populations.length === 4 ? 'True! 👍' : 'False 👎');

// Function to calculate world percent
const percentageOfTheWorld = function (calcPopulation) {
    const percentage = (calcPopulation / 7900) * 100;
    return percentage;
};

// Create an array containing a percentage calculation for the 4 populations values
// Use the population percentage of the world function to calculate
const percentages = [
    percentageOfTheWorld(populations[0]).toFixed(2),
    percentageOfTheWorld(populations[1]).toFixed(2),
    percentageOfTheWorld(populations[2]).toFixed(2),
    percentageOfTheWorld(populations[3]).toFixed(2),
];

console.log(percentages);
*/

/////////////////////////////////////////////////////////
// 40 - Basic array operations/methods
/////////////////////////////////////////////////////////

/*
const neighbours = [
    'Poland',
    'France',
    'Austria',
    'Netherlands',
    'Czechia',
    'Denmark',
];

neighbours.push('Utopia');
neighbours.pop();

if (!neighbours.includes('Germany')) {
    console.log('Probably not a Central European Country 👎');
}

neighbours[neighbours.indexOf('France')] = 'New France';

console.log(neighbours);
*/

/////////////////////////////////////////////////////////
// 42 - Introduction to Objects
/////////////////////////////////////////////////////////

/*
const myCountry = {
    country: 'Germany',
    capital: 'Berlin',
    language: 'Deutsch',
    population: 83.2,
    neighbours: [
        'Denmark',
        'Netherlands',
        'Belgium',
        'Luxembourg',
        'France',
        'Switzerland',
        'Austria',
        'Czechia',
        'Poland',
    ],
};
*/

/////////////////////////////////////////////////////////
// 43 - Dot vs. Bracket Notation
/////////////////////////////////////////////////////////

/*
console.log(
    `${myCountry.country} has ${myCountry.population} million people, neighbouring ${myCountry.neighbours.length} countries and a capital called ${myCountry.capital}.`
);

myCountry.population += 2;
myCountry['population'] -= 2;

console.log(myCountry.population);
*/

/////////////////////////////////////////////////////////
// 44 - Object Methods
/////////////////////////////////////////////////////////

/*
const myCountry = {
    country: 'Germany',
    capital: 'Berlin',
    language: 'Deutsch',
    population: 83.2,
    neighbours: [
        'Denmark',
        'Netherlands',
        'Belgium',
        'Luxembourg',
        'France',
        'Switzerland',
        'Austria',
        'Czechia',
        'Poland',
    ],
    describe: function () {
        console.log(
            `${this.country} has ${this.population} million people, neighbouring ${this.neighbours.length} countries and a capital called ${this.capital}.`
        );
    },
    checkIsland: function () {
        // add new property to object, based on value of another
        this.isIsland = this.neighbours.length === 0 ? true : false;
    },
};

myCountry.describe();
// Germany has 83.2 million people, neighbouring 9 countries and a capital called Berlin.
console.log(myCountry.checkIsland()); // false
*/

/////////////////////////////////////////////////////////
// 46 - Iteration: The for Loop
/////////////////////////////////////////////////////////
/*
for (let voter = 1; voter <= 50; voter++) {
    console.log(`Voter number ${voter} is voting`);
}
*/

/////////////////////////////////////////////////////////
// 47 - Looping Arrays, Breaking and Continuing
/////////////////////////////////////////////////////////

/*
// Array to loop over
const populations = [9, 7.1, 3.6, 1.9];
// Empty array to populate
const percentages = [];

// Function to calculate world percent
const percentageOfTheWorld = function (calcPopulation) {
    const percentage = (calcPopulation / 7900) * 100;
    return percentage;
};

for (let i = 0; i < populations.length; i++) {
    // use push method to populate percentages array with function result
    percentages.push(percentageOfTheWorld(populations[i]).toFixed(2));
}

console.log(percentages);
*/

/////////////////////////////////////////////////////////
// 48 - Looping Backwards and Loops in Loops
/////////////////////////////////////////////////////////

/*
const listOfNeighbours = [
    ['Canada', 'Mexico'],
    ['Spain'],
    ['Norway', 'Sweden', 'Russia'],
];

for (let i = 0; i < listOfNeighbours.length; i++) {
    // sub loop to loop over each array row within parent array
    for (let j = 0; j < listOfNeighbours[i].length; j++) {
        // display individual value in each sub array
        console.log(j, `Neighbour: ${listOfNeighbours[i][j]}`);
    }
}
*/

/////////////////////////////////////////////////////////
// 49 - The while Loop
/////////////////////////////////////////////////////////

/*
// Array to loop over
const populations = [9, 7.1, 3.6, 1.9];
// Empty array to populate
const percentages = [];

// Function to calculate world percent
const percentageOfTheWorld = function (calcPopulation) {
    const percentage = (calcPopulation / 7900) * 100;
    return percentage;
};

let i = 0;
while (i < populations.length) {
    // variable to contan value on each iteration calculation
    const perc = percentageOfTheWorld(populations[i]).toFixed(2);
    // pus that value to the new array
    percentages.push(perc);
    i++;
}
console.log(percentages);
*/
