// ===========================
// 🌸 Éclat de Coco POS System
// ===========================

// 💰 POS VARIABLES
let subtotal = 0;
let orderNumber = 1001;

// ===========================
// 🩷 SPLASH + LOGIN
// ===========================
window.onload = function () {
  const splash = document.getElementById("splash");
  setTimeout(() => {
    splash.style.opacity = "0";
    setTimeout(() => {
      splash.style.display = "none";
      document.getElementById("login").style.display = "block";
    }, 800);
  }, 1800);
};

// PIN check (1234)
function checkPin() {
  const pin = document.getElementById("pin").value;
  if (pin === "1234") {
    document.getElementById("login").style.display = "none";
    document.getElementById("app").style.display = "block";
    showSection("dashboard");
    updateDate();
    initChart();
  } else {
    alert("❌ Incorrect PIN. Try again!");
  }
}

// ===========================
// 📊 DASHBOARD
// ===========================
function updateDate() {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("todayDate").textContent = today.toLocaleDateString('en-US', options);
}

function initChart() {
  const ctx = document.getElementById('salesChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Sales',
          data: [12000, 19000, 3000, 5000, 20000, 30000, 15000],
          borderColor: '#e91e63',
          backgroundColor: 'rgba(233, 30, 99, 0.2)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Expenses',
          data: [4000, 8000, 1000, 2000, 5000, 9000, 3000],
          borderColor: '#f8bbd0',
          backgroundColor: 'rgba(248,187,208,0.2)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: 'bottom' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

function setReport(type) {
  document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
  alert("Showing " + type + " report (demo)");
}

// ===========================
// 🧭 NAVIGATION
// ===========================
function showSection(sectionId) {
  document.querySelectorAll(".nav-buttons button").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll("section").forEach(sec => sec.style.display = "none");

  document.querySelector(`button[onclick="showSection('${sectionId}')"]`).classList.add("active");
  document.getElementById(sectionId).style.display = "block";
}

// ===========================
// 🧴 POS FUNCTIONS (from your file)
// ===========================
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

function saveOrder() {
  alert("✅ Commande enregistrée avec succès !");
  orderNumber++;
  document.getElementById("orderId").textContent = orderNumber;
}

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
    cloned.deleteCell(2);
    rItems.appendChild(cloned);
  });

  receipt.style.display = "block";
  window.print();
}
