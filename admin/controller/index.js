// GET, PUT, DELETE, POST

/**
 * GET: lấy tất cả
 * GET/id : lấy 1
 * PUT: sửa
 * DELETE: xoá
 * POST: thêm
 */

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

function deleteProduct(id) {
	console.log("🚀 ~ delete ~ id:", id);
	axios({
		url: `${BASE_URL}/${id}`,
		method: "DELETE",
	})
		.then(function (res) {
			// gọi lại api danh sách sản phẩm mới nhất sau khi xoá
			fetchProductList();
			console.log("🚀 ~ xoá thành công ~ res:", res);
		})
		.catch(function (err) {
			console.log("🚀 ~ xoá thất bại ~ err:", err);
		});
}

function createProduct() {
	let product = layThongTinTuForm();
	axios({
		url: `${BASE_URL}`,
		method: "POST",
		data: product,
	})
		.then(function (res) {
			console.log("🚀 ~ res:", res);
			// Gọi lại api lấy danh sach sau khi thêm thành công
			fetchProductList();
			// ẩn modal sau khi gọi api thành công
			$("myModal").modal("hide");
			// clear data
			hienThiThongTin({
				name: "",
				price: "",
				screen: "",
				frontCamera: "",
				backCamera: "",
				img: "",
				desc: "",
			});
		})
		.catch(function (err) {
			console.log("🚀 ~ createProduct ~ err:", err);
		});
	// gọi api
}

// lấy chi tiết sản phẩm
function editProduct(id) {
	editedID = id;
	// cbi cho việc update sản phẩm
	console.log("id", id);
	// dựa vào id, gọi api lấy chi tiết sản phẩm theo id
	axios({
		url: `${BASE_URL}/${id}`,
		method: "GET",
	})
		.then(function (res) {
			console.log("🚀 ~ .then ~ res:", res);
			// hiện modal sau khi lấy dữ liệu thành công
			$("#myModal").modal("show");
			// gắn dữ liệu lấy được từ server vào form
			hienThiThongTin(res.data);
		})
		.catch(function (err) {
			console.log("🚀 ~ editProduct ~ err:", err);
		});
}

function updateProduct() {
	let product = layThongTinTuForm();
	//gọi api update sản phẩm theo id
	axios({
		url: `${BASE_URL}/${editProduct}`,
		method: "PUT",
		data: product,
	})
		.then(function (res) {
			console.log("🚀 ~ res:", res);
			// tắt modal
			$("#myModal").modal("hide");
			// gọi lại api lấy danh sách mới từ server sau khi update thành công
			fetchProductList();
			// clear data
			hienThiThongTin({
				name: "",
				price: "",
				screen: "",
				frontCamera: "",
				backCamera: "",
				img: "",
				desc: "",
			});
		})
		.catch(function (err) {
			console.log("🚀 ~ err:", err);
		});
}
