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
        <div class="pdt w-full shadow-lg p-3 rounded ">
        <div class="fave">
        <ion-icon class="heart" name="heart"></ion-icon>
        </div>
        <div class="product-info">
          <img src="${productDatas.image}" alt="" class="product-img">
          <div class="py-4">
          <p class="category uppercase font-bold">${productDatas.category}</p>
          <h3 class="product-title">${productDatas.title}</h3>
          <h2 class="price font-bold">$${productDatas.price.toFixed(2)}</h2>
          
        </div>
        </div>
        
        <div class="cart">
        <button class="addToCart uppercase text-md rounded font-bold p-2 bg-sky-500 border-4"> add to cart </dutton>
        </div>
        </div>`;
} 

const updateProductsCatalogue = products => {
  
  const productsSection = document.querySelector("#products-container");
 
 products.forEach(product=>{
   productsSection.insertAdjacentHTML("beforeend", createProductsElement(product));
 });
}