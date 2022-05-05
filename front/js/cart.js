/**
 * Get data of localstorage
 */
const recoversEachOrderOfCache = () => {
    const storageLength = localStorage.length
    for (let i = 0; i < storageLength; i++) {
        const item = localStorage.getItem(localStorage.key(i));
        const objItem = JSON.parse(item)
        cart.push(objItem)
    }
}



const displayItem = async (item) => {
    // Get of the id in localStorage
    const productId = item.id
    // Init API
    const API_PRODUCT = `http://localhost:3000/api/products/${productId}`;
    // Get product in json
    const response = await fetch(API_PRODUCT);
    const product = await response.json();

    // Create a article then show inside section
    const article = makeArticle(item)
    displayArticle(article)
    // Create a image with div then show inside article
    const divImage = makeImage(product)
    article.appendChild(divImage)
    // Create a makeCartItemContent
    const cartItemContent = makeCartItemContent(item,product)
    article.appendChild(cartItemContent)
    // Create a makeCartItemCsettings
    const cartItemsettings = makeCartItemsettings(item,product)
    cartItemContent.appendChild(cartItemsettings)

    // Show quantity and total price
    displayTotalQuantity()
    displayTotalPrice(product)
}

const displayTotalQuantity = () => {
    const totalQuatity = document.querySelector('#totalQuantity')
    let total = cart.reduce((total,element) => total + element.quantity,0);
    
    totalQuatity.textContent = total
}

const displayTotalPrice = (product) => {
    const totalPrice = document.querySelector('#totalPrice')
    let total = cart.reduce((total,element) => total + element.quantity * product.price,0);
    
    // cart.forEach((element)=>{
    //     const totalElementPrice = element.quantity * product.price;
    //     total += totalElementPrice
    // })

    // console.log(total);
    totalPrice.textContent = total
}

const makeCartItemsettings = (item,product) => {
    const div = document.createElement('div')
    div.classList.add("cart__item__content__settings")

    const divSettingsQuantity = document.createElement('div')
    divSettingsQuantity.classList.add("cart__item__content__settings__quantity")

    const quantity = document.createElement('p')
    quantity.textContent = "Qté :"

    const input = document.createElement('input')
    input.type = "number"
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.classList.add("itemQuantity")
    /**
     * Create a Event then a pass id for get the value in cart
     */
    input.addEventListener('input',() => updateTotalQuantityPrice(item.id, input.value,product))


    const deleteDiv = document.createElement('div')
    deleteDiv.classList.add("cart__item__content__settings__delete")
    
    const p = document.createElement('p')
    p.classList.add("deleteItem")
    p.textContent = "Supprimer"
    
    div.appendChild(divSettingsQuantity)
    divSettingsQuantity.appendChild(quantity)
    divSettingsQuantity.appendChild(input)

    div.appendChild(deleteDiv)
    deleteDiv.appendChild(p)

    return div
}

const updateTotalQuantityPrice = (id, inputNewValue, product) => {
    // Get the current element
    const getItem = cart.find((element) => element.id === id )
    // get new value quantity
    getItem.quantity = Number(inputNewValue)
    // update total price and quantity
    displayTotalQuantity()
    displayTotalPrice(product)

}

const makeCartItemContent = (item,product) => {
    const div = document.createElement('div')
    div.classList.add("cart__item__content")

    const divDescription = document.createElement('div')
    divDescription.classList.add("cart__item__content__description")

    const h2 = document.createElement('h2')
    h2.textContent = product.name

    const color = document.createElement('p')
    color.textContent = item.color

    const price = document.createElement('p')
    price.textContent = product.price + " €"

    div.appendChild(divDescription)
    divDescription.appendChild(h2)
    divDescription.appendChild(color)
    divDescription.appendChild(price)

    return div
}

const displayArticle = (article) => {
    document.querySelector('#cart__items').appendChild(article)
}

const makeArticle = (item) => {
    const article = document.createElement('article')
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

const makeImage = (product) => {
    const div = document.createElement('div')
    div.classList.add('cart__item__img')

    const image = document.createElement('img')
    image.src = product.imageUrl
    image.alt = product.altTxt

    div.appendChild(image)
    return div
}


const cart = []
recoversEachOrderOfCache()

cart.forEach(item=>displayItem(item))

// console.log(localStorage.getItem("orderId"))
//     localStorage.clear();