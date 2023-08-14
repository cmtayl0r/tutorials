// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/*
const measureKelvin = function () {
    const measurement = {
        type: 'temp',
        unit: 'celsius',
        value: Number(prompt('Degrees celsius:')),
    };

    debugger;
    const kelvin = measurement.value + 273;
    return kelvin;
};

console.log(measureKelvin());
*/

/*
-----------------------------------------------
CHALLENGE
-----------------------------------------------
*/

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function `printForecast` which takes in an array `arr`'and logs a string like the above to the console.

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

/*
TODO create 2 arrays
TODO function with arr argument
TODO -- loop over array
TODO -- add values to a string
TODO -- return template literal string
TODO -- use array[i] in string, use i + 1 for day number
*/

/*
const testData1 = [17, 21, 23];
const testData2 = [12, 5, -5, 0, 4];

const printForecast = function (arr) {
    // Empty variable to add function loop values
    let forecast = '';
    // loop over array
    for (let i = 0; i < arr.length; i++) {
        // on each loop add values to variable
        forecast += ` ... ${arr[i]}ºC in ${i + 1} days`;
    }
    return forecast;
    // you can use console.log(forecast) here instead of the return 
};

console.log(printForecast(testData2));
*/
