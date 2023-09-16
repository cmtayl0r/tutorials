'use strict';

const chris = {
  firstName: 'Chris',
  year: 1982,
  calcAge: function () {
    console.log(2037 - this.year);

    const self = this; 
    const isMillenial = function () {
      console.log(self);
      console.log(self.year >= 1981 && self.year <= 1996);
    };
    isMillenial();
  },
};

chris.calcAge();
