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


const app = document.getElementById("app");

let products = [];

let cart = JSON.parse(
    localStorage.getItem("shopease_cart") || "[]"
);


/* =========================
   CART
========================= */

function saveCart() {
    localStorage.setItem(
        "shopease_cart",
        JSON.stringify(cart)
    );
}


function updateCartCount() {
    const count = cart.reduce(
        (total, item) =>
            total + (Number(item.quantity) || 0),
        0
    );

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = count;
    }
}


function addToCart(product) {
    const productId =
        product._id || product.id;

    const existing = cart.find(
        item => item.id === productId
    );

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: productId,
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            thumbnail: product.thumbnail,
            quantity: 1
        });
    }

    saveCart();

    updateCartCount();

    alert("Product added to cart!");
}


function removeFromCart(id) {
    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();

    renderCurrentPage();
}


function updateQuantity(id, quantity) {
    const item = cart.find(
        product => product.id === id
    );

    if (!item) return;

    item.quantity = Math.max(
        1,
        Number(quantity) || 1
    );

    saveCart();

    renderCurrentPage();
}


/* =========================
   HOME
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
                    class="primary-button"
                >
                    Shop Now
                </a>

            </div>

        </section>


        <section class="home-section">

            <div class="section-heading">

                <span>
                    ShopEase Collection
                </span>

                <h2>
                    Featured Products
                </h2>

            </div>


            <div class="products-grid">

                ${
                    products.length > 0
                        ? products
                            .slice(0, 8)
                            .map(product =>
                                renderProductCard(product)
                            )
                            .join("")
                        : `
                            <div class="empty-state">
                                <h2>
                                    No Products Available
                                </h2>

                                <p>
                                    Products will appear
                                    here when available.
                                </p>
                            </div>
                        `
                }

            </div>

        </section>
    `;

    attachProductEvents();
}


/* =========================
   PRODUCTS
========================= */

function renderProducts() {

    app.innerHTML = `
        <section class="products-section">

            <div class="page-header">

                <span>
                    ShopEase Store
                </span>

                <h1>
                    All Products
                </h1>

                <p>
                    Browse our complete
                    product collection.
                </p>

            </div>


            <div class="filter-bar">

                <input
                    type="text"
                    id="productFilter"
                    placeholder="Search products..."
                >

                <span id="resultCount">
                    ${products.length} products
                </span>

            </div>


            <div
                id="productsGrid"
                class="products-grid"
            >

                ${
                    products.length > 0
                        ? products
                            .map(product =>
                                renderProductCard(product)
                            )
                            .join("")
                        : `
                            <div class="empty-state">
                                <h2>
                                    No Products Found
                                </h2>

                                <p>
                                    There are currently
                                    no products.
                                </p>
                            </div>
                        `
                }

            </div>

        </section>
    `;

    attachProductEvents();

    setupProductFilter();
}


/* =========================
   PRODUCT FILTER
========================= */

function setupProductFilter() {

    const input =
        document.getElementById(
            "productFilter"
        );

    const grid =
        document.getElementById(
            "productsGrid"
        );

    const resultCount =
        document.getElementById(
            "resultCount"
        );

    if (!input || !grid) return;


    input.addEventListener(
        "input",
        () => {

            const query =
                input.value
                    .toLowerCase()
                    .trim();


            const filtered =
                products.filter(product => {

                    const title =
                        String(
                            product.title || ""
                        ).toLowerCase();

                    const category =
                        String(
                            product.category || ""
                        ).toLowerCase();

                    return (
                        title.includes(query) ||
                        category.includes(query)
                    );
                });


            grid.innerHTML =
                filtered.length > 0
                    ? filtered
                        .map(product =>
                            renderProductCard(product)
                        )
                        .join("")
                    : `
                        <div class="empty-state">

                            <h2>
                                No Matching Products
                            </h2>

                            <p>
                                Try another search.
                            </p>

                        </div>
                    `;


            if (resultCount) {
                resultCount.textContent =
                    `${filtered.length} products`;
            }


            attachProductEvents();
        }
    );
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
            () => {

                const id =
                    button.dataset.productId;

                const action =
                    button.dataset.action;


                if (action === "view") {

                    window.location.hash =
                        `#/product/${id}`;

                    return;
                }


                if (action === "add") {

                    const product =
                        products.find(item =>
                            String(
                                item._id ||
                                item.id
                            ) === String(id)
                        );


                    if (product) {
                        addToCart(product);
                    }
                }
            }
        );
    });
}


