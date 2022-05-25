const getColors = (product) => {
  const select = document.querySelector("#colors");
  const colors = product.colors;
  colors.map((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    select.appendChild(option);
  });
  return select;
};
export { getColors };
