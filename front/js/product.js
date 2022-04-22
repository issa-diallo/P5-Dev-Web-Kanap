/**
 * Get of the id in the url
 */
const requestQueryString = window.location.search;
const searchParams = new URLSearchParams(requestQueryString);
const productId = searchParams.get("id");

/**
 * Init API
 */
const API_PRODUCT = `http://localhost:3000/api/products/${productId}`;

/**
 * Returns a product in json format
 * @returns
 */
const getProductData = async () => {
  const response = await fetch(API_PRODUCT);
  const product = await response.json();
  return product;
};

/**
 * Create a product
 */
const makeProduct = async () => {
  const data = await getProductData();

  const img = document.querySelector(".item__img");

  const image = document.createElement("img");
  image.src = data.imageUrl;
  image.alt = data.altTxt;

  const h1 = document.querySelector("#title");
  const price = document.querySelector("#price");
  const description = document.querySelector("#description");
  const select = document.querySelector("#colors");
  const colors = data.colors;

  img.appendChild(image);
  h1.textContent += data.name;
  price.textContent += data.price;
  description.textContent += data.description;

  colors.map((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    select.appendChild(option);
  });
};
makeProduct();
