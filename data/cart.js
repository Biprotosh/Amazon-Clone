export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1
    }, {
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 1
    }];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    const quantity_selector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity_selector_value = Number(quantity_selector.value);
    let matchingCartItem;

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingCartItem = cartItem;
        }
    });

    if (matchingCartItem) {
        matchingCartItem.quantity += quantity_selector_value;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity_selector_value
        });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId)
            return;
        newCart.push(cartItem);
    });

    cart = newCart;
    saveToStorage();
}