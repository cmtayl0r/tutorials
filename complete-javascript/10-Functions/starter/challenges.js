'use strict';

////////////////////////////////////////////////////////////
// Coding challenge #1
////////////////////////////////////////////////////////////

/*
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
*/

///////////////////////// Mini-Challenge 1

/*
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
*/

///////////////////////// Mini-Challenge 2

/*
const multiply = function (x, y) {
    return x * y;
};

const double = multiply.bind(null, 2);

console.log(`Your doubled number is ${double(12)}`);
*/

////////////////////////////////////////////////////////////
// Coding challenge #2
////////////////////////////////////////////////////////////


(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
})();
