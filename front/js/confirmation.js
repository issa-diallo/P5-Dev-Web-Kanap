import { getUrlId } from "./utils/helpers/getUrlId.js";

window.onload = () => {
  fetchOrder();
};

const fetchOrder = () => {
  const orderId = getUrlId("order");
  const displayOrderId = document.querySelector("#orderId");
  displayOrderId.textContent = orderId;
  window.localStorage.clear()
};
