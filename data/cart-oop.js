function Cart(localStorageKey){ // Use PascalCase for things that generate objects
    const cart = {
        cartItems: undefined,
    
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        
            if (!this.cartItems) {
                this.cartItems = [{
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
        },
    
        saveToStorage() {
            localStorage.setItem('localStorageKey', JSON.stringify(this.cartItems));
        },
    
        addToCart(productId) {
            const quantity_selector = document.querySelector(`.js-quantity-selector-${productId}`);
            const quantity_selector_value = Number(quantity_selector.value);
            let matchingCartItem;
        
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    matchingCartItem = cartItem;
                }
            });
        
            if (matchingCartItem) {
                matchingCartItem.quantity += quantity_selector_value;
            } else {
                this.push({
                    productId: productId,
                    quantity: quantity_selector_value,
                    deliveryOptionId: '1'
                });
            }
        
            this.saveToStorage();
        },
    
        removeFromCart(productId) {
            const newCart = [];
        
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId)
                    return;
                newCart.push(cartItem);
            });
        
            this.cartItems = newCart;
            this.saveToStorage();
        },
    
        calculateCartQuantity() {
            let cartQuantity = 0;
            this.cartItems.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });
        
            return cartQuantity;
        },
        
        updateQuantity(productId, newQuantity) {
            let matchingItem;
            this.cartItems.forEach((cartItems) => {
                if (cartItems.productId === productId) {
                    matchingItem = cartItems;
                }
            });
        
            matchingItem.quantity = newQuantity;
        
            this.saveToStorage();
        },
        
        updateDelivery(productId, deliveryOptionId) {
            let matchingCartItem;
        
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    matchingCartItem = cartItem;
                }
            });
        
            matchingCartItem.deliveryOptionId = deliveryOptionId;
            // console.log(matchingCartItem.deliveryOptionId, typeof matchingCartItem.deliveryOptionId);
            this.saveToStorage();
        }
    };

    return cart;
};

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');
cart.loadFromStorage();
businessCart.loadFromStorage();
console.log(cart);
console.log(businessCart);


