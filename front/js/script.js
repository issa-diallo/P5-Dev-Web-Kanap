const API_PRODUCTS = "http://localhost:3000/api/products";
const API_PRODUCT = "http://localhost:3000/api/products/:product-id";

const getProduct = async (productId) => {
  const response = await fetch(API_PRODUCT + productId);
  const product = await response.json();
  console.log(product);
};

/**
 * Returns the list of products in json format
 * @returns
 */
const getProductData = async () => {
  const response = await fetch(API_PRODUCTS);
  const products = await response.json();
  console.log(products);
  return products;
};

/**
 * Displays a product element with its content
 * @param {*} product
 * @returns
 */
const productItemElement = (product) => `
    <a href="./product.html?id=42">
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
    </a>
    `;

/**
 * Injects data in items
 */
const useData = async () => {
    const data = await getProductData();
    const items = document.querySelector("#items");

    items.innerHTML += data
        .map((product) => productItemElement(product))
        .join("");
};

useData();
