const API_URL = "https://dummyjson.com/products";


export async function getProducts() {

    try {

        const response =
            await fetch(API_URL);

        if (!response.ok) {

            throw new Error(
                "Unable to fetch products."
            );

        }

        const data =
            await response.json();

        return data.products;

    } catch (error) {

        console.error(
            "API Error:",
            error
        );

        throw new Error(
            "Products could not be loaded. Please try again."
        );

    }

}


export async function getProduct(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/${id}`
            );

        if (!response.ok) {

            throw new Error(
                "Product not found."
            );

        }

        const product =
            await response.json();

        return product;

    } catch (error) {

        console.error(
            "Product Error:",
            error
        );

        throw new Error(
            "Unable to load product details."
        );

    }

}
