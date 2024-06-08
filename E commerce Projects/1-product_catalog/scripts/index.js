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
}
getProducts();

console.log(allProducts);