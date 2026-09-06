import {
    getProducts,
    getProduct
} from "./api.js";

import {
    renderProducts,
    renderProductDetails,
    renderCart
} from "./components.js";

import {
    getRoute,
    startRouter
} from "./router.js";


const app =
    document.getElementById("app");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const cartCount =
    document.getElementById("cartCount");


let products = [];

let cart =
    JSON.parse(
        localStorage.getItem("shopease-cart")
    ) || [];


function saveCart() {
    localStorage.setItem(
        "shopease-cart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


function updateCartCount() {
    if (cartCount) {
        cartCount.textContent =
            cart.length;
    }
}


function showLoading() {
    app.innerHTML = `
        <div class="loading-state">
            <div class="loader"></div>
            <p>Loading...</p>
        </div>
    `;
}


function showError(message) {
    app.innerHTML = `
        <div class="error-state">
            <h2>Something went wrong</h2>
            <p>${message}</p>

            <button
                class="primary-button"
                id="retryButton"
            >
                Try Again
            </button>
        </div>
    `;

    const retryButton =
        document.getElementById(
            "retryButton"
        );

    if (retryButton) {
        retryButton.addEventListener(
            "click",
            () => {
                renderPage();
            }
        );
    }
}


async function loadProducts() {
    showLoading();

    try {
        products =
            await getProducts();

        renderPage();
    } catch (error) {
        console.error(error);

        showError(
            "Unable to connect to the ShopEase server."
        );
    }
}


async function renderProductPage(id) {
    showLoading();

    try {
        const product =
            await getProduct(id);

        app.innerHTML =
            renderProductDetails(product);

        attachProductEvents();

    } catch (error) {
        console.error(error);

        showError(
            "Unable to load this product."
        );
    }
}


function renderHomePage() {
    app.innerHTML = `
        <section class="hero">
            <div class="hero-content">

                <span class="hero-badge">
                    Welcome to ShopEase
                </span>

                <h1>
                    Discover Products
                    You'll Love
                </h1>

                <p>
                    Explore our collection of
                    quality products at great prices.
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
                <span>Featured</span>
                <h2>Latest Products</h2>
            </div>

            ${
                products.length
                    ? renderProducts(
                        products.slice(0, 6)
                    )
                    : `
                        <div class="empty-state">
                            <p>
                                No products available yet.
                            </p>
                        </div>
                    `
            }
        </section>
    `;
}


function renderProductsPage() {
    app.innerHTML = `
        <section class="page-header">
            <span>ShopEase Store</span>
            <h1>All Products</h1>
            <p>
                Browse our complete product collection.
            </p>
        </section>

        <section class="products-section">

            <div class="filter-bar">

                <input
                    type="text"
                    id="productSearch"
                    placeholder="Search products..."
                >

                <span id="resultCount">
                    ${products.length} products
                </span>

            </div>

            <div id="productsContainer">
                ${renderProducts(products)}
            </div>

        </section>
    `;

    const productSearch =
        document.getElementById(
            "productSearch"
        );

    const productsContainer =
        document.getElementById(
            "productsContainer"
        );

    const resultCount =
        document.getElementById(
            "resultCount"
        );


    productSearch.addEventListener(
        "input",
        () => {

            const keyword =
                productSearch.value
                    .toLowerCase()
                    .trim();

            const filtered =
                products.filter(
                    product =>
                        product.title
                            .toLowerCase()
                            .includes(keyword) ||
                        product.category
                            .toLowerCase()
                            .includes(keyword)
                );

            productsContainer.innerHTML =
                renderProducts(filtered);

            resultCount.textContent =
                `${filtered.length} products`;
        }
    );
}


function renderCartPage() {
    app.innerHTML =
        renderCart(cart);

    document
        .querySelectorAll(
            ".remove-cart-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.cartIndex
                        );

                    cart.splice(index, 1);

                    saveCart();

                    renderCartPage();
                }
            );
        });


    const checkoutButton =
        document.querySelector(
            ".checkout-button"
        );

    if (checkoutButton) {
        checkoutButton.addEventListener(
            "click",
            () => {
                alert(
                    "Checkout functionality coming soon."
                );
            }
        );
    }
}


function attachProductEvents() {
    const addButton =
        document.querySelector(
            ".add-cart-button"
        );

    if (!addButton) {
        return;
    }

    addButton.addEventListener(
        "click",
        async () => {

            const id =
                addButton.dataset.productId;

            try {

                const product =
                    await getProduct(id);

                cart.push(product);

                saveCart();

                addButton.textContent =
                    "Added to Cart ✓";

                addButton.disabled =
                    true;

            } catch (error) {

                alert(
                    "Unable to add product to cart."
                );
            }
        }
    );
}


async function renderPage() {

    const route =
        getRoute();


    if (
        route.page === "home"
    ) {
        if (!products.length) {
            await loadProducts();
            return;
        }

        renderHomePage();
        return;
    }


    if (
        route.page === "products"
    ) {
        if (!products.length) {
            await loadProducts();
            return;
        }

        renderProductsPage();
        return;
    }


    if (
        route.page === "product"
    ) {
        await renderProductPage(
            route.id
        );
        return;
    }


    if (
        route.page === "cart"
    ) {
        renderCartPage();
        return;
    }


    app.innerHTML = `
        <div class="empty-state">
            <h1>404</h1>
            <p>Page not found.</p>

            <a
                href="#/"
                class="primary-button"
            >
                Go Home
            </a>
        </div>
    `;
}


function searchProducts() {

    const keyword =
        searchInput.value
            .toLowerCase()
            .trim();

    if (!keyword) {
        window.location.hash =
            "#/products";

        return;
    }

    window.location.hash =
        "#/products";

    setTimeout(() => {

        const productSearch =
            document.getElementById(
                "productSearch"
            );

        if (productSearch) {

            productSearch.value =
                keyword;

            productSearch.dispatchEvent(
                new Event("input")
            );

            productSearch.focus();
        }

    }, 50);
}


if (searchButton) {
    searchButton.addEventListener(
        "click",
        searchProducts
    );
}


if (searchInput) {
    searchInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {
                searchProducts();
            }
        }
    );
}


updateCartCount();

startRouter(
    renderPage
);
