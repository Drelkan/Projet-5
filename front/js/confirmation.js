// let urlParameters = (new URL(location)).searchParams
// const productId = urlParameters.get("id")

// fetch("http://localhost:3000/api/products/order")


let url = new URL(window.location);
let id = url.searchParams.get("id");

document.getElementById("orderId").innerHTML = `${id}`;

// localStorage.clear();


