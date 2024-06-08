//import algoliasearch from 'https://cdn.jsdelivr.net/npm/algoliasearch@4.23.3/dist/algoliasearch.esm.browser.js';



/* Generic function for API call*/
const apiCaller = async url => {
  try {
    const fetchedData = await fetch(url);

    const response = await fetchedData.json();

    return response;

  } catch (error) {
    console.log(`Error making api call ${error}`);
  }
}

let allProducts = [];

const getProducts = async () => {
  allProducts = [...await apiCaller("https://fakestoreapi.com/products")];
  updateProductsCatalogue(allProducts); 
}
getProducts();


const createProductsElement = productDatas => {
 return `
        <div class="pdt">
        <div class="fave">
        <ion-icon class="heart" name="heart"></ion-icon>
        </div>
        <div class="product-info">
          <img src="${productDatas.image}" alt="" class="product-img">
          <p class="category">${productDatas.category}</p>
          <span class="item-id">${productDatas.id}</span>
          <h3 class="product-title">${productDatas.title}</h3>
          <h2 class="price">$${productDatas.price.toFixed(2)}</h2>
        </div>
        
        <div class="cart">
        <button class="addToCart"> add to cart </dutton>
        </div>
        </div>`;
  console.log(productDatas)
} 

const updateProductsCatalogue = products => {
  const productsSection = document.querySelector("products-container");
  
 products.forEach(product=>{
   productsSection.insertAdjacentHTML("beforeend",createProductsElement(product));
 });
}