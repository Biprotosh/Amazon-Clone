export function formatCurrency(priceCents) {
    /* 
        return (priceCents/100).toFixed(2);
        There is a issue with toFixed method, it doesn't round the price properly, so the best pracite is to round the priceCents first
    */
    return (Math.round(priceCents) / 100).toFixed(2);
}

export default formatCurrency;