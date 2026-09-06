```javascript
import {
    getProducts,
    getProduct
} from "./api.js";

import {
    renderProductCard,
    renderProductDetails,
    renderCart
} from "./components.js";

import {
    getRoute
} from "./router.js";

import {
    renderAdminLogin,
    setupAdminLogin
} from "./admin.js";

const app =
    document.getElementById("app");

let products = [];

let cart =
    JSON.parse(
        localStorage.getItem("shopease_cart")
    ) || [];


/* =========================
   CART FUNCTIONS
========================= */

function saveCart() {
    localStorage.setItem(
        "shopease_cart",
        JSON.stringify(cart)
    );
}

function addToCart(product) {
    const existing =
        cart.find(
            item => item.id === product.id
        );

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();

    alert("Product added to cart!");

    updateCartCount();
}

function removeFromCart(id) {
    cart =
        cart.filter(
            item => item.id !== id
        );

    saveCart();

    renderCurrentPage();
}

function updateQuantity(id, quantity) {
    const item =
        cart.find(
            product => product.id === id
        );

    if (!item) return;

    item.quantity =
        Math.max(1, quantity);

    saveCart();

    renderCurrentPage();
}

function updateCartCount() {
    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = count;
    }
}


/* =========================
   HOME PAGE
========================= */

function renderHome() {
    app.innerHTML = `
        <section class="hero">
            <div class="hero-content">
                <span class="hero-badge">
                    Welcome to ShopEase
                </span>

                <h1>
                    Everything You Need,
                    <span>All in One Place.</span>
                </h1>

                <p>
                    Discover quality products at
                    great prices with ShopEase.
                </p>

                <a
                    href="#/products"
                    class="hero-btn"
                >
                    Shop Now
                </a>
            </div>
        </section>

        <section class="section">
            <div class="section-heading">
                <h2>Featured Products</h2>

                <a href="#/products">
                    View All
                </a>
            </div>

            <div class="product-grid">
                ${
                    products.length
                        ? products
                            .slice(0, 8)
                            .map(
                                renderProductCard
                            )
                            .join("")
                        : `
                            <p>
                                No products available.
                            </p>
                        `
                }
            </div>
        </section>
    `;

    attachProductEvents();
}


/* =========================
   PRODUCTS PAGE
========================= */

function renderProducts() {
    app.innerHTML = `
        <section class="section">

            <div class="section-heading">
                <div>
                    <h1>All Products</h1>

                    <p>
                        Browse our complete
                        collection.
                    </p>
                </div>
            </div>

            <div class="product-grid">

                ${
                    products.length
                        ? products
                            .map(
                                renderProductCard
                            )
                            .join("")
                        : `
                            <p>
                                No products found.
                            </p>
                        `
                }

            </div>

        </section>
    `;

    attachProductEvents();
}


/* =========================
   PRODUCT DETAILS
========================= */

async function renderProduct(id) {
    app.innerHTML = `
        <section class="section loading">
            <p>Loading product...</p>
        </section>
    `;

    try {
        const product =
            await getProduct(id);

        app.innerHTML =
            renderProductDetails(product);

        const addButton =
            document.getElementById(
                "addToCartButton"
            );

        if (addButton) {
            addButton.addEventListener(
                "click",
                () => {
                    const productId =
                        product._id ||
                        product.id;

                    addToCart({
                        id: productId,
                        title: product.title,
                        description:
                            product.description,
                        price: product.price,
                        category:
                            product.category,
                        thumbnail:
                            product.thumbnail
                    });
                }
            );
        }

    } catch (error) {
        app.innerHTML = `
            <section class="section">

                <div class="error-message">
                    <h2>
                        Product Not Found
                    </h2>

                    <p>
                        We couldn't load this
                        product.
                    </p>

                    <a href="#/products">
                        Back to Products
                    </a>
                </div>

            </section>
        `;
    }
}


/* =========================
   CART PAGE
========================= */

function renderCartPage() {
    app.innerHTML =
        renderCart(cart);

    const removeButtons =
        document.querySelectorAll(
            "[data-remove-cart]"
        );

    removeButtons.forEach(button => {
        button.addEventListener(
            "click",
            () => {
                removeFromCart(
                    button.dataset.removeCart
                );
            }
        );
    });

    const quantityInputs =
        document.querySelectorAll(
            "[data-cart-quantity]"
        );

    quantityInputs.forEach(input => {
        input.addEventListener(
            "change",
            () => {
                updateQuantity(
                    input.dataset.cartQuantity,
                    Number(input.value)
                );
            }
        );
    });
}


/* =========================
   PRODUCT EVENTS
========================= */

function attachProductEvents() {
    const buttons =
        document.querySelectorAll(
            "[data-product-id]"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const id =
                    button.dataset.productId;

                if (
                    button.dataset.action ===
                    "view"
                ) {
                    window.location.hash =
                        `#/product/${id}`;

                    return;
                }

                if (
                    button.dataset.action ===
                    "add"
                ) {
                    const product =
                        products.find(
                            item =>
                                (
                                    item._id ||
                                    item.id
                                ) === id
                        );

                    if (product) {
                        addToCart({
                            id:
                                product._id ||
                                product.id,

                            title:
                                product.title,

                            description:
                                product.description,

                            price:
                                product.price,

                            category:
                                product.category,

                            thumbnail:
                                product.thumbnail
                        });
                    }
                }
            }
        );
    });
}


