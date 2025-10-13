let subtotal = 0;
let orderNumber = 1001;

// ➕ Ajouter un produit au panier
function addToCart(name, price) {
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
}

// 💾 Enregistrer la commande
function saveOrder() {
  alert("✅ Commande enregistrée avec succès !");
  orderNumber++;
  document.getElementById("orderId").textContent = orderNumber;
}

// 🖨️ Imprimer le reçu
function printReceipt() {
  const name = document.getElementById("clientName").value;
  const phone = document.getElementById("clientPhone").value;
  const address = document.getElementById("clientAddress").value;
  const receipt = document.getElementById("receipt");
  const date = new Date().toLocaleDateString();

  document.getElementById("rName").textContent = name;
  document.getElementById("rPhone").textContent = phone;
  document.getElementById("rAddress").textContent = address;
  document.getElementById("rOrder").textContent = orderNumber;
  document.getElementById("rDate").textContent = date;
  document.getElementById("rTotal").textContent = subtotal;
  document.getElementById("rTotal2").textContent = subtotal;

  const cartRows = document.querySelectorAll("#cartItems tr");
  const rItems = document.getElementById("rItems");
  rItems.innerHTML = "";
  cartRows.forEach(r => {
    const cloned = r.cloneNode(true);
    cloned.deleteCell(2); // supprime la colonne "Prix"
    rItems.appendChild(cloned);
  });

  receipt.style.display = "block";
  window.print();
}
