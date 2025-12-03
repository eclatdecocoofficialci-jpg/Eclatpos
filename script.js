function saveOrder() {
  const name = document.getElementById("clientName").value;
  const phone = document.getElementById("clientPhone").value;
  const address = document.getElementById("clientAddress").value;

  const cartRows = document.querySelectorAll("#cartItems tr");
  if (cartRows.length === 0) {
    alert("❌ Le panier est vide !");
    return;
  }

  const items = [];
  cartRows.forEach(r => {
    const cells = r.querySelectorAll("td");
    items.push({
      product: cells[0].textContent,
      qty: Number(cells[1].textContent),
      price: Number(cells[2].textContent),
      total: Number(cells[3].textContent)
    });
  });

  const order = {
    id: orderNumber,
    date: new Date().toLocaleString(),
    client: name,
    phone: phone,
    address: address,
    items: items,
    total: subtotal
  };

  // 🔖 Sauvegarde dans localStorage
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  sales.push(order);
  localStorage.setItem("sales", JSON.stringify(sales));

  alert("✅ Commande enregistrée avec succès !");
  orderNumber++;
  document.getElementById("orderId").textContent = orderNumber;

  // Vider le panier et réinitialiser
  document.getElementById("cartItems").innerHTML = "";
  subtotal = 0;
  document.getElementById("subtotal").textContent = subtotal;
  document.getElementById("total").textContent = subtotal;

  // Réinitialiser les champs client
  document.getElementById("clientName").value = "";
  document.getElementById("clientPhone").value = "";
  document.getElementById("clientAddress").value = "";
}
invoiceCount++;
localStorage.setItem("invoiceCount", invoiceCount);
updateInvoiceNumber();
function press(key) {
  document.getElementById("calcDisplay").value += key;
}

function calculate() {
  try {
    let result = eval(document.getElementById("calcDisplay").value);
    document.getElementById("calcDisplay").value = result;
  } catch {
    document.getElementById("calcDisplay").value = "Erreur";
  }
}
