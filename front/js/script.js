//** Récuprération des produits à partir de l'API*/
function getProducts() {
  return fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .catch((error) => {
      console.log(`Error fetching products: ${error}`);
      return [];
    });
}

//**Création de l'HTML des produits */
function createProductHTML(product) {
  return `
		<a href="./product.html?id=${product._id}">
		<article>
			<img src="${product.imageUrl}" alt="${product.altTxt}">
			<h3 class="productName">${product.name}</h3>
			<p class="productDescription">${product.description}</p>
		</article>
		</a>
	`;
}

//**Element DOM avec les produits */
function renderProducts(products) {
  const items = document.getElementById("items");
  items.innerHTML = products.map(createProductHTML).join("");
}

getProducts()
  .then((products) => renderProducts(products))
  .catch((error) => console.log(`Error rendering products: ${error}`));
