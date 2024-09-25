import { cart, removeFromcart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { fixed } from "../utlity/many.js";
import { deliveryOptions,getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryoption.js";
import { renderPaymentSummary } from "./paymentSummary.js";


//MAIN FUNCTON
export function renderOrderSummary(){

  let selectItems = '';

  cart.forEach((item) => {

    // change heading date
    const productId = item.productId;
    const matchgItem = getProduct(productId);
    
    const deliveryOptionId = item.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const datestring = calculateDeliveryDate(deliveryOption);

    selectItems +=`
    <div class="cart-item-container 
    js-cart-item-container-${matchgItem.id}">
      <div class="delivery-date js-delivery-${matchgItem.id}">
        Delivery date: ${datestring}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchgItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchgItem.name}
          </div>
          <div class="product-price">
            ${matchgItem.getPrice()}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchgItem.id}">
              ${item.quantity}</span>
            </span>

          </span>
          <span class="update-quantity-link link-primary js-update-link"
          data-product-id="${matchgItem.id}">
            Update
          </span>

          <input type="number"  class="quantity-input js-quantity-input-${matchgItem.id}" autofocus
          value="${item.quantity}"
          >

          <span class="save-quantity-link link-primary js-save-link"
          data-product-id="${matchgItem.id}">
          Save</span>

          <span class="delete-quantity-link link-primary 
          js-delete-link"
          data-delete-id="${matchgItem.id}">
            Delete
          </span>

          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          
          <div
          ${deliveryOptionHTML(matchgItem, item)}
          
        </div>
      </div>
    </div>
    `;
  });

  function deliveryOptionHTML(matchgItem, item){

    let html;

    deliveryOptions.forEach((deliveryItem)=>{

      //delivery date
      const datestring = calculateDeliveryDate(deliveryItem);

      //delivery shipping cost
      const shippingCost = deliveryItem.priceCents === 0
      ? 'FREE'
      : `$${fixed(deliveryItem.priceCents)} -`;

      //delivery cheked
      const isCheked = deliveryItem.id === item.deliveryOptionId;

      html +=`
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchgItem.id}"
        data-delivery-option-id="${deliveryItem.id}">
          <input type="radio"
            ${isCheked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchgItem.id}">
          <div>
            <div class="delivery-option-date">
              ${datestring}
            </div>
            <div class="delivery-option-price">
              ${shippingCost} Shipping
            </div>
          </div>
        </div>
        
      `
    });
    return html;
  };

  document.querySelector('.js-order-summary').innerHTML=selectItems;

  //delete button
  document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
      const itemId=link.dataset.deleteId;
      removeFromcart(itemId);
      selectedItemsQuentity();

      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  //item quantity in top heading
  function selectedItemsQuentity(){

    const selectItemsQuentity = calculateCartQuantity();

    document.querySelector('.js-order-items-quantity').innerHTML=
  `${selectItemsQuentity} Items`;
  };
  selectedItemsQuentity();

  //update button click
  document.querySelectorAll('.js-update-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
      const itemId=link.dataset.productId;
      
      const container= document.querySelector(`.js-cart-item-container-${itemId}`);
      container.classList.add('is-editing-quantity');
    });
  });

  //save button click
    document.querySelectorAll('.js-save-link').
    forEach((link)=>{
      link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');

        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = Number(quantityInput.value);

        updateQuantity(productId, newQuantity);

        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        quantityLabel.innerHTML=newQuantity;

        selectedItemsQuentity();
        renderPaymentSummary();
      });
    });


    // update heading date
  document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
    element.addEventListener('click', ()=>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      //recursion
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

};