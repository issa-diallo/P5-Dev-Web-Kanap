import { getProduct } from "./services/api.js";
import { getProductId } from "./utils/product/urlProductId.js";
import { productElement } from "./components/product.js";
import { getColors } from "./utils/product/colors.js";
import { handleClick } from "./utils/product/handleClick.js";

window.onload = () => {
  fetchProduct();
};

const fetchProduct = async () => {
  const productId = getProductId();
  const product = await getProduct(productId);

  const section = document.querySelector(".item");
  const article = productElement(product);
  section.innerHTML += article;
  getColors(product);

  const button = document.querySelector("#addToCart");
  button.addEventListener("click", handleClick);
};
