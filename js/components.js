export function productCard(product) {

    return `

        <article class="product-card">

            <img
                src="${product.thumbnail}"
                alt="${product.title}"
                loading="lazy"
            >

            <div class="product-content">

                <h3>
                    ${product.title}
                </h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="price">
                    $${product.price}
                </p>

                <a
                    href="#/product/${product.id}"
                    class="btn"
                >
                    View Product
                </a>

            </div>

        </article>

    `;

}


export function productsGrid(products) {

    if (!products.length) {

        return `

            <div class="empty-state">

                <h2>
                    No products found
                </h2>

                <p>
                    Try another search term.
                </p>

            </div>

        `;

    }


    return `

        <section class="products-grid">

            ${products
                .map(productCard)
                .join("")}

        </section>

    `;

}
