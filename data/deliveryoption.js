import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
  id : '1',
  deliveryDays : 7,
  priceCents : 0
},{
  id : '2',
  deliveryDays : 3,
  priceCents : 499
},{
  id : '3',
  deliveryDays : 1,
  priceCents : 999
}]

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if(option.id === deliveryOptionId){
      deliveryOption=option;
    }
  });
  return deliveryOption || deliveryOption[0];
}

//not succesed 
/*
function isWeekend(date){
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || 'Sunday';
}*/

export function calculateDeliveryDate(deliveryOption){

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const datestring = deliveryDate.format('dddd, MMMM D');


  //not succesed 
  /*
  let reminingDate = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while (reminingDate > 0){
    deliveryDate = deliveryDate.add(1, 'day');

    if(!isWeekend(deliveryDate)){
      reminingDate--;
    }
  }*/

  

  return datestring;
}