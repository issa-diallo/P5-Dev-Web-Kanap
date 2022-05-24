import { basketLocalStorage } from "./basketLocalStorage.js";
import { cartTotalPrice } from "./cartTotalPrice.js";
import { cartTotalQuantity } from "./cartTotalQuantity.js";

const quantityChanged = async (e) => {
  // TO DO change method for get key id
  let article =
    e.target.parentElement.parentElement.parentElement.parentElement;
  const keyNameStorage = article.getAttribute("data-id");
  const id = keyNameStorage.split("_")[1];
  const cart = basketLocalStorage();
  cart.map((item) => {
    if (item.id == id) {
      let product = item;
      let input = e.target;
      product.quantity = Number(input.value);
      console.log({ cart });
      localStorage.setItem(keyNameStorage, JSON.stringify(product));
      cartTotalQuantity(cart);
      cartTotalPrice();
    }
  });
};

export { quantityChanged };
