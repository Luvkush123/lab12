# Web Technology Laboratory - Lab Experiment 12
## Design a Web Site for Online Purchase using CSS, JS, and XML

**Student Name:** Luvkush Sharma  
**USN:** 24BTRSN022  

### 1. Aim
To design a simple multi-page online purchase website (Online Book Store) using **HTML, CSS, JavaScript**, and **XML** with client-side form validation, dynamic XML catalog loading, and shopping cart functionality.

---

### 2. Web Pages and Files

| File | Purpose |
| :--- | :--- |
| `index.html` | **Home Page:** Displays website title, navigation bar, introduction, and category overview. |
| `login.html` | **Login Page:** Username and Password input form with JavaScript validation and Reset option. |
| `register.html` | **Registration Page:** Form with name, email, phone number (10 digits), password, and gender validation. |
| `catalogue.html` | **Catalogue Page:** Dynamically reads book records from `products.xml` using JavaScript `DOMParser` and provides an "Add to Cart" button. |
| `cart.html` | **Cart Page:** Lists selected books, quantities, individual subtotals, grand total, and a "Place Order" button. |
| `products.xml` | **XML Data:** Stores product details (`<name>`, `<author>`, `<category>`, `<price>`). |
| `style.css` | **Stylesheet:** Simple, clean CSS for navigation, tables, forms, and buttons. |
| `script.js` | **JavaScript:** Form validation, XML parsing, and cart management (`localStorage`). |

---

### 3. How to Run

#### Option 1: Direct Browser Opening
Simply double-click `index.html` in your file explorer to open it in chromium-based browsers or Firefox.

#### Option 2: Run with Local HTTP Server
```bash
python3 -m http.server 8000
```
Then visit: **http://localhost:8000**
