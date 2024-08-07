import { cart } from "../data/cart.js";

let prodectsHTML = '';

products.forEach((prodect)=>{
  prodectsHTML +=`
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${prodect.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${prodect.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${prodect.rating.stars*10}.png">
        <div class="product-rating-count link-primary">
          ${prodect.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(prodect.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${prodect.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart 
      js-added-to-cart-${prodect.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${prodect.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML=prodectsHTML;

const addedMessageTimeouts = {};

document.querySelectorAll('.js-add-to-cart').forEach( (button)=>{
  button.addEventListener('click', ()=>{
    
    const prodectId= button.dataset.productId;

    let matchingItem;

    cart.forEach((item)=>{
      if(prodectId === item.prodectId){
        matchingItem=item;
      }
    });

    const quantitySelector = document.querySelector(`
    .js-quantity-selector-${prodectId}`);
    const quantity =Number(quantitySelector.value);

    if(matchingItem){
      matchingItem.quantity += quantity;
    }else{
      cart.push({
        prodectId,
        quantity
      });
    };

    let cartQuantity = 0;

    cart.forEach((item)=>{
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
    
    const addedMessage= document.querySelector(`
      .js-added-to-cart-${prodectId}
    `);

    const previousTimeoutId = addedMessageTimeouts[prodectId];
    if(previousTimeoutId){
      clearTimeout(previousTimeoutId);
    }
    
    addedMessage.classList.add('added-to-cart-visible');

    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
    }, 2000);

    addedMessageTimeouts[prodectId] = timeoutId;
  });
});