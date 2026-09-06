# 🛍️ ShopEase – E-Commerce Product Catalog

A modern, responsive e-commerce product catalog built as a Web Development Capstone Project using HTML, CSS, and modern JavaScript.

The project demonstrates modular frontend architecture, client-side routing, REST API integration, dynamic rendering, local data persistence, responsive design, and deployment using GitHub and Netlify.

---

## 🚀 Live Demo

**Netlify:**
`PASTE-YOUR-NETLIFY-URL-HERE`

---

## 📂 GitHub Repository

**GitHub:**
`PASTE-YOUR-GITHUB-REPOSITORY-URL-HERE`

---

## ✨ Features

* 🏠 Responsive home page
* 🛍️ Dynamic product catalog
* 🔎 Product search functionality
* 📦 Product details page
* 🛒 Shopping cart
* 💾 LocalStorage cart persistence
* 🧭 Client-side routing
* 🌐 REST API integration
* ⚡ Fetch API with async/await
* 🛡️ API error handling
* 📱 Responsive mobile design
* 🖼️ Lazy-loaded product images
* 🧩 Modular JavaScript architecture
* 🔄 Automatic Netlify deployment through GitHub

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript ES6+
* JavaScript Modules
* Fetch API
* REST API
* LocalStorage
* GitHub
* Netlify

---

## 📁 Project Structure

```text
ecommerce-capstone/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── api.js
│   ├── router.js
│   └── components.js
│
└── README.md
```

---

## 🧩 Architecture

The application follows a modular frontend architecture.

### `index.html`

Provides the main HTML structure and application container.

### `css/style.css`

Contains:

* Responsive layout
* Navigation styling
* Product cards
* Product details
* Shopping cart
* Buttons
* Mobile styles

### `js/app.js`

Controls the main application logic, including:

* Page rendering
* Routing
* Product pages
* Product details
* Shopping cart
* LocalStorage

### `js/api.js`

Handles API communication using:

```javascript
fetch()
```

and:

```javascript
async/await
```

### `js/router.js`

Handles client-side navigation using URL hash routing.

Example:

```text
#/
#/products
#/product/1
#/cart
```

### `js/components.js`

Contains reusable UI components such as product cards and product grids.

---

## 🌐 API

Product information is retrieved from the DummyJSON Products API.

API endpoint:

```text
https://dummyjson.com/products
```

Individual products are retrieved using:

```text
https://dummyjson.com/products/{id}
```

The application dynamically processes the returned JSON data and displays the products.

---

## 🧭 Client-Side Routing

The application uses hash-based client-side routing.

| Route            | Page            |
| ---------------- | --------------- |
| `#/`             | Home            |
| `#/products`     | Products        |
| `#/product/{id}` | Product Details |
| `#/cart`         | Shopping Cart   |

Navigation occurs without traditional full-page navigation.

---

## 🛒 Shopping Cart

The shopping cart allows users to add products from the product details page.

Cart information is stored using:

```javascript
localStorage
```

Therefore, the cart remains available after refreshing the browser.

---

## ⚡ Performance Optimization

The project includes several performance-focused techniques:

* Lazy loading product images
* Modular JavaScript
* Responsive CSS
* Efficient dynamic rendering
* Minimal external dependencies
* Optimized project structure
* Semantic HTML

Product images use:

```html
loading="lazy"
```

to avoid loading images before they are needed.

---

## 📱 Responsive Design

The application is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

CSS media queries automatically adjust the layout for smaller screens.

---

## 🛡️ Error Handling

The application handles API failures using:

```javascript
try {
    // API request
} catch (error) {
    // Error handling
}
```

Users receive an appropriate error message if product data cannot be retrieved.

---

## 🔄 Deployment

The project is deployed using **GitHub + Netlify**.

Deployment workflow:

```text
Developer
    ↓
GitHub Repository
    ↓
Netlify
    ↓
Build / Deploy
    ↓
Live Website
```

Netlify is connected directly to the GitHub repository, allowing future commits to trigger new deployments automatically.

---

## 💻 Running the Project

This is a static frontend project.

No Node.js installation or backend server is required.

The project can be deployed directly through Netlify using the GitHub repository.

### Netlify settings

```text
Build command:
Leave empty

Publish directory:
.
```

---

## 📸 Project Screenshots

Add screenshots of your application here after deployment.

Example:

```text
screenshots/
├── home.png
├── products.png
├── product-details.png
└── cart.png
```

---

## 🎯 Capstone Requirements

| Requirement                  | Implementation |
| ---------------------------- | -------------- |
| Modular frontend application | ✅              |
| Client-side routing          | ✅              |
| Asset optimization           | ✅              |
| Responsive design            | ✅              |
| API integration              | ✅              |
| Fetch API                    | ✅              |
| Async/await                  | ✅              |
| Error handling               | ✅              |
| Dynamic JSON rendering       | ✅              |
| LocalStorage                 | ✅              |
| GitHub                       | ✅              |
| Netlify deployment           | ✅              |
| Public URL                   | ✅              |

---

## 👨‍💻 Project

**ShopEase – E-Commerce Product Catalog**

Built as a Web Development Capstone Project.

**Year:** 2026

---

## 📄 License

This project is created for educational and portfolio purposes.
