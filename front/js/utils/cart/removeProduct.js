import { cartTotalPrice } from "./cartTotalPrice.js";

const getRemoveProduct = (e) => {
  let buttonClicked = e.target;
  // TO DO Refactoring of variable article
  let article =
    buttonClicked.parentElement.parentElement.parentElement.parentElement;
  const keyNameStorage = article.getAttribute("data-id");
  localStorage.removeItem(keyNameStorage);
  article.remove();
  cartTotalPrice();
  window.setTimeout(() => {
    window.location.reload(true);
  }, 100);
};

export { getRemoveProduct };
