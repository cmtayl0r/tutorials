'use strict';

let age = 43;
let oldAge = age;
age = 44;

console.log(age, oldAge);

const chris = {
  name: 'Chris',
  age: 43,
};

const anna = chris;
anna.age = 40;

console.log(chris, anna);

let lastName = 'Taylor';
let oldLastName = lastName;
lastName = 'Lohmann';

console.log(lastName, oldLastName);

const Jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = Jessica;
marriedJessica.lastName = 'Davis';

console.log(Jessica, marriedJessica);
