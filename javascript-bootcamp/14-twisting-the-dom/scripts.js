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

// create ul
const ulParent = document.createElement('ul');

const createList = function (games) {
    // Loop over object
    for (let game of games) {
        // Destructure each child object to get easy access to each team object
        const { homeTeam, awayTeam } = game;

        // Destructure further to isolate the team name and the points
        const { team: hTeam, points: hScore } = homeTeam;
        const { team: aTeam, points: aScore } = awayTeam;

        // Create li element
        const gameLi = document.createElement('li');
        // Add initial text content to li
        const teamNames = (gameLi.textContent = `${aTeam} @ ${hTeam}`);

        // Apply bold tag to winning score
        let score;
        if (aScore > hScore) {
            score = `<b>${aScore}</b>-${hScore}`;
        } else {
            score = `${aScore}-<b>${hScore}</b>`;
        }

        // Apply winner or loser bg color to warriors
        const warriors = hTeam === 'Golden State' ? homeTeam : awayTeam;
        gameLi.classList.add(warriors.isWinner ? 'win' : 'lose');

        // Combine each text element into each li
        gameLi.innerHTML = `${teamNames} ${score}`;
        // Append each li to ul to create list
        ulParent.appendChild(gameLi);
    }
    // Return generated list
    return ulParent;
};

const container = document.querySelector('body');

const chart1 = createList(warriorsGames);
container.append(chart1);

const chart2 = createList(warriorsGames);
container.append(chart2);
