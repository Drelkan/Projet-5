const items = document.getElementById("items");
console.log(items);
fetch("http://localhost:3000/api/products")
    .then(function(response){
      response.json()
      .then(function(products){
        console.log(products);
        for(let product of products){
            console.log(product);
            items.innerHTML += `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`
        }
    })
    .catch(function(errorResponse){console.log(errorResponse)})
})
.catch(function(errorApi){console.log(errorApi)})
