let subtotal = 0;
let orderNumber = 1001;

function addToCart(code, name, price) {
  const cart = document.getElementById("cartItems");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${name}</td>
    <td>1</td>
    <td>${price}</td>
    <td>${price}</td>
  `;
  cart.appendChild(row);

  subtotal += price;
  document.getElementById("subtotal").textContent = subtotal;
  document.getElementById("total").textContent = subtotal;
  document.getElementById("finalTotal").textContent = subtotal;
}

function saveOrder() {
  alert("✅ Commande enregistrée avec succès !");
  orderNumber++;
  document.getElementById("orderId").textContent = orderNumber;
}

function printReceipt() {
  const name = document.getElementById("clientName").value;
  const phone = document.getElementById("clientPhone").value;
  const address = document.getElementById("clientAddress").value;
  const receipt = document.getElementById("receiptPreview");
  const date = new Date().toLocaleDateString();

  document.getElementById("receiptClientName").textContent = name;
  document.getElementById("receiptClientPhone").textContent = phone;
  document.getElementById("receiptClientAddress").textContent = address;
  document.getElementById("receiptOrderID").textContent = document.getElementById("orderId").textContent;
  document.getElementById("receiptDate").textContent = date;
  document.getElementById("receiptTotal").textContent = subtotal;
  document.getElementById("receiptTotalLine").textContent = subtotal;

  const cartRows = document.querySelectorAll("#cartItems tr");
  const receiptBody = document.getElementById("receiptItems");
  receiptBody.innerHTML = "";
  cartRows.forEach(r => {
    const cloned = r.cloneNode(true);
    cloned.deleteCell(2);
    receiptBody.appendChild(cloned);
  });

  receipt.style.display = "block";
  window.print();
}
