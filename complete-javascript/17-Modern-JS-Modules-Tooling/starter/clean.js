'strict mode';
const budget = Object.freeze([
    { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
    { value: -45, description: 'Groceries 🥑', user: 'jonas' },
    { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
    { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
    { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
    { value: -20, description: 'Candy 🍭', user: 'matilda' },
    { value: -125, description: 'Toys 🚂', user: 'matilda' },
    { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// Immutable
const spendingLimits = Object.freeze({
    jonas: 1500,
    matilda: 100,
});

// The optional chaining operator (?.) and the nullish coalescing operator (??)
// If spendingLimits user is undefined, short circuit and return undefined
// nullish coalescing operator provides a default value (0)
const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure function (Functional programming)
// Using default parameters, user = Jonas if empty
const addExpense = function (
    state, // current version of the object
    limits, // limits values for users
    value,
    description,
    user = 'jonas' // default user if none specified
) {
    const cleanUser = user.toLowerCase();

    return value <= getLimit(limits, cleanUser)
        ? // if true, create a copy of state array using spread operator
          [...state, { value: -value, description, user: cleanUser }]
        : state;
};

// We aren't manipulating/mutating the original array objects, we create copies by mapping over the original
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
    newBudget1,
    spendingLimits,
    100,
    'Going to movies 🍿',
    'Matilda'
);
const newBudget3 = addExpense(
    newBudget2,
    spendingLimits,
    600,
    'Stuff 🎁',
    'jonas'
);
console.log(newBudget1);
console.log(newBudget2);
console.log(newBudget3);

// We check the final budget, and add flags to added expenses (if over limits)
const checkExpense = function (state, limits) {
    return state.map(entry => {
        // Using ternary operator
        // If value is above the limit, return copy of original object, add new property (flag)
        // create a copy of state array using spread operator
        // else, return original entry
        return entry.value < -getLimit(limits, entry.user)
            ? { ...entry, flag: 'limit' }
            : entry;
    });
};
const finalBudget = checkExpense(newBudget3, spendingLimits);

const logBigExpenses = function (state, bigLimit) {
    const bigExpenses = state
        .filter(entry => entry.value <= -bigLimit)
        .map(entry => entry.description.slice(-2))
        .join(' / '); // Emojis are 2 chars

    console.log(bigExpenses);
};

console.log(finalBudget);
logBigExpenses(finalBudget, 500);
