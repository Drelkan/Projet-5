let urlParameters = new URL(location).searchParams;
const productId = urlParameters.get("id");
const itemImg = document.getElementsByClassName("item__img")[0];
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");

//**Récupération des donnée produit et creation de leur HTML ainsi que le choix des couleurs */
function productDetails() {
  fetch("http://localhost:3000/api/products/" + productId)
    .then(function (response) {
      response
        .json()
        .then(function (product) {
          let productImg = document.createElement("img");
          productImg.src = product.imageUrl;
          productImg.alt = product.altTxt;
          itemImg.appendChild(productImg);
          title.innerHTML = product.name;
          price.innerHTML = product.price;
          description.innerHTML = product.description;

          const select = document.getElementById("colors");
          product.colors.forEach((color) => {
            const opt = document.createElement("option");
            opt.value = color;
            opt.text = color;
            select.appendChild(opt);
          });
        })
        .catch(function (errorResponse) {
          console.log(errorResponse);
        });
    })
    .catch(function (errorApi) {
      console.log(errorApi);
    });
}

/**Création du panier */
function createCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

//**Permet l'envoie au panier si les couleurs ou quantité ont été selectionner */
function addToCart() {
  const btnAddToCart = document.getElementById("addToCart");
  btnAddToCart.addEventListener("click", function () {
    const color = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;
    if (color === null || color === "" || quantity === null || quantity === 0) {
      alert("Veuillez sélectionner une couleur et une quantité.");
    } else {
      const data = {
        id: productId,
        color: color,
        quantity: parseInt(quantity),
      };
      let cart = JSON.parse(localStorage.getItem("cart"));
      const itemFoundFromCart = cart.find(
        (element) => element.id === productId && element.color === color
      );
      if (itemFoundFromCart !== undefined) {
        const productIndex = cart.findIndex(
          (object) => object.id === productId && object.color === color
        );
        if (
          parseInt(quantity) > 0 &&
          parseInt(cart[productIndex].quantity) + parseInt(quantity) <= 100
        ) {
          cart[productIndex].quantity =
            parseInt(cart[productIndex].quantity) + parseInt(quantity);
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Le produit a été ajouté au panier.");
        } else {
          alert("Vous ne pouvez pas sélectionner plus de 100 produits.");
        }
      } else {
        if (parseInt(quantity) > 0 && parseInt(quantity) <= 100) {
          cart.push(data);
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Le produit a été ajouté au panier.");
        } else {
          alert("Veuillez choisir une quantité entre 0 et 100.");
        }
      }
    }
  });
}

productDetails();
createCart();
addToCart();
