let cart = JSON.parse(localStorage.getItem("cart"));
const cartItems = document.getElementById("cart__items");
let totalQuantities = 0;
const totalQuantitiesELement = document.getElementById("totalQuantity");
let totalPrices = 0;
const totalPriceElement = document.getElementById("totalPrice");

if (cart !== null) {
  /**Recupération et création des donnée HTML du produit choisi + total des quantitées et total du prix*/
  function displayCart(cart) {
    for (const cartItem of cart) {
      fetch("http://localhost:3000/api/products/" + cartItem.id)
        .then(function (response) {
          response
            .json()
            .then(function (product) {
              cartItems.innerHTML += `<article class="cart__item" data-id="${product._id}" data-color="${cartItem.color}">
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${cartItem.color}</p>
                <p>${product.price}€</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>
            </article>`;

              deleteItemFromCart();
              modifyItemQuantityFromCart();

              totalQuantities += parseInt(cartItem.quantity);
              totalQuantitiesELement.innerHTML = totalQuantities;

              totalPrices +=
                parseInt(product.price) * parseInt(cartItem.quantity);
              totalPriceElement.innerHTML = totalPrices;
            })
            .catch(function (errorResponse) {
              console.log(errorResponse);
            });
        })
        .catch(function (errorApi) {
          console.log(errorApi);
        });
    }
  }

  /**Ajout d'un boutton supprimer avec message d'avertissement*/
  function deleteItemFromCart() {
    const deleteButtons = document.getElementsByClassName("deleteItem");
    Object.values(deleteButtons).forEach((deleteButton) => {
      let article = deleteButton.closest("article");
      const productId = article.getAttribute("data-id");
      const productColor = article.getAttribute("data-color");
      deleteButton.addEventListener("click", function () {
        let indexProductForRemove = cart.findIndex(
          (object) => object.id === productId && object.color === productColor
        );
        cart.splice(indexProductForRemove, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Le produit a bien été supprimer");
        location.reload();
      });
    });
  }

  /**Modification des quantitées des aticles avec message d'avertissement */
  function modifyItemQuantityFromCart() {
    const quantityImputs = document.getElementsByClassName("itemQuantity");
    Object.values(quantityImputs).forEach((quantityImput) => {
      let article = quantityImput.closest("article");
      const productId = article.getAttribute("data-id");
      const productColor = article.getAttribute("data-color");
      quantityImput.addEventListener("change", function () {
        let currentQuantity = quantityImput.value;
        let indexProductForChangeQuantity = cart.findIndex(
          (object) => object.id === productId && object.color === productColor
        );
        if (currentQuantity > 0 && currentQuantity <= 100) {
          cart[indexProductForChangeQuantity].quantity =
            parseInt(currentQuantity);
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("La quantité du produit a bien été modifier");
          location.reload();
        } else {
          alert("Vueillez mettre une quantiter comprise entre 1 et 100");
        }
      });
    });
  }

  displayCart(cart);
} else {
  cartItems.innerHTML = "<p>Votre panier est vide</p>";
}

const form = document.getElementsByClassName("cart__order__form")[0];

/**Gestion du formulaire de commande */
function confirmationOrder() {
  const contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  const products = [];
  for (let item of Object.entries(cart)) {
    products.push(item[1].id);
  }
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ contact, products }),
  })
    .then(function (response) {
      response
        .json()
        .then(function (order) {
          location.replace(`confirmation.html?id=${order.orderId}`);
        })
        .catch(function (errorResponse) {
          console.log(errorResponse);
        });
      // alert("")
    })
    .catch(function (errorApi) {
      console.log(errorApi);
    });
}

/**Validation du formulaire */
function formValidation() {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputs = form.elements;
    let validForm = 0;
    for (let input of inputs) {
      let regexForField;
      if (input.type === "submit") {
        break;
      }
      if (input.type === "text") {
        if (input.name === "address") {
          regexForField = /^[A-Z a-z 0-9 /s]+/g;
        } else {
          regexForField = /^([a-zA-Zéèà]+[,.]?[ ]?|[a-zA-Zéèà]+['-]?)+$/;
        }
      }
      if (input.type === "email") {
        regexForField = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
      }
      if (input.value === "") {
        input.style.border = "red 1px solid";
        input.nextElementSibling.innerHTML = "Ce champ ne doit pas etre vide";
      } else if (input.value.length < 3) {
        input.style.border = "red 1px solid";
        input.nextElementSibling.innerHTML =
          "Ce champ doit comporter plus de 3 caractere";
      } else if (input.value.match(regexForField) === null) {
        input.style.border = "red 1px solid";
        input.nextElementSibling.innerHTML = "Ce champ n'est pas valide";
      } else {
        input.style.border = "green 1px solid";
        input.nextElementSibling.innerHTML = "";
        validForm++;
      }
      if (validForm === 5 && cart !== null) {
        confirmationOrder();
      }
    }
  });
}

formValidation();
