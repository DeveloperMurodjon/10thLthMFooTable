function validate(name, price, count) {
  if (!name.trim() || !price || !count) {
    alert("Barcha maydonlarni to'ldiring!");
    return false;
  }
  if (Number(price) <= 0 || Number(count) <= 0) {
    alert("Narx va son musbat bo'lishi kerak!");
    return false;
  }
  return true;
}

function getData() {
  let products = [];
  if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
  }

  return products;
}

function createRow(product, index) {
  return ` 
           <tr>
            <td>${index}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.count}</td>
            <td>
              <button class="edit-btn" data-id="${product.id}">edit</button>
              <button class="delete-btn" data-id="${product.id}">delete</button>
            </td>
          </tr>
  `;
}

export { validate, getData, createRow };
