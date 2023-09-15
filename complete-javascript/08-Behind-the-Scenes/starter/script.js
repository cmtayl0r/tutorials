'use strict';

const calcAge = function (birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName); // Looks in the global scope

  const printAge = function () {
    // Function goes to parent scope(s) to find age and birthyear variable
    
    const output = `${firstName}. You are ${age} years old, born in ${birthYear}`;
    console.log(output);

    let str;
    if (birthYear >= 1981 && birthYear <= 1996) {
      // block scope
      str = `Oh, and you are a millenial ${firstName}`;
      console.log(str);

      // this function is block scoped (in strict mode)
      function add(a, b) {
        return a + b;
      }
    } else {
      str = `Eyup, Grandad 👴🏻 ${firstName}`;
      console.log(str);
    }

    // produces not defined error
    // only available in the block scope
    // console.log(str)
  };

  printAge();
  return age;
};

// global variable, made available inside the scope of a function
const firstName = 'Chris';
calcAge(1980);

/*
// we are in the outer scope
// we have NO access to the child scope
console.log(age); // not defined error
printAge(); // not defined error
*/

// output: Chris
// output: You are 57 years old, born in 1980
// output: Eyup, Grandad 👴🏻 Chris