/* =========================
   ADMIN LOGIN
========================= */

function renderAdminLoginPage() {
    app.innerHTML =
        renderAdminLogin();

    setupAdminLogin();
}


/* =========================
   ADMIN DASHBOARD
========================= */

function renderAdminDashboard() {
    const token =
        sessionStorage.getItem(
            "shopease_admin_token"
        );

    const admin =
        JSON.parse(
            sessionStorage.getItem(
                "shopease_admin"
            ) || "null"
        );

    if (!token || !admin) {
        window.location.hash =
            "#/admin/login";

        return;
    }

    app.innerHTML = `
        <section class="admin-dashboard">

            <div class="admin-header">

                <div>
                    <span class="admin-badge">
                        ADMIN PANEL
                    </span>

                    <h1>
                        ShopEase Dashboard
                    </h1>

                    <p>
                        Welcome,
                        ${admin.name}
                    </p>
                </div>

                <button
                    id="adminLogout"
                    class="logout-btn"
                >
                    Logout
                </button>

            </div>

            <div class="admin-card">

                <h2>
                    Product Management
                </h2>

                <p>
                    Admin product management
                    will be added in the next step.
                </p>

                <a
                    href="#/products"
                    class="admin-back-btn"
                >
                    View Store
                </a>

            </div>

        </section>
    `;

    const logout =
        document.getElementById(
            "adminLogout"
        );

    logout.addEventListener(
        "click",
        () => {
            sessionStorage.removeItem(
                "shopease_admin_token"
            );

            sessionStorage.removeItem(
                "shopease_admin"
            );

            window.location.hash =
                "#/admin/login";
        }
    );
}


/* =========================
   ROUTER
========================= */

async function renderCurrentPage() {
    const route = getRoute();

    updateCartCount();

    switch (route.page) {

        case "home":
            renderHome();
            break;

        case "products":
            renderProducts();
            break;

        case "product":
            await renderProduct(
                route.id
            );
            break;

        case "cart":
            renderCartPage();
            break;

        case "admin-login":
            renderAdminLoginPage();
            break;

        case "admin-dashboard":
            renderAdminDashboard();
            break;

        default:
            renderHome();
    }
}


/* =========================
   SEARCH
========================= */

function setupSearch() {
    const searchInput =
        document.getElementById(
            "searchInput"
        );

    if (!searchInput) return;

    searchInput.addEventListener(
        "input",
        () => {

            const query =
                searchInput.value
                    .toLowerCase()
                    .trim();

            const filtered =
                products.filter(product =>
                    product.title
                        .toLowerCase()
                        .includes(query)
                );

            const grid =
                document.querySelector(
                    ".product-grid"
                );

            if (!grid) return;

            grid.innerHTML =
                filtered.length
                    ? filtered
                        .map(
                            renderProductCard
                        )
                        .join("")
                    : `
                        <p>
                            No matching products found.
                        </p>
                    `;

            attachProductEvents();
        }
    );
}


/* =========================
   INITIAL LOAD
========================= */

async function init() {
    try {
        products =
            await getProducts();

    } catch (error) {

        console.error(
            "Failed to load products:",
            error
        );

        products = [];
    }

    await renderCurrentPage();

    setupSearch();

    updateCartCount();
}

window.addEventListener(
    "hashchange",
    async () => {
        await renderCurrentPage();
        setupSearch();
    }
);

init();
```
