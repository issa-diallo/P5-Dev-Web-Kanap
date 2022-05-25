let check = {};

let listenerFunction = {
  checkFirsName: (e) => {
    const input = e.target;
    let content = input.value.trim();
    let error = "";
    document.getElementById("firstNameErrorMsg").innerHTML = "";

    if (!content) {
      error = "Le champs ne doit pas être vide !";
    } else if (!/^^[a-zA-Z]{3,15}$/.test(content)) {
      error = "Le champs n'est pas valide !";
    }
    if (error) {
      check = { ...check, firstName: false };
      document.getElementById("firstNameErrorMsg").innerHTML = error;
    } else {
      check = { ...check, firstName: true };
    }
    setSubmitButton();
  },
  checkLastName: (e) => {
    const input = e.target;
    let content = input.value.trim();
    let error = "";
    document.getElementById("lastNameErrorMsg").innerHTML = "";

    if (!content) {
      error = "Le champs ne doit pas être vide !";
    } else if (!/^^[a-zA-Z]{3,15}$/.test(content)) {
      error = "Le champs n'est pas valide !";
    }
    if (error) {
      check = { ...check, lastName: false };
      document.getElementById("lastNameErrorMsg").innerHTML = error;
    } else {
      check = { ...check, lastName: true };
    }
    setSubmitButton();
  },
  checkAddress: (e) => {
    const input = e.target;
    let content = input.value.trim();
    let error = "";
    document.getElementById("addressErrorMsg").innerHTML = "";

    if (!content) {
      error = "Le champs ne doit pas être vide !";
    } else if (!/^[a-zA-Z0-9\s,.'-]{3,}$/.test(content)) {
      error = "Le champs n'est pas valide !";
    }
    if (error) {
      check = { ...check, address: false };
      document.getElementById("addressErrorMsg").innerHTML = error;
    } else {
      check = { ...check, address: true };
    }
    setSubmitButton();
  },
  checkCity: (e) => {
    const input = e.target;
    let content = input.value.trim();
    let error = "";
    document.getElementById("cityErrorMsg").innerHTML = "";

    if (!content) {
      error = "Le champs ne doit pas être vide !";
    } else if (!/^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/.test(content)) {
      error = "Le champs n'est pas valide !";
    }
    if (error) {
      check = { ...check, city: false };
      document.getElementById("cityErrorMsg").innerHTML = error;
    } else {
      check = { ...check, city: true };
    }
    setSubmitButton();
  },
  checkEmail: (e) => {
    const input = e.target;
    let content = input.value.trim();
    let error = "";
    document.getElementById("emailErrorMsg").innerHTML = "";

    if (!content) {
      error = "Le champs ne doit pas être vide !";
    } else if (!/^^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(content)) {
      error = "Le champs n'est pas valide !";
    }
    if (error) {
      check = { ...check, email: false };
      document.getElementById("emailErrorMsg").innerHTML = error;
    } else {
      check = { ...check, email: true };
    }
    setSubmitButton();
  },
};

const checkFormValidity = () => {
  let result = true;
  const form = document.forms[0];
  if (form) {
    if (Object.keys(check).length === 5) {
      for (const key in check) {
        const value = check[key];
        result = result && value;
        if (!result) return result;
      }
      return result;
    }
  }
  return false;
};

const setSubmitButton = () => {
  const form = document.forms[0];
  if (form) {
    if (checkFormValidity()) {
      if (form.elements[5]) {
        form.elements[5].disabled = false;
        return;
      }
    }
    form.elements[5].disabled = true;
  }
};

const setupForms = () => {
  const firstname = document.forms[0]["firstName"];
  firstname
    ? firstname.addEventListener("keyup", listenerFunction.checkFirsName)
    : null;

  const lastname = document.forms[0]["lastName"];
  lastname
    ? lastname.addEventListener("keyup", listenerFunction.checkLastName)
    : null;

  const address = document.forms[0]["address"];
  address
    ? address.addEventListener("keyup", listenerFunction.checkAddress)
    : null;

  const city = document.forms[0]["city"];
  city ? city.addEventListener("keyup", listenerFunction.checkCity) : null;

  const email = document.forms[0]["email"];
  email ? email.addEventListener("keyup", listenerFunction.checkEmail) : null;
};
export { setupForms };
