import { cart, removeFromcart, calculateCartQuantity, updateQuantity} from "../data/cart.js";
import { products } from "../data/products.js";
import { fixed } from "./utlity/many.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from "../data/deliveryoption.js";

let selectItems = '';

cart.forEach((item) => {
  let matchgItem;

  products.forEach((product)=>{
    if(item.prodectId === product.id){
      matchgItem=product
    }
  });

  selectItems +=`
  <div class="cart-item-container 
  js-cart-item-container-${matchgItem.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchgItem.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchgItem.name}
        </div>
        <div class="product-price">
          $${fixed(matchgItem.priceCents)}
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
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchgItem.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchgItem.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchgItem.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
});

function deliveryOptionHTML(){

  let html;

  deliveryOptions.forEach((deliveryoption)=>{

    //delivery date
    const today =dayjs();
    const delivertdate = today.add(deliveryOptions.       deliveryDays);
    const datestring = delivertdate.format('dddd, MMMM D');

    //delivery shipping cost
    const shippingCost = deliveryOptions.priceCents === 0
    ? ${}

    html +=`
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchgItem.id}">
        <div>
          <div class="delivery-option-date">
            ${datestring}
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    `
  });
  
}

document.querySelector('.js-order-summary').innerHTML=selectItems;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
    const itemId=link.dataset.deleteId;
    console.log(itemId);
    removeFromcart(itemId);

    const container = document.querySelector(
      `.js-cart-item-container-${itemId}`
    );
    container.remove();

    selectedItemsQuentity();
  });
});

 function selectedItemsQuentity(){
 /* let selectItemsQuentity=0;
  cart.forEach((item)=>{
   selectItemsQuentity+=item.quantity;
  });*/

  const selectItemsQuentity = calculateCartQuantity();

  document.querySelector('.js-order-items-quantity').innerHTML=
`${selectItemsQuentity} Items`;
};
selectedItemsQuentity();

//ggggggggggggggggggggggggggggggggggggggggggggggg
document.querySelectorAll('.js-update-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
    const itemId=link.dataset.productId;
    
    const container= document.querySelector(`.js-cart-item-container-${itemId}`);
    container.classList.add('is-editing-quantity');
  });
});

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
    });
  });
