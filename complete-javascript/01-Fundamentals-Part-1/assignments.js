/////////////////////////////////////////////////////////
// LESSON 9 - Values and Variables
/////////////////////////////////////////////////////////

const country = 'Germany';
const continent = 'Europe';

/////////////////////////////////////////////////////////
// LESSON 10 - Data Types
/////////////////////////////////////////////////////////

const language = 'Deutsch';

/////////////////////////////////////////////////////////
// LESSON 12 - let, const and var
/////////////////////////////////////////////////////////

const myLanguage = 'English';

/////////////////////////////////////////////////////////
// LESSON 13 - Basic Operators
/////////////////////////////////////////////////////////

let population = 83.2;
const populationAvg = 33;
/*
let halfPopulation = population / 2;
const populationFinland = 6000000;
const populationAvg = 33000000;

const description1 =
    country +
    ' is in ' +
    continent +
    ', and its ' +
    population +
    ' people speak ' +
    language;

console.log(description1 );
*/

/////////////////////////////////////////////////////////
// LESSON 18 - If / else statements
/////////////////////////////////////////////////////////

/*
if (population > populationAvg) {
    console.log(
        `${country}'s population is ${
            population - populationAvg
        } million above the average ⬆️👫.`
    );
} else {
    console.log(
        `${country}'s population is ${
            populationAvg - population
        } million below the average ⬇️👫.`
    );
}
*/

/////////////////////////////////////////////////////////
// LESSON 20 - Type conversion and Coercion
/////////////////////////////////////////////////////////

/*
console.log('9' - '5');// 4
console.log('19' - '13' + '17'); // 617
console.log('19' - '13' + 17); // 23
console.log('123' < 57); // false
console.log(5 + 6 + '4' + 9 - 4 - 2);// 1143
*/

/////////////////////////////////////////////////////////
// LESSON 22 - Equality Operators: == vs. ===
/////////////////////////////////////////////////////////

/*
const numNeighbours = Number(
    prompt('How many neighbour countries does your country have?')
);

if (numNeighbours === 1) {
    console.log('Only 1 border! 🍫');
} else if (numNeighbours > 1) {
    console.log('More than 1 border 🍱');
} else {
    console.log('No borders 🍕');
}
*/

/////////////////////////////////////////////////////////
// LESSON 24 - Logical operators
/////////////////////////////////////////////////////////

/*
const speakEnglish = false;
const isIsland = false;

if (speakEnglish && population < 50 && isIsland) {
    console.log('You should live in Germany! 🏠');
} else {
    console.log('You should probably look somewhere else 🔍');
}
*/

/////////////////////////////////////////////////////////
// LESSON 26 - switch statement
/////////////////////////////////////////////////////////

/*
switch (language) {
    case 'Chinese':
    case 'Mandarin':
        console.log('🇨🇳 MOST number of native speakers!');
        break;
    case 'Spanish':
        console.log('🇪🇸 2nd place in number of native speakers');
        break;
    case 'English':
        console.log('🇬🇧🇺🇸🇨🇦🇦🇺🇳🇿 3rd Place');
        break;
    case 'Hindi':
        console.log('🇮🇳 Number 4');
        break;
    case 'Arabic':
        console.log('5th most spoken language');
        break;
    default:
        console.log('Great language too 👍');
}
*/

/////////////////////////////////////////////////////////
// LESSON 27 - The conditional (ternary) operator
/////////////////////////////////////////////////////////
/*
const aboveAvg =
    population > 33
        ? `${country} population is ABOVE average`
        : `${country} population is BELOW average`;

console.log(
    `${country}'s population is ${
        population > 33 ? 'ABOVE' : 'BELOW'
    } average 👍`
);
*/
