export function renderHome(products) {

    const featuredProducts =
        products.slice(0, 4);

    return `
        <section class="hero">

            <h1>
                Welcome to <span>ShopEase</span>
            </h1>

            <p>
                Discover quality products at simple and
                affordable prices.
            </p>

            <a
                href="#/products"
                class="primary-button"
            >
                Explore Products
            </a>

        </section>


        <section>

            <div class="section-title">

                <h2>
                    Featured Products
                </h2>

                <p>
                    Explore some of our popular products.
                </p>

            </div>

            <div class="products-grid">

                ${featuredProducts
                    .map(product =>
                        renderProductCard(product)
                    )
                    .join("")
                }

            </div>

        </section>
    `;
}


export function renderProducts(products) {

    return `
        <section>

            <div class="section-title">

                <h2>
                    All Products
                </h2>

                <p>
                    Browse our complete product collection.
                </p>

            </div>

            ${
                products.length === 0
                    ? `
                        <div class="empty-state">
                            No products found.
                        </div>
                    `
                    : `
                        <div class="products-grid">

                            ${products
                                .map(product =>
                                    renderProductCard(product)
                                )
                                .join("")
                            }

                        </div>
                    `
            }

        </section>
    `;
}


export function renderProductCard(product) {

    return `
        <article class="product-card">

            <img
                src="${product.image}"
                alt="${product.title}"
                class="product-image"
                loading="lazy"
            >

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3 class="product-title">
                    ${product.title}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </span>

                    <a
                        href="#/product/${product.id}"
                        class="view-button"
                    >
                        View
                    </a>

                </div>

            </div>

        </article>
    `;
}


export function renderProductDetails(product) {

    if (!product) {

        return `
            <div class="error-message">
                Product not found.
            </div>
        `;
    }

    return `
        <section class="product-details">

            <div class="product-details-layout">

                <img
                    src="${product.image}"
                    alt="${product.title}"
                    class="product-details-image"
                >

                <div>

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h1>
                        ${product.title}
                    </h1>

                    <p class="product-details-description">
                        ${product.description}
                    </p>

                    <div class="product-details-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </div>

                    <button
                        class="add-cart-button"
                        data-product-id="${product.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        </section>
    `;
}


export function renderCart(cart, products) {

    if (cart.length === 0) {

        return `
            <div class="empty-state">

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add some products to your cart.
                </p>

                <br>

                <a
                    href="#/products"
                    class="primary-button"
                >
                    Browse Products
                </a>

            </div>
        `;
    }


    const cartProducts =
        cart
            .map(id => products.find(
                product => product.id === id
            ))
            .filter(Boolean);


    const total =
        cartProducts.reduce(
            (sum, product) =>
                sum + product.price,
            0
        );


    return `
        <section class="cart-container">

            <div class="section-title">
                <h2>Your Cart</h2>
                <p>
                    Products you have selected.
                </p>
            </div>

            ${cartProducts
                .map(product => `

                    <div class="cart-item">

                        <div class="cart-item-info">

                            <img
                                src="${product.image}"
                                alt="${product.title}"
                                class="cart-item-image"
                            >

                            <div>
                                <h3>
                                    ${product.title}
                                </h3>

                                <p>
                                    ₹${product.price.toLocaleString("en-IN")}
                                </p>
                            </div>

                        </div>

                        <button
                            class="remove-button"
                            data-remove-id="${product.id}"
                        >
                            Remove
                        </button>

                    </div>

                `)
                .join("")
            }

            <div class="cart-total">
                Total:
                ₹${total.toLocaleString("en-IN")}
            </div>

        </section>
    `;
}
