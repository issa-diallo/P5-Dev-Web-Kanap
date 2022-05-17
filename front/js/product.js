window.onload = () => {
  makeProduct()
}
/**
 * Get of the id in the url
 */
const requestQueryString = window.location.search;
const searchParams = new URLSearchParams(requestQueryString);
const productId = searchParams.get("id");

/**
 * Init API
 */
const API_PRODUCT = `http://localhost:3000/api/products/${productId}`;

/**
 * Returns a product in json format
 * @param  {} =>{constresponse=awaitfetch(API_PRODUCT
 * @param  {} constproduct=awaitresponse.json(
 */
const getProductData = async () => {
  const response = await fetch(API_PRODUCT);
  const product = await response.json();
  return product;
};

/**
 * Create a product
 */
const makeProduct = async () => {
  const data = await getProductData();

  // Create a Image
  const img = document.querySelector(".item__img");
  const image = document.createElement("img");
  image.src = data.imageUrl;
  image.alt = data.altTxt;
  img.appendChild(image);

  // Add textContent in elements
  const h1 = document.querySelector("#title");
  h1.textContent += data.name;

  const price = document.querySelector("#price");
  price.textContent += data.price;

  const description = document.querySelector("#description");
  description.textContent += data.description;

  const select = document.querySelector("#colors");
  const colors = data.colors;

  /**
   * @param  {} (color
   * @param  {} =>{constoption=document.createElement("option"
   * @param  {} option.value=coloroption.textContent=colorselect.appendChild(option
   * @param  {} }
   */
  colors.map((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    select.appendChild(option);
  });

  const button = document.querySelector("#addToCart");

  button.addEventListener("click", () => {
    const colorValue = document.querySelector("#colors").value;
    const quantityValue = document.querySelector("#quantity").value;

    /**
     * if the user does not enter a colour and a quantity send an alert
     */
    if (
      colorValue == null ||
      colorValue == "" ||
      quantityValue == null ||
      quantityValue == 0
    ) {
      return alert("<p>Please select a color and quantity</p>");
    }

    /**
     * data recording
     * @param  {} quantityValue
     */
    const getData = {
      id: productId,
      color: colorValue,
      quantity: Number(quantityValue)
    };
    const keyId = getData.color + "_" + productId

    /**
     * @param  {} "valueData"
     * @param  {} JSON.stringify(getData
     */
    localStorage.setItem(JSON.stringify(keyId), JSON.stringify(getData));

    // redirection to the shopping cart page
    window.location.href = "cart.html";
  });
};
