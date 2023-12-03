// get inputs
let title = document.getElementById("title");
price = document.getElementById("price");
ads = document.getElementById("ads");
discount = document.getElementById("discount");
taxes = document.getElementById("taxes");
total = document.getElementById("total");
count = document.getElementById("count");
category = document.getElementById("category");
submit = document.getElementById("submit");
delete_all = document.getElementById("delete_all");
 let mood = "create";
 let item;
// get total
getTotal = () => {
  if (price.value != "") {
    let result = +price.value + +ads.value + +taxes.value - +discount.value;
    total.innerHTML = result;
    total.classList.remove("bg-danger");
    total.classList.add("bg-success");
  } else {
    total.innerHTML = "";
    total.classList.remove("bg-success");
    total.classList.add("bg-danger");
  }
};

//create product
let dataProduct;
localStorage.product != null
  ? (dataProduct = JSON.parse(localStorage.product))
  : (dataProduct = []);

submit.addEventListener("click", () => {
  //create object to store data product
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.textContent,
    count: count.value,
    category: category.value,
  };

  if(mood === "create"){
    if (newProduct.count > 1) {
      for (i = 0; i < newProduct.count; i++) {
        // save the data in dataProduct count
        dataProduct.push(newProduct);
      }
    } else {
      // save the data in dataProduct
      dataProduct.push(newProduct);
    }
  }else{
    dataProduct[item] = newProduct
    mood = "create"
    submit.innerHTML = "create"
    count.style = "block"
  }

  //save the data in localStorage
  localStorage.setItem("product", JSON.stringify(dataProduct));
  //clear data from inputs
  clearData();
  //show data in table
  showData();
});

//clear data
clearData = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
};

//read data and show in table
showData = () => {
  getTotal();
  let table = "";
  for (i = 0; i < dataProduct.length; i++) {
    table += `
    <tr>
    <th scope="row">${i + 1}</th>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].total}</td>
    <td>${dataProduct[i].category}</td>
    <td><button class="btn btn-primary" onClick = "updateProduct(${i})">update</button></td>
    <td><button class="btn btn-danger" onClick = "deleteProduct(${i})">delete</button></td>
    </tr>
  `;
  }

  document.getElementById("tbody").innerHTML = table;
  dataProduct.length > 1
    ? (delete_all.innerHTML = `<button class="btn btn-danger my-3" onClick = "deleteAll()">delete all</button>`)
    : (delete_all.innerHTML = "");
};
//show data in table
showData();

//delete product
deleteProduct = (i) => {
  console.log(i);
  // get dataProduct subtract 1
  dataProduct.splice(i, 1);
  // update data in localStorage
  localStorage.product = JSON.stringify(dataProduct);
  //update and showData
  showData();
};

//delete all
deleteAll = () => {
  // clear data from localStorage
  localStorage.clear();
  // clear data from dataProduct
  dataProduct.splice(0);
  //update and showData
  showData();
};

//update
updateProduct = (i) => {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  ads.value = dataProduct[i].ads;
  taxes.value = dataProduct[i].taxes;
  discount.value = dataProduct[i].discount;
  category.value = dataProduct[i].category;
  submit.innerHTML = 'update'
  getTotal()
  count.style.display = "none"
  mood = "update"
  item = i
  scroll({
    top: 0,
    behavior: "smooth"
  })
};
