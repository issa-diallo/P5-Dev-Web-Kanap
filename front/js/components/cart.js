const cartItemElement = (productData,productLocalStorage,id) => `
  <article class="cart__item" data-id="${id}" data-color="${productLocalStorage.color}">
  <div class="cart__item__img">
    <img src="${productData.imageUrl}" alt="${productData.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${productData.name}</h2>
      <p>${productLocalStorage.color}</p>
      <p>${productData.price} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productLocalStorage.quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>
`;

export {cartItemElement}