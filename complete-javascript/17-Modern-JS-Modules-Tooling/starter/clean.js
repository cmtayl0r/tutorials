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
const getLimit = user => spendingLimits?.[user] ?? 0;

// Pure function (Functional programming)
// Using default parameters, user = Jonas if empty
const addExpense = function (
    state,
    limits,
    value,
    description,
    user = 'jonas'
) {
    const cleanUser = user.toLowerCase();

    return value <= getLimit(cleanUser)
        ? // create a copy of state array using spread operator
          [...state, { value: -value, description, user: cleanUser }]
        : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
    newBudget1,
    spendingLimits,
    100,
    'Going to movies 🍿',
    'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

const checkExpense = function () {
    for (const entry of budget)
        if (entry.value < -getLimit(entry.user)) entry.flag = 'limit';
};
checkExpense();

const logBigExpenses = function (bigLimit) {
    let output = '';
    for (let entry of budget)
        output +=
            entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
    // Emojis are 2 chars
    output = output.slice(0, -2); // Remove last '/ '
    console.log(output);
};

console.log(budget);
logBigExpenses(1000);
