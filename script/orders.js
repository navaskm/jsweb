import { orders } from "../data/order.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { fixed } from "./utlity/many.js";
import { loadProductsFetch, getProduct } from "../data/products.js";
import { addItem } from "../data/cart.js";


async function loadPage() {
  
  await loadProductsFetch();

  let ordersHTML='';

  orders.forEach((order) => {

    let orderdate = dayjs(order.orderTime).format('MMMM D')

    ordersHTML +=`
    <div class="order-container">
          
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderdate}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${fixed(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid">
        ${productListHTML(order)}
      </div>
    </div>
      `;
  });


  function productListHTML(order){
    
    let productListHTML = '';

    order.products.forEach((productDetails)=>{
 
      const product = getProduct(productDetails.productId);

      productListHTML +=`
       <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
          </div>

          <div class="product-quantity ">
            Quantity:
            <span class="js-product-quantity-${product.id}"> ${productDetails.quantity}
            </span>
          </div>

          <button class="buy-again-button button-primary   js-buy-again-button" 
          data-product-id="${product.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>

        </div>

        <div class="product-actions">
          <a 
          href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    return productListHTML;

  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click',()=>{

      let btnId = button.dataset.productId
      const ten = 10;

      //quantity
      const qnty = document.querySelector(`.js-product-quantity-${btnId}`).innerText;

      button.classList.add('added');

      addItem(btnId,ten,qnty);

      //change the btton test
      button.innerHTML= `&#x2713 Added`;
      setTimeout(() => {
        button.innerHTML=`<img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>`
          button.classList.remove('added');
      }, 1500);
    })
  });

} 
loadPage();