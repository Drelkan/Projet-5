let urlParameters = (new URL(location)).searchParams;
const productId = urlParameters.get("id");
const itemImg = document.getElementsByClassName("item__img")[0];
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");


let cart = localStorage.getItem("cart");
if(cart == null){
	cart = [];
	localStorage.setItem("cart", JSON.stringify(cart));
}


fetch("http://localhost:3000/api/products/" + productId)
	.then(function(response){
		response.json()
			.then(function(product){
				let productImg = document.createElement("img");
				productImg.src = product.imageUrl;
				productImg.alt = product.altTxt;
				itemImg.appendChild(productImg);
				title.innerHTML = product.name;
				price.innerHTML = product.price;
				description.innerHTML = product.description;

				const select = document.getElementById("colors");
				product.colors.forEach(color => {
					const opt = document.createElement("option");
					opt.value = color;
					opt.text = color;
					select.appendChild(opt);
				});
			})
			.catch(function(errorResponse){console.log(errorResponse);});
	})
	.catch(function(errorApi){console.log(errorApi);});


const btnAddToCart = document.getElementById("addToCart");
btnAddToCart.addEventListener("click", function(){
	const color = document.getElementById("colors").value;
	const quantity = document.getElementById("quantity").value;
	if(color === null || color ==="" || quantity === null || quantity === 0){
		alert("Veuillez selectionner une valeur ou une quantitée");
	}else{
		const data = {
			id : productId,
			color : color,
			quantity : parseInt(quantity)
		};
		let cart = JSON.parse(localStorage.getItem("cart"));
		const itemFoundFromCart = cart.find(element => element.id === productId && element.color === color);
		if(itemFoundFromCart !== undefined){
			const productIndex = cart.findIndex((object) => object.id === productId && object.color === color);
			if(parseInt(quantity) > 0 && parseInt(cart[productIndex].quantity) + parseInt(quantity) <= 100){
				cart[productIndex].quantity = parseInt(cart[productIndex].quantity) + parseInt(quantity);
				localStorage.setItem("cart", JSON.stringify(cart));
				alert("Le produit à bien été ajouter au panier");
			}else{
				alert("Vous je pouvez pas selectionner pour un produit une quantité supérieur a 100");
			}
		}else{
			if(parseInt(quantity) > 0 && parseInt(quantity) <= 100){
				cart.push(data);
				localStorage.setItem("cart", JSON.stringify(cart));
				alert("Le produit à bien été ajouter au panier");
			}else{
				alert("veuillez choisir une quantitée comprise entre 0 et 100");
			}
		}
	}
});