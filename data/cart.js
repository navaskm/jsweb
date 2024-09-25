
export let cart = JSON.parse(localStorage.getItem('cart')) 
if(!cart){
  cart = [{
  productId : '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
  quantity : 1,
  deliveryOptionId : '1'
},{
  productId : '54e0eccd-8f36-462b-b68a-8182611d9add',
  quantity : 3,
  deliveryOptionId : '2'
}];
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addItem(productId,ten){
  let matchingItem;

  cart.forEach((item)=>{
    if(productId === item.productId){
      matchingItem=item;
    }
  });

  let quantity = 1;

  if(ten !== 10){
    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`);
    quantity =Number(quantitySelector.value);
  }

  if(matchingItem){
    matchingItem.quantity += quantity;
  }else{
    cart.push({
      productId,
      quantity:quantity,
      deliveryOptionId : '1'
    });
  };
  saveToStorage();
};

export function removeFromcart(itemId){
  let newCart=[];
  cart.forEach((cartItem)=>{
    if(itemId !== cartItem.productId){
      newCart.push(cartItem);
    } 
  });

  cart = newCart;
  saveToStorage();
};

export function calculateCartQuantity(){
  let cartQuantity=0;
  cart.forEach((item)=>{
   cartQuantity+=item.quantity;
  });

  return cartQuantity;
};

export function updateQuantity(productId, newQuantity){
  let matchgItem;

  cart.forEach((cartItem)=>{

    if(newQuantity>=0 && newQuantity<=100){
      if(productId === cartItem.productId){
        matchgItem = cartItem;
      }
    }else{
      alert('Quantity must be at least 0 and less than 1000');
    }
  });

  matchgItem.quantity = newQuantity;
  saveToStorage();
};

export function updateDeliveryOption
(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((item)=>{
    if(productId === item.productId){
      matchingItem=item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}