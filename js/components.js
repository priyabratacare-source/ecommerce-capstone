export function renderProductCard(product) {
    const productId = product._id || product.id;

    return `
        <article class="product-card">
            <div class="product-image-wrapper">
                <img
                    src="${product.thumbnail}"
                    alt="${product.title}"
                    class="product-image"
                    loading="lazy"
                >
            </div>

            <div class="product-content">
                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.title}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">
                    <strong>
                        $${Number(product.price).toFixed(2)}
                    </strong>

                    <a
                        href="#/product/${productId}"
                        class="view-button"
                    >
                        View
                    </a>
                </div>
            </div>
        </article>
    `;
}


export function renderProducts(products) {
    if (!products || products.length === 0) {
        return `
            <div class="empty-state">
                <h2>No Products Found</h2>
                <p>
                    There are currently no products available.
                </p>
            </div>
        `;
    }

    return `
        <div class="products-grid">
            ${products
                .map(renderProductCard)
                .join("")}
        </div>
    `;
}


export function renderProductDetails(product) {
    if (!product) {
        return `
            <div class="empty-state">
                <h2>Product Not Found</h2>
                <a href="#/products" class="primary-button">
                    Back to Products
                </a>
            </div>
        `;
    }

    return `
        <section class="product-details">
            <div class="details-image">
                <img
                    src="${product.thumbnail}"
                    alt="${product.title}"
                >
            </div>

            <div class="details-content">
                <span class="product-category">
                    ${product.category}
                </span>

                <h1>${product.title}</h1>

                <p class="details-description">
                    ${product.description}
                </p>

                <div class="details-price">
                    $${Number(product.price).toFixed(2)}
                </div>

                <button
                    class="primary-button add-cart-button"
                    data-product-id="${product._id || product.id}"
                >
                    Add to Cart
                </button>

                <a
                    href="#/products"
                    class="back-link"
                >
                    ← Back to Products
                </a>
            </div>
        </section>
    `;
}


export function renderCart(cart) {
    if (!cart || cart.length === 0) {
        return `
            <div class="empty-state">
                <h2>Your Cart is Empty</h2>
                <p>
                    Add some products to your cart.
                </p>

                <a
                    href="#/products"
                    class="primary-button"
                >
                    Browse Products
                </a>
            </div>
        `;
    }

    const total = cart.reduce(
        (sum, product) =>
            sum + Number(product.price),
        0
    );

    return `
        <section class="cart-section">

            <div class="cart-items">
                ${cart.map((product, index) => `
                    <div class="cart-item">

                        <img
                            src="${product.thumbnail}"
                            alt="${product.title}"
                            loading="lazy"
                        >

                        <div class="cart-item-info">
                            <h3>${product.title}</h3>

                            <span>
                                ${product.category}
                            </span>

                            <strong>
                                $${Number(product.price).toFixed(2)}
                            </strong>
                        </div>

                        <button
                            class="remove-cart-button"
                            data-cart-index="${index}"
                        >
                            Remove
                        </button>

                    </div>
                `).join("")}
            </div>

            <div class="cart-summary">
                <h2>Order Summary</h2>

                <div class="summary-row">
                    <span>Items</span>
                    <strong>${cart.length}</strong>
                </div>

                <div class="summary-row total-row">
                    <span>Total</span>
                    <strong>
                        $${total.toFixed(2)}
                    </strong>
                </div>

                <button
                    class="primary-button checkout-button"
                >
                    Checkout
                </button>
            </div>

        </section>
    `;
}
