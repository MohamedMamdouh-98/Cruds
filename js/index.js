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
  // save the data in dataProduct[]
  dataProduct.push(newProduct);
  //save the data in localStorage
  localStorage.setItem("product", JSON.stringify(dataProduct));
  //clear data from inputs
  clearData();
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
