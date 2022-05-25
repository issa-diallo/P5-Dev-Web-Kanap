const productItemElement = (product) => `
 <a href="./product.html?id=${product._id}">
 <article>
 <img src="${product.imageUrl}" alt="${product.altTxt}">
 <h3 class="productName">${product.name}</h3>
 <p class="productDescription">${product.description}</p>
 </article>
 </a>
 `;
export { productItemElement };
