 import { cart, calculateCartQuantity } from "../../data/cart.js";
 import { getProduct } from "../../data/products.js";
 import { getDeliveryOption } from "../../data/deliveryoption.js";
 import { fixed } from "../utlity/many.js";
 import { addOrder } from "../../data/order.js";

 
export function renderPaymentSummary(){

  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {

    //Cost of product
    const product = getProduct(cartItem.productId);
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

  const cartQuantity = calculateCartQuantity();
  

  const paymentSummaryHTML =`
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row ">
      <div class="js-items-quantity">
        Items (${cartQuantity}):
      </div>
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

    <button class="place-order-button button-primary js-place-order-button">
      Place your order
    </button>
  `
  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML

  document.querySelector('.js-place-order-button').addEventListener('click', async ()=>{
    try{
      const response = await fetch('https://supersimplebackend.dev/orders',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });
  
      const order = await response.json();
      addOrder(order);
  
    }catch(error){
      console.log('Please tray again later');
    }

    window.location.href = 'orders.html'
    
  });
};