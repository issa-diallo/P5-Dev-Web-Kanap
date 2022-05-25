/**
 * Retrieve the basket via localStorage and format data JSON to JS then add each product in cart
 */
const basketLocalStorage = () => {
  const cart = [];
  const storageLength = localStorage.length;
  for (let i = 0; i < storageLength; i++) {
    const product = localStorage.getItem(localStorage.key(i));
    const productToJs = JSON.parse(product);
    cart.push(productToJs);
  }
  return cart;
};
export { basketLocalStorage };
