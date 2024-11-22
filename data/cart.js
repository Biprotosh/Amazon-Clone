export const cart = [];

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
}