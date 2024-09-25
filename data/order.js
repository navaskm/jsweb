 export const orders = JSON.parse(localStorage.getItem('orders')) || [] ;

export function addOrder(order){
 orders.unshift(order);
 saveToStorage();
};

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
};

export function getOrder(orderId){
  
  let matchinOrder;

  orders.forEach((order) => {
    if(order.id === orderId){
      matchinOrder = order;
    }
  });

  return matchinOrder;
}