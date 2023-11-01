'use strict';

const warriorsGames = [
    {
        awayTeam: {
            team: 'Golden State',
            points: 119,
            isWinner: true,
        },
        homeTeam: {
            team: 'Houston',
            points: 106,
            isWinner: false,
        },
    },
    {
        awayTeam: {
            team: 'Golden State',
            points: 105,
            isWinner: false,
        },
        homeTeam: {
            team: 'Houston',
            points: 127,
            isWinner: true,
        },
    },
    {
        homeTeam: {
            team: 'Golden State',
            points: 126,
            isWinner: true,
        },
        awayTeam: {
            team: 'Houston',
            points: 85,
            isWinner: false,
        },
    },
    {
        homeTeam: {
            team: 'Golden State',
            points: 92,
            isWinner: false,
        },
        awayTeam: {
            team: 'Houston',
            points: 95,
            isWinner: true,
        },
    },
    {
        awayTeam: {
            team: 'Golden State',
            points: 94,
            isWinner: false,
        },
        homeTeam: {
            team: 'Houston',
            points: 98,
            isWinner: true,
        },
    },
    {
        homeTeam: {
            team: 'Golden State',
            points: 115,
            isWinner: true,
        },
        awayTeam: {
            team: 'Houston',
            points: 86,
            isWinner: false,
        },
    },
    {
        awayTeam: {
            team: 'Golden State',
            points: 101,
            isWinner: true,
        },
        homeTeam: {
            team: 'Houston',
            points: 92,
            isWinner: false,
        },
    },
];

// FN: Create list of games
// Pass in data object & a target team
const createList = function (games, targetTeam) {
    // create containingul
    const ulParent = document.createElement('ul');
    // Loop over each game object in the games array
    for (let game of games) {
        // 1 - Create li element to populate
        const gameLi = document.createElement('li');

        // 2 - Get score string
        // --> Set li content to result of function
        // --> function applied to each game object
        gameLi.innerHTML = getScoreline(game);

        // 3 - Apply winner or loser styling to target team
        // --> If the result of isWinner() function is true, add 'win' class to the 'li', else add 'lose'.
        // --> Applies win or loss class to targetTeam
        gameLi.classList.add(isWinner(game, targetTeam) ? 'win' : 'lose');

        // 4 - Append each li to ul to create list
        ulParent.appendChild(gameLi);
    }
    // Return the 'ul' containing the 'li' elements.
    return ulParent;
};

// FN: Determine if the target team won
// --> Pass in destructured game object to get home and away team objects
const isWinner = function ({ homeTeam, awayTeam }, targetTeam) {
    // If the home team's name matches the target team's name, select the home team, else select the away team
    const target = homeTeam.team === targetTeam ? homeTeam : awayTeam;
    // Return true if the selected team won, else false.
    return target.isWinner;
};

// FN: Generate a score string
const getScoreline = function ({ homeTeam, awayTeam }) {
    // 1 - Further destructuring to get the name and score of both teams.
    const { team: hTeam, points: hScore } = homeTeam;
    const { team: aTeam, points: aScore } = awayTeam;

    // 2 - Generating the team names string
    const teamNames = `${aTeam} @ ${hTeam}`;

    // 3 - Compare the scores and bold the score of the winning team
    // --> score variable block scoped if defined in if else statement
    // --> initialized outside to ensure that it's accessible after the conditionals
    let score;
    if (aScore > hScore) {
        score = `<b>${aScore}</b>-${hScore}`;
    } else {
        score = `${aScore}-<b>${hScore}</b>`;
    }
    // Return the string in the format "teamNames score".
    return `${teamNames} ${score}`;
};

// Select target containers for each team
const gswSection = document.querySelector('#gs');
const hrSection = document.querySelector('#hr');

// Calling the createList function for both teams and storing the resulting 'ul's
const gswChart = createList(warriorsGames, 'Golden State');
const hrChart = createList(warriorsGames, 'Houston');

// Appending both 'ul's to their relevant sections
gswSection.appendChild(gswChart);
hrSection.appendChild(hrChart);
