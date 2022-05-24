/**
 * Get of the id in the url
 */
const getProductId = () => {
    const requestQueryString = window.location.search;
    const searchParams = new URLSearchParams(requestQueryString);
    const productId = searchParams.get("id");
    return productId
}

export {getProductId}