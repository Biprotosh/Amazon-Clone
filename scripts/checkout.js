import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummery.js";
import { loadProducts } from "../data/products.js";
import { loadCarts } from "../data/cart.js";
// import '../data/backend-practice.js';
// import '../data/cart-oop.js';
// import '../data/cart-class.js';

/*
    Promises are better way to handle asynchronous code. They let us wait for some ansynchronous code to finish before going to the next step.
    PromiseAll helps to run all the promis at the same time instead of run promise one at a time. It takes a array of promises
*/

Promise.all([
    new Promise((resolve) => {
        console.log('Start Promise');
        loadProducts(() => {
            console.log('Finished Loading');
            resolve('value1'); // it controls when to go to the next step
        });
    }),

    new Promise((resolve) => {
        loadCarts(() => {
            resolve('value2');
        });
    })
]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});

/*
new Promise((resolve) => {
    console.log('Start Promise');
    loadProducts(() => {
        console.log('Finished Loading');
        resolve('value1'); // it controls when to go to the next step
    })
}).then((value) => {
    console.log('Next Step');
    console.log(value);

    return new Promise((resolve) => {
        loadCarts(() => {
            resolve();
        });
    }).then(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/

/*
    Callbacks have problem of nesting which can be solved by promises
*/
// loadProducts(() => {
//     loadCarts(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
// });

// renderOrderSummary();
// renderPaymentSummary();