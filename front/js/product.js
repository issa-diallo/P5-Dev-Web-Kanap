import { getProduct } from "./services/api.js";
import { productElement } from "./components/product.js";
import { getColors } from "./utils/product/colors.js";
import { handleClick } from "./utils/product/handleClick.js";
import { getUrlId } from "./utils/helpers/getUrlId.js";

window.onload = () => {
  fetchProduct();
};

/**
 * Injects data in only item
 */
const fetchProduct = async () => {
  const productId = getUrlId("id");
  const product = await getProduct(productId);

  const section = document.querySelector(".item");
  const article = productElement(product);
  section.innerHTML += article;
  getColors(product);

  const button = document.querySelector("#addToCart");
  button.addEventListener("click", handleClick);
};
