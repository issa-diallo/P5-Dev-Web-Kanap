import { getProductId } from "./urlProductId.js";

const handleClick = () => {
  const productId = getProductId();
  const colorValue = document.querySelector("#colors").value;
  const quantityValue = document.querySelector("#quantity").value;
  console.log(productId, colorValue, quantityValue);
  /**
   * if the user does not enter a colour and a quantity send an alert
   */
  if (colorValue == null || colorValue == "") {
    return alert("<p>Please select a color !</p>");
  }
  if (quantityValue == null || quantityValue == 0) {
    return alert("<p>Please select a quantity !</p>");
  }
  /**
   * data recording
   * @param  {} quantityValue
   */
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
