import { productItemElement } from "./components/script.js";
import { getProducts } from "./services/api.js";

window.onload = () => {
  fetchData();
};
/**
 * Injects data in items
 */
const fetchData = async () => {
  const data = await getProducts();
  const items = document.querySelector("#items");
  items.innerHTML += data
    .map((product) => productItemElement(product))
    .join("");
};

// module.exports = {fetchData,getProductData,productItemElement};
