let doc = document;
let cont = doc.querySelector(".container");
let h2 = doc.querySelector("h2");
let btnCount = doc.querySelector("[data-count]");
let btnAll = doc.querySelector("[data-all]");
let btnBusket = document.querySelector("[data-basket]");
let basket = document.querySelector(".basket");
let basketCOntent = document.querySelector(".basket-content");
let busketClose = document.querySelector("[data-busketClose]");
let scrollable = doc.querySelector(".scrollable");
let total_view = doc.querySelector('#total')
let busket = [2,3];

function calculateBusket() {
	h2.innerHTML = `You have <b>${busket.length}</b> elements in busket`;
}
calculateBusket()

reload(arr);

function reload(arr) {
	cont.innerHTML = ""

	for (let item of arr) {
		let mainDiv = doc.createElement("div");
		let mainImg = doc.createElement("img");
		let middleDiv = document.createElement("div");
		let h1 = doc.createElement("h1");
		let p = doc.createElement("p");
		let btn = doc.createElement("button");
		let bottomDiv = doc.createElement("div");
		let bottomDivBox1 = doc.createElement("div");
		let bottomDivBox2 = doc.createElement("div");
		let bottomDivBox3 = doc.createElement("div");
		let box1p = doc.createElement("p");
		let box2p = doc.createElement("p");
		let box3p = doc.createElement("p");
		let box1img = doc.createElement("img");
		let box2img = doc.createElement("img");
		let box3img = doc.createElement("img");

		mainDiv.classList.add("mainDiv");
		mainImg.classList.add("mainImg");
		middleDiv.classList.add("middleDiv");
		h1.classList.add("h1");
		p.classList.add("p");
		bottomDiv.classList.add("bottomDiv");
		bottomDivBox1.classList.add("bottomDivBox");
		bottomDivBox2.classList.add("bottomDivBox");
		bottomDivBox3.classList.add("bottomDivBox");
		box1p.classList.add("boxP");
		box2p.classList.add("boxP");
		box3p.classList.add("boxP");

		btn.innerHTML = "В избранное";

		if(busket.includes(item.id)) {
			btn.classList.add("btn_added");
			btn.innerHTML = "Added"
		}

		btn.classList.add("btn");
		box1img.classList.add("boxImg");
		box2img.classList.add("boxImg");
		box3img.classList.add("boxImg");

		mainImg.setAttribute("src", item.image);
		box1img.setAttribute("src", "./icons/price.svg");
		box2img.setAttribute("src", "./icons/star.svg");
		box3img.setAttribute("src", "./icons/box.svg");

		h1.innerHTML = `${item.category} (${item.rating.count})`;
		p.innerHTML =
			item.description.length > 100 ?
			item.description.slice(0, 90) + " <b>...read</b>" :
			item.description;
		box1p.innerHTML = item.price;
		box2p.innerHTML = item.rating.rate;
		box3p.innerHTML = item.rating.count;
		

		cont.append(mainDiv);
		mainDiv.append(mainImg, middleDiv);
		middleDiv.append(h1, p, bottomDiv, btn);
		bottomDiv.append(bottomDivBox1, bottomDivBox2, bottomDivBox3);
		bottomDivBox1.append(box1img, box1p);
		bottomDivBox2.append(box2img, box2p);
		bottomDivBox3.append(box3img, box3p);

		btn.onclick = () => {

			if (busket.includes(item.id)) {
				// delete
				// let idx = busket.indexOf(item.id)
				// busket.splice(idx, 1)

				busket = busket.filter(id => id !== item.id)

				btn.classList.remove('btn_added')
				btn.innerHTML = "В избранное"
			} else {
				busket.push(item.id)
				btn.classList.add('btn_added')
				btn.innerHTML = "Added"
			}
			calculateBusket()
			busket_reload(busket)
		}

	}
}

busket_reload(busket)

function busket_reload(ids_arr) {
	scrollable.innerHTML = ""
	let temp = []
	let allProducts = 0

	for(let item of arr) {
		for(let id of ids_arr) {
			if(id === item.id) {
				temp.push(item)
			}
		}
	}


	for (let item of temp) {
		allProducts += item.price
		total_view.innerHTML = allProducts
		let total = item.price
		let qt = 1
		let mainItemCard = doc.createElement("div");
		let ItemLeft = doc.createElement("div");
		let mainImgCard = doc.createElement("img");
		let ItemProductInf = doc.createElement("div");
		let ItemText = doc.createElement("h4");
		let ItemDaughSize = doc.createElement("p");
		let ItemRight = doc.createElement("div");
		let ItemCount = doc.createElement("div");
		let counter = doc.createElement("div");
		let btnPlus = doc.createElement('button')
		let btnMinus = doc.createElement('button')
		let span_count = doc.createElement('span')
		let ItemPrice = document.createElement("p");

		mainItemCard.classList.add("item");
		ItemLeft.classList.add("itemLeft");
		mainImgCard.classList.add("itemImg");
		ItemProductInf.classList.add("itemInf");
		ItemText.classList.add("itemH4");
		ItemDaughSize.classList.add("discription");
		ItemRight.classList.add("itemRight");
		ItemCount.classList.add("itemCount");
		ItemPrice.classList.add("ItemPrice");
		counter.classList.add("counter");
		

		mainImgCard.setAttribute("src", item.image);
		ItemText.innerHTML = item.category;
		ItemDaughSize.innerHTML = "small"
		ItemPrice.innerHTML = item.price;
		btnPlus.innerHTML = "+"
		btnMinus.innerHTML = "-"
		span_count.innerHTML = 1

		scrollable.append(mainItemCard);
		mainItemCard.append(ItemLeft, ItemRight);
		ItemLeft.append(mainImgCard, ItemProductInf);
		ItemProductInf.append(ItemText, ItemDaughSize);
		counter.append(btnPlus, span_count, btnMinus)
		ItemCount.append(counter)
		ItemRight.append(ItemCount, ItemPrice);

		btnPlus.onclick = () => {
			if(qt < item.rating.count) {
				span_count.innerHTML = ++qt

				allProducts += item.price
				allProducts = +allProducts.toFixed(2)
				total_view.innerHTML = allProducts

				total = item.price * qt
				total = +total.toFixed(2)

				ItemPrice.innerHTML = total
			}
		}
		btnMinus.onclick = () => {
			if(qt > 0) {
				span_count.innerHTML = --qt

				allProducts -= item.price
				allProducts = +allProducts.toFixed(2)
				total_view.innerHTML = allProducts
				total = item.price * qt
				total = +total.toFixed(2)

				ItemPrice.innerHTML = total
			}
		}

		mainImgCard.ondblclick = () => {
			let proveIt = confirm('Are you sure to remove this Item from the busket?')

			if(proveIt) {
				busket = busket.filter(id => id !== item.id)
				
				mainItemCard.classList.add('animated_remove')
				setTimeout(() => {
					mainItemCard.remove()
					reload(arr)
					calculateBusket()
				}, 500);
			}
		}

	}
}


btnCount.onclick = () => {
	reload(
		arr.slice(0, 5)
	)
}

btnAll.onclick = () => {
	reload(
		arr
	)
}


btnBusket.onclick = () => {
	basket.classList.add("backet_active");
	basket.classList.remove("backet_hide");
	document.body.style.overflowY = "hidden";
};
busketClose.onclick = () => {
	basket.classList.remove("backet_active");
	basket.classList.add("backet_hide");
	document.body.style.overflowY = "auto";
};