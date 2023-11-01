'use strict';

// -----------------------------------------------------------------------------
// Lesson 126 - Arrow functions in object methods
// -----------------------------------------------------------------------------

const annoyer = {
    phrases: [
        'literally',
        'cray cray',
        "I can't even",
        'Totes',
        'YOLO',
        "Can't stop won't Stop",
    ],
    pick() {
        const { phrases } = this;
        const idx = Math.floor(Math.random() * phrases.length);
        return phrases[idx];
    },
    start() {
        this.timerId = setInterval(() => {
            console.log(this.pick());
        }, 2000);
    },
    stop() {
        clearInterval(this.timerId);
    },
};

// annoyer.start();

// -----------------------------------------------------------------------------
// Lesson 127 - Deck of Cards
// -----------------------------------------------------------------------------

// -----------------------------------------
// FUNCTIONALITY IN OBJECTS

const myDeck = {
    deck: [],
    drawnCards: [],
    suits: ['Spades', 'Clubs', 'Hearts', 'Diamonds'],
    values: '2,3,4,5,6,7,8,9,10,J,Q,K,A',
    initializeDeck() {
        // destructure to remove need to do "this" inside method
        const { suits, values, deck } = this;
        for (let value of values.split(',')) {
            for (let suit of suits) {
                // Populate 'deck' array with all 52 cards
                deck.push({ value, suit });
            }
        }
    },
    drawCard() {
        const card = this.deck.pop();
        this.drawnCards.push(card);
        return card;
    },
    drawMultiple(numCards) {
        const cards = [];
        for (let i = 0; i < numCards; i++) {
            cards.push(this.drawCard());
        }
        return cards;
    },
    shuffle() {
        const { deck } = this;
        // Loop over array backwards
        for (let i = deck.length - 1; i > 0; i--) {
            // Pick random index before current element
            let j = Math.floor(Math.random() * (i + 1));
            // Swap
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    },
};

// myDeck.initializeDeck();
// myDeck.shuffle();
// myDeck.drawMultiple(6);
// console.log(myDeck.drawnCards);

// -----------------------------------------
// REFACTORED AS A CLASS
// Define a new class named 'Deck' to represent a deck of cards
class DeckCl {
    // Constructor method is automatically called when a new instance of the class is created
    constructor() {
        // Initialize an empty array to store the cards in the deck
        this.deck = [];
        // Initialize an empty array to store the cards that are drawn from the deck
        this.drawnCards = [];
        // Initialize an array of suits that a card can have
        this.suits = ['Spades', 'Clubs', 'Hearts', 'Diamonds'];
        // Initialize a string of values that a card can have, separated by commas
        this.values = '2,3,4,5,6,7,8,9,10,J,Q,K,A';
        // Call the 'initializeDeck' method to populate the 'deck' array with cards
        // Called within constructor means deck setup as soon as instance of DeckCl class is created
        this.initializeDeck();
    }

    // Method to initialize the deck with 52 cards
    initializeDeck() {
        // Destructure properties of the current instance to make them easily accessible
        // --> Remove need for duplicating use of 'this'
        const { suits, values, deck } = this;
        // Loop through each card value in the 'values' string
        for (let value of values.split(',')) {
            // For each value, loop through each suit
            for (let suit of suits) {
                // Add a card with the current value and suit to the 'deck' array
                deck.push({ value, suit });
            }
        }
    }

    // Method to draw a single card from the deck
    drawCard() {
        // Remove the last card from the 'deck' array and store it in the 'card' variable
        const card = this.deck.pop();
        // Add the drawn card to the 'drawnCards' array
        this.drawnCards.push(card);
        // Return the drawn card
        return card;
    }

    // Method to draw a specified number of cards from the deck
    drawMultiple(numCards) {
        // Initialize an empty array to store the drawn cards
        const cards = [];
        // Loop as many times as the specified number of cards to draw
        for (let i = 0; i < numCards; i++) {
            // Add a drawn card to the 'cards' array using the 'drawCard' method
            cards.push(this.drawCard());
        }
        // Return the array of drawn cards
        return cards;
    }

    // Method to shuffle the cards in the deck
    shuffle() {
        // Destructure the 'deck' property for easier access
        // --> Remove need for duplicating use of 'this'
        const { deck } = this;
        // Loop through the 'deck' array in reverse
        for (let i = deck.length - 1; i > 0; i--) {
            // Generate a random index between 0 and the current index
            let j = Math.floor(Math.random() * (i + 1));
            // Swap the positions of the cards at the current index and the randomly generated index
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }
}

// Create a new instance of the 'Deck' class and store it in the 'myDeck' variable
// All 52 cards are generated due to initializeDeck() called in constructor method
const myDeck = new Deck();
// Shuffle the cards in the 'myDeck' instance
myDeck.shuffle();
// Draw a card from the 'myDeck' instance and log it to the console
console.log(myDeck.drawCard());
