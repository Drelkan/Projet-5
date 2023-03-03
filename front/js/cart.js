let cart = JSON.parse(localStorage.getItem("cart"))

const cartItems = document.getElementById("cart__items")
let totalQuantities = 0
let totalPrices = 0


for (const cartItem of cart) {
    console.log(cartItem)
    fetch("http://localhost:3000/api/products/" + cartItem.id)
    .then(function(response){
        response.json()
        .then(function(product){
            cartItems.innerHTML += `<article class="cart__item" data-id="${product._id}" data-color="${cartItem.color}">
            <div class="cart__item__img">
              <img src="${product.imageUrl}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>Nom du produit</h2>
                <p>Vert</p>
                <p>42,00 €</p>
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
          </article>`

            // ajout des quantitées et boutton supprimer
            const deleteButtons = document.getElementsByClassName("deleteItem")
            Object.values(deleteButtons).forEach(deleteButton => {
                let article = deleteButton.closest("article")
                const productId = article.getAttribute("data-id")
                const productColor = article.getAttribute("data-color")
                deleteButton.addEventListener("clic", function(event){
                    // splice



                    
                })
            })

        })
        .catch(function(errorResponse){console.log(errorResponse)})
    })
    .catch(function(errorApi){console.log(errorApi)})
}

// gestion formulaire de commande




