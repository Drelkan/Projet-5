let cart = JSON.parse(localStorage.getItem("cart"))

const cartItems = document.getElementById("cart__items")
let totalQuantities = 0
const totalQuantitiesELement = document.getElementById("totalQuantity")
let totalPrices = 0
const totalPriceElement = document.getElementById("totalPrice")





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
            Object.values(deleteButtons).forEach( (deleteButton, index) => {
                let article = deleteButton.closest("article")
                console.log("deleteButtons", deleteButton)
                const productId = article.getAttribute("data-id")
                const productColor = article.getAttribute("data-color")
                deleteButton.addEventListener("click", function(event){
                  // deleteButtons[index].onClick = function(){alert("Finaly!");};
                    // splice
                  console.log("deleteButtons", article)
                  let indexProductForRemove = cart.findIndex((object => object.id === productId && object.color === productColor))
                  cart.splice(indexProductForRemove, 1)
                  localStorage.setItem("cart", JSON.stringify(cart))
                  alert("Le produit a bien été supprimer")
                  location.reload()                    
                })
            })

            const quantityImputs = document.getElementsByClassName("itemQuantity")
            Object.values(quantityImputs).forEach( (quantityImput, index) => {
              let article = quantityImput.closest("article")
              const productId = article.getAttribute("data-id")
              const productColor = article.getAttribute("data-color")
              quantityImput.addEventListener("change", function(event){
                let currentQuantity = quantityImput.value
                let indexProductForChangeQuantity = cart.findIndex((object => object.id === productId && object.color === productColor))
                if(currentQuantity > 0 && currentQuantity <= 100){
                  cart[indexProductForChangeQuantity].quantity = parseInt(currentQuantity)
                  localStorage.setItem("cart", JSON.stringify(cart))
                  alert("La quantité du produit a bien été modifier")
                  location.reload()
                }else{
                  alert("Vueillez mettre une quantiter comprise entre 1 et 100")
                }

                
              })

          })

          totalQuantities += parseInt(cartItem.quantity)
          totalQuantitiesELement.innerHTML = totalQuantities

          totalPrices += parseInt(product.price)*parseInt(cartItem.quantity)
          totalPriceElement.innerHTML = totalPrices



        })
        .catch(function(errorResponse){console.log(errorResponse)})
    })
    .catch(function(errorApi){console.log(errorApi)})
}

// gestion formulaire de commande
const form = document.getElementsByClassName("cart__order__form")[0]
form.addEventListener("submit", function(event){
  // console.log(form.elements)
  event.preventDefault()
  const inputs = form.elements
  let validForm = 0
  for(let input of inputs){
    console.log(input)
    let regexForField 
    if(input.type === "submit"){
      break
    }
    if(input.type === "text"){
      regexForField = ""
    }
    if(input.type === "email"){
      regexForField = ((/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/).test(email.value) === false || email.value === "")
      click.preventDefault()
        msgError('emailErrorMsg');
        return
    }

    if(input.value === ""){
      input.style.border = "red 1px solid"
      input.nextElementSibling.innerHTML = "Ce champ ne doit pas etre vide"
    }


  }


})




