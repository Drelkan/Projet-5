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
          </article>`

            // ajout des quantitées et boutton supprimer
            const deleteButtons = document.getElementsByClassName("deleteItem")
            for(var i = 0; i < deleteButtons.length; i++) {
              (function(index) {
                deleteButtons[index].addEventListener("click", function() {
                   cart.splice(index, 1)
                   localStorage.setItem("cart", JSON.stringify(cart))
                   const e = document.querySelector(`[data-id="${product._id}"]`)
                   e.remove();
                  })
              })(i);
            }


            // Object.values(deleteButtons).forEach( (deleteButton, index) => {
                // let article = deleteButton.closest("article")
                // console.log("deleteButtons", deleteButton)
                // const productId = article.getAttribute("data-id")
                // const productColor = article.getAttribute("data-color")
            //     deleteButton.addEventListener("clic", function(event){
            //       deleteButtons[index].onClick = function(){alert("Finaly!");};
            //         // splice
            //       console.log("deleteButtons", article)

            //       // const deleteButton = article.splice(quantity)


                    
            //     })


            




            // })

           

            // const totalPrice = async () => {
            //   let lastProductId
            //   let fetchProductJson
            //   let productPrice = 0
            //   for (let product of cart) {
            //     if (product.id !== lastProductId){
            //       productId = product.id
            //       fetchProductJson = await fetchProduct(product.id)
            //     }
            //     productPrice += product.quantity * fetchProductJson.price
            //   }
            //   document.getElementById('totalPrice').textContent = productPrice
            // }



            // function totalQuantity () {
            //   let number = 0;
            //   for(let total of kanap) {
            //     number += total.quantity;
            //   }
            //   return number
            // }




        })
        .catch(function(errorResponse){console.log(errorResponse)})
    })
    .catch(function(errorApi){console.log(errorApi)})
}

// gestion formulaire de commande




