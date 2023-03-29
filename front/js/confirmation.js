let url = (new URL(location)).searchParams
let id = url.get("id")

document.getElementById("orderId").innerHTML = `${id}`

localStorage.clear();