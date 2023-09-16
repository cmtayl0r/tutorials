'use strict';

console.log(this);

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
};

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this);
};

calcAge(1991);
calcAgeArrow(1982);

const chris = {
  year: 1980,
  calcAge: function () {
    console.log(this);
    console.log(2037 - chris.year);
  },
};

chris.calcAge();
