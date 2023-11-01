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
