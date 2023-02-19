let urlParameters = (new URL(location)).searchParams
const productId = urlParameters.get("id")
const itemImg = document.getElementsByClassName("item__img")[0]
const title = document.getElementById("title")
const price = document.getElementById("price")
const description = document.getElementById("description")


fetch("http://localhost:3000/api/products/" + productId)
.then(function(response){
    response.json()
    .then(function(product){
        console.log(product)
        let productImg = document.createElement("img")
        productImg.src = product.imageUrl
        productImg.alt = product.altTxt
        itemImg.appendChild(productImg)
        title.innerHTML = product.name
        price.innerHTML = product.price
        description.innerHTML = product.description


    })
    .catch(function(errorResponse){console.log(errorResponse)})
})
.catch(function(errorApi){console.log(errorApi)})