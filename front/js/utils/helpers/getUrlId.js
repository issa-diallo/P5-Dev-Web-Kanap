 const getUrlId = (parameter) => {
    const requestQueryString = window.location.search;
    const searchParams = new URLSearchParams(requestQueryString);
    const urlId = searchParams.get(parameter);
    return urlId;
  };
  export { getUrlId };
  