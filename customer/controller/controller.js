function renderProduct(dataProduct) {
	let contentHTML = "";
	for (let i = 0; i < dataProduct.length; i++) {
		let product = dataProduct[i];
		let divString = `
		<div class="card p-2" style="width: 18rem">
		  <img src=${product.img} class="card-img-top" alt="..." />
		  <div class="card-body">
			<h5 class="card-title">${product.name}</h5>
			<p class="card-text">${product.desc}</p>
			<p class="card-text"><strong>Giá: ${product.price} VND</strong></p>
			<button onclick="addToCart('${product.id}')" class="btn btn-primary">Thêm vào giỏ</button>
		  </div>
		</div>`;
		contentHTML += divString;
	}
	document.getElementById("listItem").innerHTML = contentHTML;
}

function renderCart() {
	let contentHTML = "";
	let totalAmount = 0;

	for (let i = 0; i < cart.length; i++) {
		let item = cart[i];
		let total = item.price * item.quantity;
		totalAmount += total;

		let rowString = `
		<tr>
		  <td>${item.name}</td>
		  <td>
			<button onclick="updateQuantity('${item.id}', -1)" class="btn btn-secondary">-</button>
			${item.quantity}
			<button onclick="updateQuantity('${item.id}', 1)" class="btn btn-secondary">+</button>
		  </td>
		  <td>${item.price}</td>
		  <td>${total}</td>
		  <td><button onclick="removeFromCart('${item.id}')" class="btn btn-danger">Xóa</button></td>
		</tr>`;
		contentHTML += rowString;
	}

	document.getElementById("cartItems").innerHTML = contentHTML;
	document.getElementById("totalAmount").innerText = totalAmount + " VND";
}
