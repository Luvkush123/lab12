// Simple JavaScript for College Lab 12 - Online Purchase Website

// ==========================================
// 1. REGISTRATION VALIDATION
// ==========================================
function validateRegister(event) {
    event.preventDefault();

    let name = document.getElementById("reg-name").value.trim();
    let email = document.getElementById("reg-email").value.trim();
    let phone = document.getElementById("reg-phone").value.trim();
    let password = document.getElementById("reg-password").value;

    let namePattern = /^[A-Za-z\s]+$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^[0-9]{10}$/;

    if (name === "" || !namePattern.test(name)) {
        alert("Please enter a valid Name (letters only).");
        document.getElementById("reg-name").focus();
        return false;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid Email address.");
        document.getElementById("reg-email").focus();
        return false;
    }

    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit Phone Number.");
        document.getElementById("reg-phone").focus();
        return false;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        document.getElementById("reg-password").focus();
        return false;
    }

    alert("Registration Successful! Please login with your credentials.");
    window.location.href = "login.html";
    return true;
}

// ==========================================
// 2. LOGIN VALIDATION
// ==========================================
function validateLogin(event) {
    event.preventDefault();

    let username = document.getElementById("login-username").value.trim();
    let password = document.getElementById("login-password").value.trim();

    if (username === "") {
        alert("Please enter your Username.");
        document.getElementById("login-username").focus();
        return false;
    }

    if (password === "") {
        alert("Please enter your Password.");
        document.getElementById("login-password").focus();
        return false;
    }

    alert("Login Successful! Welcome, " + username);
    window.location.href = "catalogue.html";
    return true;
}

// ==========================================
// 3. XML CATALOGUE PARSER
// ==========================================
function loadCatalogue() {
    let tableBody = document.getElementById("catalogue-body");
    if (!tableBody) return;

    fetch("products.xml")
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.text();
        })
        .then(xmlString => {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(xmlString, "text/xml");
            let products = xmlDoc.getElementsByTagName("product");

            tableBody.innerHTML = "";
            for (let i = 0; i < products.length; i++) {
                let name = products[i].getElementsByTagName("name")[0].textContent;
                let author = products[i].getElementsByTagName("author")[0].textContent;
                let category = products[i].getElementsByTagName("category")[0].textContent;
                let price = products[i].getElementsByTagName("price")[0].textContent;

                let row = document.createElement("tr");
                row.innerHTML = `
                    <td><strong>${name}</strong></td>
                    <td>${author}</td>
                    <td>${category}</td>
                    <td>Rs. ${price}</td>
                    <td>
                        <button class="btn btn-sm btn-success" onclick="addToCart('${name}', ${price})">
                            Add to Cart
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            }
        })
        .catch(err => {
            console.warn("Direct fetch failed (likely local file:// CORS restriction). Using fallback products data.", err);
            // Fallback product list so page runs even when double-clicked directly from file explorer
            let fallbackProducts = [
                { name: "Web Technologies", author: "Jeffrey C. Jackson", category: "Computer Science", price: 450 },
                { name: "Core Java Volume I", author: "Cay S. Horstmann", category: "Computer Science", price: 550 },
                { name: "Database System Concepts", author: "Abraham Silberschatz", category: "Computer Science", price: 600 },
                { name: "Data Structures and Algorithms", author: "Mark Allen Weiss", category: "Computer Science", price: 500 },
                { name: "Operating System Concepts", author: "Silberschatz, Galvin", category: "Computer Science", price: 520 },
                { name: "Computer Networks", author: "Andrew S. Tanenbaum", category: "Computer Science", price: 580 }
            ];

            tableBody.innerHTML = "";
            fallbackProducts.forEach(p => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td><strong>${p.name}</strong></td>
                    <td>${p.author}</td>
                    <td>${p.category}</td>
                    <td>Rs. ${p.price}</td>
                    <td>
                        <button class="btn btn-sm btn-success" onclick="addToCart('${p.name}', ${p.price})">
                            Add to Cart
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
}

// ==========================================
// 4. SHOPPING CART OPERATIONS
// ==========================================
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("lab12_cart") || "[]");
    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name: name, price: Number(price), quantity: 1 });
    }

    localStorage.setItem("lab12_cart", JSON.stringify(cart));
    alert(name + " has been added to your cart!");
    updateCartCount();
}

function displayCart() {
    let cartBody = document.getElementById("cart-body");
    let totalEl = document.getElementById("cart-total");
    if (!cartBody) return;

    let cart = JSON.parse(localStorage.getItem("lab12_cart") || "[]");
    cartBody.innerHTML = "";
    let grandTotal = 0;

    if (cart.length === 0) {
        cartBody.innerHTML = "<tr><td colspan='5' style='text-align:center;'>Your cart is empty.</td></tr>";
        if (totalEl) totalEl.textContent = "Rs. 0";
        return;
    }

    cart.forEach((item, index) => {
        let subtotal = item.price * item.quantity;
        grandTotal += subtotal;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>Rs. ${item.price}</td>
            <td>${item.quantity}</td>
            <td>Rs. ${subtotal}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
                    Remove
                </button>
            </td>
        `;
        cartBody.appendChild(row);
    });

    if (totalEl) totalEl.textContent = "Rs. " + grandTotal;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("lab12_cart") || "[]");
    cart.splice(index, 1);
    localStorage.setItem("lab12_cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function placeOrder() {
    let cart = JSON.parse(localStorage.getItem("lab12_cart") || "[]");
    if (cart.length === 0) {
        alert("Your cart is empty! Please add books from the Catalogue.");
        return;
    }

    alert("Order Placed Successfully!\nThank you for purchasing with us.");
    localStorage.removeItem("lab12_cart");
    displayCart();
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("lab12_cart") || "[]");
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    let badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(b => b.textContent = totalCount);
}

// Update count on page load
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});
