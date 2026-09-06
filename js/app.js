import {
    getProducts,
    getProductById,
    searchProducts
} from "./products.js";

import {
    renderHome,
    renderProducts,
    renderProductDetails,
    renderCart
} from "./components.js";

import { getRoute } from "./router.js";


const app =
    document.getElementById("app");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const cartCount =
    document.getElementById("cartCount");


let products =
    getProducts();


let cart =
    JSON.parse(
        localStorage.getItem("shopease_cart") || "[]"
    );


function saveCart() {

    localStorage.setItem(
        "shopease_cart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


function updateCartCount() {

    cartCount.textContent =
        cart.length;
}


function render() {

    const route =
        getRoute();


    if (route.page === "home") {

        app.innerHTML =
            renderHome(products);

        return;
    }


    if (route.page === "products") {

        app.innerHTML =
            renderProducts(products);

        return;
    }


    if (route.page === "product") {

        const product =
            getProductById(route.id);

        app.innerHTML =
            renderProductDetails(product);

        setupProductDetails();

        return;
    }


    if (route.page === "cart") {

        app.innerHTML =
            renderCart(
                cart,
                products
            );

        setupCart();

        return;
    }
}


function setupProductDetails() {

    const button =
        document.querySelector(
            ".add-cart-button"
        );

    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            const productId =
                Number(
                    button.dataset.productId
                );


            if (!cart.includes(productId)) {

                cart.push(productId);

                saveCart();

                button.textContent =
                    "Added to Cart";

            } else {

                button.textContent =
                    "Already in Cart";
            }
        }
    );
}


function setupCart() {

    const removeButtons =
        document.querySelectorAll(
            "[data-remove-id]"
        );


    removeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const productId =
                    Number(
                        button.dataset.removeId
                    );


                cart =
                    cart.filter(
                        id => id !== productId
                    );


                saveCart();

                render();
            }
        );
    });
}


function performSearch() {

    const query =
        searchInput.value.trim();


    if (!query) {

        window.location.hash =
            "#/products";

        return;
    }


    const results =
        searchProducts(query);


    window.location.hash =
        "#/products";


    setTimeout(() => {

        app.innerHTML =
            renderProducts(results);

    }, 0);
}


searchButton.addEventListener(
    "click",
    performSearch
);


searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            performSearch();
        }
    }
);


window.addEventListener(
    "hashchange",
    render
);


updateCartCount();

render();
