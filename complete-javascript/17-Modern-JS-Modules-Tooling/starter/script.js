// Importing module
// import { addToCart, totalPrice, totalQuantity } from './shoppingCart.js';
import * as ShoppingCart from './shoppingCart.js';

// loadash-es package file
import { cloneDeep } from 'lodash-es';

const state = {
    cart: [
        { product: 'Bread', quantity: 5 },
        { product: 'Pizza', quantity: 3 },
    ],
    user: { loggedIn: true },
};

ShoppingCart.addToCart('Bread', 5);
// console.log(totalPrice, totalQuantity);
