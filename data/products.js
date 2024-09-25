import { fixed } from "../script/utlity/many.js";

export function getProduct(productId){
  let matchingProduct;

  products.forEach((product)=>{
    if(productId === product.id){
      matchingProduct=product;
    }
  });
  return matchingProduct;
};

class Products{
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDitails){
    this.id = productDitails.id;
    this.image = productDitails.image;
    this.name = productDitails.name;
    this.rating = productDitails.rating;
    this.priceCents = productDitails.priceCents
  }

  getRatingStars(){
   return `images/ratings/rating-${this.rating.stars*10}.png`
  }

  getPrice(){
   return `$${fixed(this.priceCents)}`
  }

  extraInfoHTML(){
    return '';
  }
}

class Clothing extends Products{

  sizeChartLink;
  constructor(productDitails){
    super(productDitails);
    this.sizeChartLink = productDitails.sizeChartLink;
  }

  extraInfoHTML(){
    return `
      <a href="${this.sizeChartLink}"
         target="_blank">
         Size chart
      </a>    
    `
  }
}

export let products = [];


export function loadProductsFetch(){
  const Promise = fetch('https://supersimplebackend.dev/products')

  .then((response)=>{
    return response.json();
  })

  .then((productsData)=>{
    products = productsData.map((productDitails)=>{
      if(productDitails.type === 'clothing'){
        return new Clothing(productDitails);
      }   
      return new Products(productDitails);
    });
  })

  .catch((error) =>{
    console.log('Please tray again later');
  })

  return Promise;
}


export function loadProducts(fun){

  const xhr = new XMLHttpRequest()

  xhr.addEventListener('load', ()=>{
    products = JSON.parse(xhr.response).map((productDitails)=>{
      if(productDitails.type === 'clothing'){
        return new Clothing(productDitails);
      }   
      return new Products(productDitails);
    });

    fun();
  })

  xhr.addEventListener('error', (error)=>{

    console.log('Please tray again later');
    document.body.style.backgroundColor="black";
    document.body.style.color="red";
    document.body.style.margin="200px";
    document.body.style.fontSize="20px";
    document.body.style.fontwight="bold";
    document.body.innerHTML='Please tray agin later';
    
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}
  