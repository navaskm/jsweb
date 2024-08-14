 import { cart } from "../../data/cart.js";
 import { getProduct } from "../../data/products.js";
 import { getDeliveryOption } from "../../data/deliveryoption.js";
 import { fixed } from "../utlity/many.js";
 
export function renderPaymentSummary(){

  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {

    //Cost of product
    const product = getProduct(cartItem.prodectId);
     productPriceCents += cartItem.quantity * product.priceCents;

     //shippingConst
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
    shippingPriceCents += deliveryOption.priceCents;
  });

  //Calculate total tax
  const totalBeforeTax = 
  productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTax * 0.1;
  const totalTax = totalBeforeTax + taxCents;
  

  const paymentSummaryHTML =`
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
        $${fixed(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${fixed(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${fixed(totalBeforeTax)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${fixed(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${fixed(totalTax)}
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `
  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML
};