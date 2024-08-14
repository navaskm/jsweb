
export let cart = JSON.parse(localStorage.getItem('cart')) 
if(!cart){
  cart = [{
  prodectId : '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
  quantity : 1,
  deliveryOptionId : '1'
},{
  prodectId : '54e0eccd-8f36-462b-b68a-8182611d9add',
  quantity : 3,
  deliveryOptionId : '2'
}];
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addItem(prodectId){
  let matchingItem;

  cart.forEach((item)=>{
    if(prodectId === item.prodectId){
      matchingItem=item;
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${prodectId}`);
   const quantity =Number(quantitySelector.value);

  if(matchingItem){
    matchingItem.quantity += quantity;
  }else{
    cart.push({
      prodectId,
      quantity:quantity,
      deliveryOptionId : '1'
    });
  };
  saveToStorage();
};

export function removeFromcart(itemId){
  let newCart=[];
  cart.forEach((cartItem)=>{
    if(itemId !== cartItem.prodectId){
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
      if(productId === cartItem.prodectId){
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
    if(productId === item.prodectId){
      matchingItem=item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}