let cart = [];
const BASE_URL = "https://66e0503b2fb67ac16f292cc4.mockapi.io/dataPhone";
// lấy danh sách sản phẩm từ server
let editedID = "";
function fetchProductList() {
	axios({
		url: `${BASE_URL}`,
		method: "GET",
	})
		.then(function (res) {
			console.log("🚀 ~ res:", res);
			renderProduct(res.data);
		})
		.catch(function (err) {
			console.log("🚀 ~ err:", err);
		});
}
fetchProductList();

function addToCart(productId) {
	axios({
		url: `${BASE_URL}/${productId}`,
		method: "GET",
	})
		.then(function (res) {
			let product = res.data;
			let existingItem = cart.find((item) => item.id === product.id);

			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				let cartItem = { ...product, quantity: 1 };
				cart.push(cartItem);
			}

			updateCartCount();
			renderCart();
			saveCart();
		})
		.catch(function (err) {
			console.log(err);
		});
}
function updateCartCount() {
	document.getElementById("cartCount").innerText = cart.reduce(
		(total, item) => total + item.quantity,
		0
	);
}

function updateQuantity(productId, change) {
	let cartItem = cart.find((item) => item.id === productId);
	if (cartItem) {
		cartItem.quantity += change;

		if (cartItem.quantity === 0) {
			removeFromCart(productId);
		} else {
			renderCart();
			saveCart();
		}
	}
}

function removeFromCart(productId) {
	cart = cart.filter((item) => item.id !== productId);
	updateCartCount();
	renderCart();
	saveCart();
}

function saveCart() {
	localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
	let savedCart = localStorage.getItem("cart");
	if (savedCart) {
		cart = JSON.parse(savedCart);
		updateCartCount();
		renderCart();
	}
}

function toggleCart() {
	let cartSection = document.getElementById("cartSection");
	let overlay = document.getElementById("overlay");

	if (cartSection.style.display === "none") {
		cartSection.style.display = "block";
		overlay.style.display = "block";
	} else {
		cartSection.style.display = "none";
		overlay.style.display = "none";
	}
}

function clearCart() {
	cart = [];
	saveCart();
	updateCartCount();
	renderCart();
	alert("Cảm ơn bạn đã thanh toán!");
}

window.onload = function () {
	loadCart();
};
