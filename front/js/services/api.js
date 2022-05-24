const BASE_URL = "http://localhost:3000"
/**
 * Returns the list of products in json format
 */
const getProducts = async () => {
  const API_PRODUCTS = `${BASE_URL}/api/products`;
  const response = await fetch(API_PRODUCTS);
  const products = await response.json();
  return products;
};

/**
 * Returns a product in json format
 */
const getProduct = async (id) => {
  const API_PRODUCT = `${BASE_URL}/api/products/${id}`;
  const response = await fetch(API_PRODUCT);
  const product = await response.json();
  return product;
};

export { getProducts, getProduct };
