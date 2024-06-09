//import algoliasearch from 'https://cdn.jsdelivr.net/npm/algoliasearch@4.23.3/dist/algoliasearch.esm.browser.js';

/* 'east-side': {
        '50': '#fbf8fc',
        '100': '#f5eff8',
        '200': '#eee2f2',
        '300': '#dfcbe7',
        '400': '#caaad6',
        '500': '#b081c1',
        '600': '#9f6cb1',
        '700': '#885898',
        '800': '#724b7e',
        '900': '#5d3d66',
        '950': '#402447',
    }
*/

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
  updateProductsCatalogue(allProducts, "default");
}
getProducts();


const createProductsElement = productDatas => {
  return `
        <div class="pdt w-full shadow-lg p-3 rounded bg-white">
        <div class="fave">
        <ion-icon class="heart" name="heart"></ion-icon>
        </div>
        <div class="product-info">
        
          <img src="${productDatas.image}" alt="" class="product-img h-80 w-full p-2 rounded border-4">
          
          <div class="py-4">
          <div class="ratings-cont">
          <h1 id="star-rating" class="font-bold mb-1 tracking-wide text-lg">${generateStarRating(productDatas.rating.rate)}
          ${productDatas.rating.rate} Of ${productDatas.rating.count} Reviews 
          </h1>
          </div>
          <p class="category uppercase font-bold category">${productDatas.category}</p>
         
          <h3 class="product-title my-1.5">${productDatas.title}</h3>
          <h2 class="price font-bold text-2xl">$${productDatas.price.toFixed(2)}</h2>
        </div>
        </div>
        
        <div class="cart">
        <button class="addToCart uppercase text-md rounded font-bold p-2 w-full text-white"> add to cart </dutton>
        </div>
        </div>`;
}


const updateProductSection = products => {

  const productsSection = document.querySelector("#products-container");
  productsSection.innerHTML = "";
  products.forEach(product => {
    productsSection.insertAdjacentHTML("beforeend", createProductsElement(product));
  })
}
const sortProducts = (products, sortingType) => {
  const productToSort = [...products];

  const sortByPrice = productDatas => {

    const compareFunction = (a, b) => {
      return a.price - b.price
    }
    return productDatas.sort(compareFunction);
  }


  const sortByBestSelling = productDatas => {
    const compareFunction = (a, b) => {
      return b.rating.count - a.rating.count
    }
    return productDatas.sort(compareFunction);
  }



  sortingType === "price" ? updateProductSection(sortByPrice(productToSort)) : updateProductSection(sortByBestSelling(productToSort));

  //console.log(sortingType)
}

const updateProductsCatalogue = (products, sorting) => {
  sorting === "default" ? updateProductSection(products) : sortProducts(products, sorting);
}


const productsSortingFunc = () => {
  const sortingInput = document.querySelector("#sorting");

  sortingInput.addEventListener("change", e => {
    const selectedSortOption = e.target.value;
    updateProductsCatalogue(allProducts, selectedSortOption);
  })

}
productsSortingFunc();


// Function to generate star rating HTML
function generateStarRating(rating) {
  let fullStars = Math.floor(rating);
  let halfStar = rating % 1 !== 0;
  let emptyStars = 5 - Math.ceil(rating);

  let starHTML = '';

  for (let i = 0; i < fullStars; i++) {

    starHTML += '<span class="full-star">&#9733;</span>'; // Full star
  }

  if (halfStar) {
    starHTML += '<span class="star">&#9734;</span>'; // Half star (you can use a different symbol if needed)
  }
  for (let i = 0; i < emptyStars; i++) {
    starHTML += '<span class="star">&#9734;</span>'; // Empty star
  }

  return starHTML;
}