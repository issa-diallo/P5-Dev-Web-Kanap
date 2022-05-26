import { getUrlId } from "../helpers/getUrlId.js";

const handleClick = () => {
  const productId = getUrlId("id");
  const colorValue = document.querySelector("#colors").value;
  const quantityValue = document.querySelector("#quantity").value;
  /**
   * if the user does not enter a colour and a quantity send an alert
   */
  if (colorValue == null || colorValue == "") {
    return alert("<p>Please select a color !</p>");
  }
  if (quantityValue == null || quantityValue == 0) {
    return alert("<p>Please select a quantity !</p>");
  }
  const getData = {
    id: productId,
    color: colorValue,
    quantity: Number(quantityValue),
  };
  const keyId = getData.color + "_" + productId;
  localStorage.setItem(keyId, JSON.stringify(getData));
  // redirection to the shopping cart page
  window.location.href = "cart.html";
};
export { handleClick };
