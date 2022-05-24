import { cartItemElement } from "./components/cart.js";
import { getProduct } from "./services/api.js";
import { basketLocalStorage } from "./utils/cart/basketLocalStorage.js";
import { getRemoveProduct } from "./utils/cart/removeProduct.js";
import { cartTotalQuantity } from "./utils/cart/cartTotalQuantity.js";
import { cartTotalPrice } from "./utils/cart/cartTotalPrice.js";
import { quantityChanged } from "./utils/cart/quantityChanged.js";

window.onload = () => {
  fetchCart();
};

const fetchCart = async () => {
  const cart = basketLocalStorage();
  cart.map(async (product) => {
    const productId = product.color + "_" + product.id;
    const id = productId.split("_");
    const productData = await getProduct(id[1]);

    const section = document.querySelector("#cart__items");
    const article = cartItemElement(productData, product, productId);
    section.innerHTML += article;

    cartTotalQuantity(cart);
    cartTotalPrice();

    const quantityInputs = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < quantityInputs.length; i++) {
      const element = quantityInputs[i];
      element.addEventListener("change", quantityChanged);
    }

    const removeCartItems = document.querySelectorAll(".deleteItem");
    for (let i = 0; i < removeCartItems.length; i++) {
      const element = removeCartItems[i];
      element.addEventListener("click", getRemoveProduct);
    }
  });
};