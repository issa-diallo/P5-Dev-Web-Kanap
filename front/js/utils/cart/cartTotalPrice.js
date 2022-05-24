const cartTotalPrice = () => {
    const cartItemArticle = document.getElementsByClassName('cart__item')[0]
    const cartRows = document.getElementsByClassName('cart__item__content')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i]
        const priceElement = cartRow.querySelectorAll('p')[1]
        const quantityElement = cartRow.querySelectorAll('.itemQuantity')[0]
        const price = priceElement.innerHTML.replace('€','')
        const quantity = quantityElement.value
        total += (price * quantity);
    }
    document.querySelector('#totalPrice').innerHTML = total
};


export { cartTotalPrice };
