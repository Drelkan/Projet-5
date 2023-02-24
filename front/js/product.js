let urlParameters = (new URL(location)).searchParams
const productId = urlParameters.get("id")
const itemImg = document.getElementsByClassName("item__img")[0]
const title = document.getElementById("title")
const price = document.getElementById("price")
const description = document.getElementById("description")
// const colors = document.getElementById("colors")[0]
// const colors = document.querySelector('colors')

// const colorsElement = document.createElement("option value")

// const selectColorSelect = document.querySelector(".color-select")
// sectionColorSelect.appendChild(colorsElement)
// console.log("test",document.querySelector('#colors').value)

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
        // colors.innerHTML = product.colors

        // Récupérer le select grâce à l'id qui colors
        const select = document.getElementById('colors')

        // Pour chaque élément du tableau colors issu de product
        product.colors.forEach(color => {

            // Créer une option dans le DOM qui va pouvoir être ajouter dans le select
            const opt = document.createElement("option");

            // Assigner le nom de la color à la value
            opt.value = color;

            // Assigner le nom de la color au text
            opt.text = color;

            // Ajouter l'option dans le select
            select.add(opt)
        })
    })
    .catch(function(errorResponse){console.log(errorResponse)})
})
.catch(function(errorApi){console.log(errorApi)})