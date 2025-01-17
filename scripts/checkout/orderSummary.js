import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDelivery } from "../../data/cart.js"; // This syntax called named export cause we are using {}
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummery.js";
import { renderCheckoutHeader } from "./checkoutHeader.js"; 

/* 
    import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
    It's called default export another way of exporting. We can use it when we only want to export 1 thing.
    Each file can only have 1 defalut export
*/
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';

// function updateCartQuantity() {
//     const cartQuantity = calculateCartQuantity();
//     document.querySelector('.js-checkout-header-middle-section')
//         .innerHTML = `${cartQuantity} items`;
//     // console.log(`Check out ${cartQuantity}`);
// }
// updateCartQuantity();

renderCheckoutHeader();

export function renderOrderSummary() {
    let cartSummaryHTML = '';
    cart.forEach((cartItems) => {
        const productId = cartItems.productId;

        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItems.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);
        // console.log(deliveryOption);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItems.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}"></input>
                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItems)}
            </div>
        </div>
    </div>
    `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            // console.log(dateString);

            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `
        <div class="delivery-option js-delivery-option" 
        data-product-id="${matchingProduct.id}" 
        data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
            </div>
        </div>
        `
        });
        return html;
    }

    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeFromCart(productId);

                // const container = document.querySelector(`.js-cart-item-container-${productId}`);
                // container.remove();
                renderOrderSummary(); // Instead of using dom we are regenerating the html using renderOrderSummary()
                renderCheckoutHeader();

                renderPaymentSummary();
            });
        });

    document.querySelectorAll('.js-update-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.classList.add('is-editing-quantity');
            });
        });

    document.querySelectorAll('.js-save-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.classList.remove('is-editing-quantity');

                const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
                if (newQuantity < 0 || newQuantity > 1000) {
                    alert('Quantity must be atleast 0 and less than 1000');
                    return;
                } else if (newQuantity === 0) {
                    removeFromCart(productId);
                    // document.querySelector(`.js-cart-item-container-${productId}`).remove();
                    renderOrderSummary(); // Instead of using dom we are regenerating the html using renderOrderSummary()
                } else {
                    updateQuantity(productId, newQuantity);
                    document.querySelector(`.js-quantity-label-${productId}`)
                        .innerHTML = newQuantity;
                }
                renderCheckoutHeader();
                renderPaymentSummary();
            });
        });

    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const { productId, deliveryOptionId } = element.dataset;
                updateDelivery(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            });
        });
}