import {
    getProducts,
    getProduct
} from "./api.js";

import {
    productsGrid
} from "./components.js";

import {
    getRoute,
    startRouter
} from "./router.js";


const app =
    document.getElementById("app");

const cartCount =
    document.getElementById("cart-count");


let products = [];

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];



/* =========================================
   CART COUNT
========================================= */

function updateCartCount() {

    cartCount.textContent =
        cart.length;

}



/* =========================================
   HOME PAGE
========================================= */

function homePage() {

    app.innerHTML = `

        <section class="hero">

            <div class="container hero-content">

                <h1>
                    Welcome to
                    <span>ShopEase</span>
                </h1>

                <p>
                    Discover quality products
                    at great prices.
                    Browse our collection
                    and find your next favorite item.
                </p>

                <a
                    href="#/products"
                    class="btn"
                >
                    Explore Products
                </a>

            </div>

        </section>

    `;

}



/* =========================================
   PRODUCTS PAGE
========================================= */

async function productsPage() {

    app.innerHTML = `

        <section class="container page">

            <div class="page-header">

                <h1>
                    Products
                </h1>

                <p>
                    Browse our product collection.
                </p>

            </div>


            <div class="search-box">

                <input
                    type="search"
                    id="search"
                    placeholder="Search products..."
                    aria-label="Search products"
                >

            </div>


            <div id="products-container">

                <div class="loading">
                    Loading products...
                </div>

            </div>

        </section>

    `;


    try {

        products =
            await getProducts();


        const container =
            document.getElementById(
                "products-container"
            );


        container.innerHTML =
            productsGrid(products);


        const search =
            document.getElementById(
                "search"
            );


        search.addEventListener(
            "input",
            () => {

                const query =
                    search.value
                        .trim()
                        .toLowerCase();


                const filtered =
                    products.filter(
                        product =>
                            product.title
                                .toLowerCase()
                                .includes(query)
                    );


                container.innerHTML =
                    productsGrid(
                        filtered
                    );

            }
        );


    } catch (error) {

        document.getElementById(
            "products-container"
        ).innerHTML = `

            <div class="error">

                ${error.message}

            </div>

        `;

    }

}



/* =========================================
   PRODUCT DETAILS
========================================= */

async function productPage(id) {

    app.innerHTML = `

        <section class="container">

            <div class="loading">

                Loading product...

            </div>

        </section>

    `;


    try {

        const product =
            await getProduct(id);


        app.innerHTML = `

            <section
                class="container product-details"
            >

                <img
                    src="${product.thumbnail}"
                    alt="${product.title}"
                >


                <div>

                    <h1>
                        ${product.title}
                    </h1>

                    <p>
                        ${product.description}
                    </p>

                    <p>
                        Category:
                        <strong>
                            ${product.category}
                        </strong>
                    </p>

                    <h2>
                        $${product.price}
                    </h2>

                    <button
                        class="btn"
                        id="add-cart"
                    >
                        Add to Cart
                    </button>

                </div>

            </section>

        `;


        document
            .getElementById("add-cart")
            .addEventListener(
                "click",
                () => {

                    cart.push(product);


                    localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                    );


                    updateCartCount();


                    alert(
                        "Product added to cart!"
                    );

                }
            );


    } catch (error) {

        app.innerHTML = `

            <section class="container page">

                <div class="error">

                    ${error.message}

                </div>

            </section>

        `;

    }

}



/* =========================================
   CART PAGE
========================================= */

function cartPage() {

    if (!cart.length) {

        app.innerHTML = `

            <section class="container page">

                <div class="empty-state">

                    <h1>
                        Your Cart is Empty
                    </h1>

                    <p>
                        Add some products
                        to your cart.
                    </p>

                    <a
                        href="#/products"
                        class="btn"
                    >
                        Browse Products
                    </a>

                </div>

            </section>

        `;

        return;

    }


    app.innerHTML = `

        <section class="container page">

            <div class="page-header">

                <h1>
                    Your Cart
                </h1>

                <p>
                    ${cart.length}
                    item(s) in your cart.
                </p>

            </div>


            <div class="cart-list">

                ${cart
                    .map(
                        product => `

                            <div
                                class="cart-item"
                            >

                                <img
                                    src="${product.thumbnail}"
                                    alt="${product.title}"
                                    loading="lazy"
                                >

                                <div>

                                    <h3>
                                        ${product.title}
                                    </h3>

                                    <p>
                                        $${product.price}
                                    </p>

                                </div>

                            </div>

                        `
                    )
                    .join("")}

            </div>

        </section>

    `;

}



/* =========================================
   404 PAGE
========================================= */

function notFoundPage() {

    app.innerHTML = `

        <section class="container page">

            <div class="empty-state">

                <h1>
                    404
                </h1>

                <p>
                    The page you are looking
                    for does not exist.
                </p>

                <a
                    href="#/"
                    class="btn"
                >
                    Back to Home
                </a>

            </div>

        </section>

    `;

}



/* =========================================
   ROUTER
========================================= */

async function router() {

    const route =
        getRoute();


    if (route === "/") {

        homePage();

    }

    else if (
        route === "/products"
    ) {

        await productsPage();

    }

    else if (
        route.startsWith("/product/")
    ) {

        const id =
            route.split("/")[2];

        if (id) {

            await productPage(id);

        } else {

            notFoundPage();

        }

    }

    else if (
        route === "/cart"
    ) {

        cartPage();

    }

    else {

        notFoundPage();

    }


    updateCartCount();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* =========================================
   START APPLICATION
========================================= */

startRouter(router);

updateCartCount();
