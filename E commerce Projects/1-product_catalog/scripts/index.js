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


const getProducts = async () => {
  const products = await apiCaller("https://fakestoreapi.com/products");
  
  console.log(products);
}

getProducts();