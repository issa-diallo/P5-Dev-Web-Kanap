const displayTotalPrice = (productData, cart) => {
  const totalPrice = document.querySelector("#totalPrice");
  console.log(productData);
  let total = cart.reduce(
    (total, element) => total + element.quantity * productData.price,
    0
  );
  return (totalPrice.textContent = total);
};

export { displayTotalPrice };
