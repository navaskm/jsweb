import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderChecoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";


async function loadPage(){

  try{
    await loadProductsFetch();

  }catch(error){
    console.log('Please tray again later');
  }
  
  renderChecoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();