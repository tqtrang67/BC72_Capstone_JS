function renderProduct(dataProduct) {
	let contentHTML = "";
	// tạo ds chuỗi tr chứa thông tin object sv

	for (let i = 0; i < dataProduct.length; i++) {
		let product = dataProduct[i];
		let trString = `<tr>
							<td>${product.id}</td>
							<td>${product.name}</td>
							<td>${product.price}</td>
							<td>${product.screen}</td>
							<td>${product.frontCamera}</td>
							<td>${product.backCamera}</td>
							<td><img src="${product.img}" alt="" width="300" height="300" /></td>
							<td>${product.desc}</td>
							<td>${product.type}</td>
							<td>
								<button onclick="deleteProduct(${product.id})" class="btn btn-danger">Xoá</button>
								<button
								onclick="editProduct(${product.id})" class="btn btn-primary">Sửa</button>
							</td>					
						</tr>`;
		contentHTML += trString;
	}
	document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}

function layThongTinTuForm() {
	let name = document.getElementById("TenSP").value;
	let price = document.getElementById("GiaSP").value;
	let screen = document.getElementById("ManSP").value;
	let frontCamera = document.getElementById("CameraTSP").value;
	let backCamera = document.getElementById("CameraSSP").value;
	let img = document.getElementById("HinhSP").value;
	let desc = document.getElementById("MotaSP").value;
	return {
		name: name,
		price: price,
		screen: screen,
		frontCamera: frontCamera,
		backCamera: backCamera,
		img: img,
		desc: desc,
	};
}

function hienThiThongTin(product) {
	document.getElementById("TenSP").value = product.name;
	document.getElementById("GiaSP").value = product.price;
	document.getElementById("ManSP").value = product.screen;
	document.getElementById("CameraTSP").value = product.frontCamera;
	document.getElementById("CameraSSP").value = product.backCamera;
	document.getElementById("HinhSP").value = product.img;
	document.getElementById("MotaSP").value = product.desc;
}
