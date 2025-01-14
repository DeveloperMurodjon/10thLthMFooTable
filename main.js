import { getData, createRow, validate } from "./functions.js";
const form = document.querySelector("#form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const count = document.querySelector("#count");
const btn = document.querySelector("#btn");
const tbody = document.querySelector("#tbody");
const overalPrice = document.querySelector("#overalPrice");
const overalCount = document.querySelector("#overalCount");

btn &&
  btn.addEventListener("click", function (event) {
    event.preventDefault();
    const isValid = validate(name.value, price.value, count.value);
    if (!isValid) {
      return;
    }
    const product = {
      id: Date.now(),
      name: name.value,
      price: price.value,
      count: count.value,
    };

    let products = getData();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    form.reset();

    let index = tbody.children.length + 1;
    let row = createRow(product, index);
    tbody.innerHTML += row;

    let oldSumPrice = +overalPrice.innerHTML;
    let oldSumCount = +overalCount.innerHTML;

    overalCount.innerHTML = oldSumCount + Number(product.count);
    overalPrice.innerHTML = oldSumPrice + Number(product.price);
    window.location.reload();
  });

document.addEventListener("DOMContentLoaded", function () {
  let products = getData();
  let sum = 0;
  let counter = 0;
  products.length > 0 &&
    products.forEach((product, index) => {
      let row = createRow(product, index + 1);
      tbody.innerHTML += row;
      sum += Number(product.price);
      counter += Number(product.count);
    });
  overalCount.innerHTML = counter;
  overalPrice.innerHTML = sum;

  //delete
  const deleteBtns = document.querySelectorAll("button.delete-btn");
  deleteBtns.length > 0 &&
    deleteBtns.forEach((delBtn) => {
      delBtn &&
        delBtn.addEventListener("click", function () {
          let confirmDel = confirm("Rostdan ham o'chirmoqchimisiz?");
          let elementId = this.getAttribute("data-id");
          if (confirmDel && elementId) {
            let products = getData();
            products = products.filter((product) => {
              return product.id != elementId;
            });
            localStorage.setItem("products", JSON.stringify(products));
            this.parentNode.parentNode.remove();
          }
        });
    });
  //edit
  const editBtns = document.querySelectorAll("button.edit-btn");
  editBtns.length > 0 &&
    editBtns.forEach((editBtn) => {
      editBtn &&
        editBtn.addEventListener("click", function () {
          let elementId = this.getAttribute("data-id");
          let products = getData();

          let oldValue = products.find((product) => {
            return product.id == elementId;
          });
          let name = prompt("Nomi", oldValue.name);
          let price = prompt("Narxi", oldValue.price);
          let count = prompt("Soni", oldValue.count);

          let product = {
            id: elementId,
            name: name,
            price: price,
            count: count,
          };

          products = products.map((value) => {
            if (value.id == elementId) {
              return { id: elementId, name, price, count };
            }
            return product;
          });
          localStorage.setItem("products", JSON.stringify(products));
          window.location.reload();
        });
    });
});
