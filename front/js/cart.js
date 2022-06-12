import { cartItemElement } from "./components/cart.js";
import { getProduct } from "./services/api.js";
import { basketLocalStorage } from "./utils/cart/basketLocalStorage.js";
import { getRemoveProduct } from "./utils/cart/removeProduct.js";
import { cartTotalQuantity } from "./utils/cart/cartTotalQuantity.js";
import { cartTotalPrice } from "./utils/cart/cartTotalPrice.js";
import { quantityChanged } from "./utils/cart/quantityChanged.js";
import { setupForms } from "./form/checkIsFormValid.js";
import { submitForm } from "./form/submitForm.js";

window.onload = () => {
  fetchCart();
};

/**
 * Manage cart
 */
const fetchCart = async () => {
  //Get products in cart
  const cart = basketLocalStorage();
  // Display products
  cart.map(async (product) => {
    const productId = product.color + "_" + product.id;
    const id = productId.split("_");
    // Call Api
    const productData = await getProduct(id[1]);

    // Injects data in component
    const section = document.querySelector("#cart__items");
    const article = cartItemElement(productData, product, productId);
    section.innerHTML += article;

    // Display Total
    cartTotalQuantity(cart);
    cartTotalPrice();

    // Change quantity and update price
    const quantityInputs = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < quantityInputs.length; i++) {
      const element = quantityInputs[i];
      element.addEventListener("change", quantityChanged);
    }

    // Remove product some cart
    const removeCartItems = document.querySelectorAll(".deleteItem");
    for (let i = 0; i < removeCartItems.length; i++) {
      const element = removeCartItems[i];
      element.addEventListener("click", getRemoveProduct);
    }
    // Check is form valid
    setupForms()

    const orderButton = document.querySelector('#order')
    orderButton.addEventListener('click', submitForm)
  });
};