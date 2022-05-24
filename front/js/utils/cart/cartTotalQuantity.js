const cartTotalQuantity = (cart) => {
  const totalQuatity = document.querySelector("#totalQuantity");
  let total = cart.reduce((total, element) => total + element.quantity, 0);
  totalQuatity.textContent = total;
};
export { cartTotalQuantity };