/* =========================
   PRODUCT DETAILS
========================= */

async function renderProduct(id) {

    app.innerHTML = `
        <section class="loading-state">

            <div class="loader"></div>

            <p>
                Loading product...
            </p>

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

                    addToCart(product);

                }
            );
        }


    } catch (error) {

        console.error(
            "Product loading error:",
            error
        );


        app.innerHTML = `
            <section class="error-state">

                <h2>
                    Product Not Found
                </h2>

                <p>
                    We could not load this product.
                </p>

                <a
                    href="#/products"
                    class="primary-button"
                >
                    Back to Products
                </a>

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


    document
        .querySelectorAll(
            "[data-remove-cart]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    removeFromCart(
                        button.dataset.removeCart
                    );

                }
            );
        });


    document
        .querySelectorAll(
            "[data-cart-quantity]"
        )
        .forEach(input => {

            input.addEventListener(
                "change",
                () => {

                    updateQuantity(
                        input.dataset.cartQuantity,
                        input.value
                    );

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


    const adminData =
        sessionStorage.getItem(
            "shopease_admin"
        );


    if (!token || !adminData) {

        window.location.hash =
            "#/admin/login";

        return;
    }


    let admin;

    try {

        admin =
            JSON.parse(adminData);

    } catch {

        sessionStorage.removeItem(
            "shopease_admin_token"
        );

        sessionStorage.removeItem(
            "shopease_admin"
        );

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
                        ${admin.name || "Administrator"}
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
                    Your admin authentication is
                    working successfully.
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


    if (logout) {

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
}


/* =========================
   MAIN ROUTER
========================= */

async function renderCurrentPage() {

    const route =
        getRoute();


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

            break;
    }
}


/* =========================
   HEADER SEARCH
========================= */

function setupHeaderSearch() {

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


            const grid =
                document.querySelector(
                    ".products-grid"
                );


            if (!grid) return;


            const filtered =
                products.filter(product => {

                    const title =
                        String(
                            product.title || ""
                        ).toLowerCase();

                    const category =
                        String(
                            product.category || ""
                        ).toLowerCase();

                    return (
                        title.includes(query) ||
                        category.includes(query)
                    );
                });


            grid.innerHTML =
                filtered.length > 0
                    ? filtered
                        .map(product =>
                            renderProductCard(product)
                        )
                        .join("")
                    : `
                        <div class="empty-state">

                            <h2>
                                No Products Found
                            </h2>

                            <p>
                                Try another search.
                            </p>

                        </div>
                    `;


            attachProductEvents();
        }
    );
}


/* =========================
   INITIALIZE
========================= */

async function init() {

    /*
       Render the current page first.
       This prevents the permanent
       "Loading ShopEase..." problem.
    */

    await renderCurrentPage();


    /*
       Load products after the page
       has already rendered.
    */

    try {

        const data =
            await getProducts();


        if (Array.isArray(data)) {

            products = data;

        } else {

            products = [];

        }


        /*
           Re-render only normal store pages.
           Admin pages don't need products
           to display.
        */

        const route =
            getRoute();


        if (
            route.page === "home" ||
            route.page === "products"
        ) {

            await renderCurrentPage();

        }


    } catch (error) {

        console.error(
            "Products API Error:",
            error
        );

        products = [];


        const route =
            getRoute();


        if (
            route.page === "home" ||
            route.page === "products"
        ) {

            await renderCurrentPage();

        }
    }


    setupHeaderSearch();

    updateCartCount();
}


/* =========================
   HASH CHANGE
========================= */

window.addEventListener(
    "hashchange",
    async () => {

        await renderCurrentPage();

        setupHeaderSearch();

        updateCartCount();
    }
);


/* =========================
   START APP
========================= */

init();
```
