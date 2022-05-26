import { postOrder } from "../services/api.js";
import { basketLocalStorage } from "../utils/cart/basketLocalStorage.js";

const submitForm = async (e) => {
  e.preventDefault();
  const cart = basketLocalStorage();
  if (cart.length === 0) {
    return alert("Please select product to buy");
  }

  let form = document.forms[0];
  let formData = new FormData(form);

  let ids = [];
  cart.map((item) => {
    ids.push(item.id);
  });

  const body = {
    contact: {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      address: formData.get("address"),
      city: formData.get("city"),
      email: formData.get("email"),
    },
    products: ids,
  };
  // Requete vers le serveur
  const dataOrder = await postOrder(body);
  // redirection to the shopping cart page
  window.location.href = "confirmation.html" + `?order=${dataOrder.orderId}`;
};

export { submitForm };

