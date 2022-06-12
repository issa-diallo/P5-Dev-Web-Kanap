import { reloadPage } from "../helpers/reloadPage.js";
import { cartTotalPrice } from "./cartTotalPrice.js";

const getRemoveProduct = (e) => {
  let buttonClicked = e.target;
  let article =
    buttonClicked.parentElement.parentElement.parentElement.parentElement;
  const keyNameStorage = article.getAttribute("data-id");
  localStorage.removeItem(keyNameStorage);
  article.remove();
  cartTotalPrice();
  reloadPage()
};
export { getRemoveProduct };
