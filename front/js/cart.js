/**
 * Get data of localstorage
 */
const recoversEachOrderOfCache = () => {
  const storageLength = localStorage.length;
  for (let i = 0; i < storageLength; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const objItem = JSON.parse(item);
    cart.push(objItem);
  }
};

/**
 * Create for each product the code html and Event
 * @param {*} item
 */
const displayItem = async (item) => {
  // Get of the id in localStorage
  const productId = item.id;
  // Init API
  const API_PRODUCT = `http://localhost:3000/api/products/${productId}`;
  // Get product in json
  const response = await fetch(API_PRODUCT);
  const product = await response.json();

  // Create a article then show inside section
  const article = makeArticle(item);
  displayArticle(article);
  // Create a image with div then show inside article
  const divImage = makeImage(product);
  article.appendChild(divImage);
  // Create a makeCartItemContent
  const cartItemContent = makeCartItemContent(item, product);
  article.appendChild(cartItemContent);
  // Create a makeCartItemCsettings
  const cartItemsettings = makeCartItemsettings(item, product);
  cartItemContent.appendChild(cartItemsettings);

  // Show quantity and total price
  displayTotalQuantity();
  displayTotalPrice(product);
};

const displayTotalQuantity = () => {
  const totalQuatity = document.querySelector("#totalQuantity");
  let total = cart.reduce((total, element) => total + element.quantity, 0);
  totalQuatity.textContent = total;
};

const displayTotalPrice = (product) => {
  const totalPrice = document.querySelector("#totalPrice");
  let total = cart.reduce(
    (total, element) => total + element.quantity * product.price,
    0
  );
  totalPrice.textContent = total;
};

const makeCartItemsettings = (item, product) => {
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings");

  const divSettingsQuantity = document.createElement("div");
  divSettingsQuantity.classList.add("cart__item__content__settings__quantity");

  const quantity = document.createElement("p");
  quantity.textContent = "Qté :";

  const input = document.createElement("input");
  input.type = "number";
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;
  input.classList.add("itemQuantity");
  /**
   * Create a Event then a pass id for get the value in cart
   */
  input.addEventListener("input", () =>
    updateTotalQuantityPrice(item, item.color, input.value, product)
  );

  const deleteDiv = document.createElement("div");
  deleteDiv.classList.add("cart__item__content__settings__delete");

  const p = document.createElement("p");
  p.classList.add("deleteItem");
  p.textContent = "Supprimer";
  p.addEventListener("click", () => deleteItem(item, item.color, product));

  div.appendChild(divSettingsQuantity);
  divSettingsQuantity.appendChild(quantity);
  divSettingsQuantity.appendChild(input);

  div.appendChild(deleteDiv);
  deleteDiv.appendChild(p);

  return div;
};

/**
 * Delete a product of cart and localStorage
 * @param {*} item
 * @param {*} color
 */
const deleteItem = (item, color, product) => {
  // Delete data of cart
  const deleteProduct = cart.findIndex(
    (product) => product.id === item.id && product.color === color
  );
  cart.splice(deleteProduct, 1);
  //Delete data of localStorage
  deleteData(item, color);
  // Delete data display article
  deleteDataPage(item);
  // update total price and quantity
  displayTotalQuantity();
  displayTotalPrice(product);
};

/**
 * Delete product of page
 * @param {*} item
 */
const deleteDataPage = (item) => {
  const article = document.querySelector("Article");
  if (article.dataset.id == item.id && article.dataset.color == item.color) {
    article.remove();
  }
};

/**
 * Delete data local storage
 * @param {*} item
 * @param {*} color
 */
const deleteData = (item, color) => {
  const keyId = color + "_" + item.id;
  var KeyName = window.localStorage.key(keyId);
  localStorage.removeItem(KeyName);
};

const getCartItem = (id, color) =>
  cart.find((item) => item.id === id && item.color === color);

const updateTotalQuantityPrice = (item, color, inputNewValue, product) => {
  const cartItem = getCartItem(item.id, color);
  // get new value quantity
  cartItem.quantity = Number(inputNewValue);
  item.quantity = cartItem.quantity;
  // update total price and quantity
  displayTotalQuantity();
  displayTotalPrice(product);
  //Save new data
  saveNewData(cartItem);
};

const saveNewData = (item) => {
  // Converti in JSON
  const dataToSaveQuantity = item;
  // Create keyId
  const keyId = item.color + "_" + item.id;
  // Save in localStorage
  localStorage.setItem(
    JSON.stringify(keyId),
    JSON.stringify(dataToSaveQuantity)
  );
};

const makeCartItemContent = (item, product) => {
  const div = document.createElement("div");
  div.classList.add("cart__item__content");

  const divDescription = document.createElement("div");
  divDescription.classList.add("cart__item__content__description");

  const h2 = document.createElement("h2");
  h2.textContent = product.name;

  const color = document.createElement("p");
  color.textContent = item.color;

  const price = document.createElement("p");
  price.textContent = product.price + " €";

  div.appendChild(divDescription);
  divDescription.appendChild(h2);
  divDescription.appendChild(color);
  divDescription.appendChild(price);

  return div;
};

const displayArticle = (article) => {
  document.querySelector("#cart__items").appendChild(article);
};

const makeArticle = (item) => {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
};

const makeImage = (product) => {
  const div = document.createElement("div");
  div.classList.add("cart__item__img");

  const image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.altTxt;

  div.appendChild(image);
  return div;
};

const API_ORDER = "http://localhost:3000/api/products/order";

const cart = [];
recoversEachOrderOfCache();

cart.forEach((item) => displayItem(item));

const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => submitForm(e));

/**
 * Send data in Order eventListener
 * @param {*} e 
 */
const submitForm = (e) => {
  e.preventDefault();
  if (cart.length == 0) {
    alert("Please select a product");
  }
  const form = document.forms[0];
  var formData = new FormData(form);
  const content = makeRequestContent(formData);
  postFormData(content);
};

const postFormData = async (content) => {
  const response = await fetch(API_ORDER, {
    method: "POST",
    body: JSON.stringify(content),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const contact = await response.json();
  return contact;
};

function getIdProduct() {
    var numbersOfProducts = localStorage.length;
    console.log(numbersOfProducts);
    const productIds = [];

    for (let i = 0; i < numbersOfProducts.length; i++) {
    //   const productKey = localStorage.getItem(localStorage.key(i));
    //   console.log(productKey);
    //   const id = key.split("_")[1];
    //   productIds.push(id);
    }
    return productIds;
  }

const makeRequestContent = (form) => {
  // Expects request to contain:

  const content = {
    contact: {
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      address: form.get("address"),
      city: form.get("city"),
      email: form.get("email"),
    },
    products: getIdProduct(), // ["055743915a544fde83cfdfc904935ee7"]  <-- array of product _id
  };
  return content;
};

// module.exports = {getCartItem}
