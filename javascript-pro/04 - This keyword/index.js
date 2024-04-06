// -----------------------------------------------------------------------------
// Binding arguments
// -----------------------------------------------------------------------------

function applyVAT(taxRate, price) {
    return price + price * taxRate;
}

// "null" means that the "this" keyword will be ignored
const applyUKVAT = applyVAT.bind(null, 0.2);
const applyGermanVAT = applyVAT.bind(null, 0.19);
applyUKVAT(100); // 120
applyGermanVAT(100); // 119

// -----------------------------------------------------------------------------
// Bind method and event listeners
// -----------------------------------------------------------------------------

const chris = {
    name: 'Chris',
    city: 'Berlin',
    sing() {
        console.log(`${this.name} is singing`);
    },
};

const button = document.querySelector('#clickMe');
// create a new function that is bound to the "chris" object
// Set this to be the chris object
button.addEventListener('click', chris.sing.bind(chris));
