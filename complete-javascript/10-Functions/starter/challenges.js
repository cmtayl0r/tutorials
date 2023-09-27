'use strict';

////////////////////////////////////////////////////////////
// Coding challenge #1
////////////////////////////////////////////////////////////

const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),

    registerNewAnswer() {
        // Get number
        const answer = Number(
            prompt(
                `${this.question} \n${this.options.join(
                    '\n'
                )}\n(Write option number)`
            )
        );

        // Register answer
        // use short circuiting instead of if statement
        typeof answer === 'number' &&
            answer <= this.answers.length &&
            this.answers[answer]++;
    },
    displayResults(type = 'array') {
        if (type === 'array') {
            console.log(this.answers);
        } else if (type === 'string') {
            console.log(`Poll results are: ${this.answers.join(', ')}`);
        }
    },
};

// Use bind() to clarify the target of the this keyword (poll)
document
    .querySelector('.poll')
    .addEventListener('click', poll.registerNewAnswer.bind(poll));

// call a new array as 'this'
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

///////////////////////// Challenge 1

function greet(name) {
    console.log(name); // Chris
    console.log(this); // {name: 'John'}
    console.log(`Hello, ${name}! My name is ${this.name}.`);
}

const person = {
    name: 'John',
};

// Bind person object as 'this' value
// Prefill name parameter as 'Chris'
const greetJohn = greet.bind(person, 'Chris');

greetJohn(); // Hello, Chris! My name is John

///////////////////////// Challenge 2

function multiply(x, y) {
    return x * y;
}

// Create a new function 'double' using bind() that always doubles the given number.
// Call 'double' to double a specific number.

////////////////////////////////////////////////////////////
// Coding challenge #2
////////////////////////////////////////////////////////////
