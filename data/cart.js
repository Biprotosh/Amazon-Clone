export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }, {
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 1,
        deliveryOptionId: '3'
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
            quantity: quantity_selector_value,
            deliveryOptionId: '1'
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

export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
}

export function updateQuantity(productId, newQuantity){
    let matchingItem;
    cart.forEach((cartItems) => {
        if(cartItems.productId === productId){
            matchingItem = cartItems;
        }
    });

    matchingItem.quantity = newQuantity;

    saveToStorage();
}

export function updateDelivery(productId, deliveryOptionId){
    let matchingCartItem;

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingCartItem = cartItem;
        }
    });

    matchingCartItem.deliveryOptionId = deliveryOptionId;
    // console.log(matchingCartItem.deliveryOptionId, typeof matchingCartItem.deliveryOptionId);
    saveToStorage();
}

// Getting the product using backend

export function loadCarts(){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
  });
  
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}