const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        description:
            "Comfortable wireless headphones with clear sound and long battery life.",
        price: 2499,
        category: "Electronics",
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 2,
        title: "Smart Watch",
        description:
            "Modern smartwatch for fitness tracking, notifications and daily activities.",
        price: 3299,
        category: "Electronics",
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 3,
        title: "Running Shoes",
        description:
            "Lightweight running shoes designed for everyday comfort and exercise.",
        price: 1899,
        category: "Footwear",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 4,
        title: "Backpack",
        description:
            "Durable everyday backpack suitable for college, travel and work.",
        price: 1299,
        category: "Accessories",
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 5,
        title: "Classic Sunglasses",
        description:
            "Stylish sunglasses with a lightweight frame for everyday use.",
        price: 899,
        category: "Accessories",
        image:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 6,
        title: "Laptop",
        description:
            "Reliable laptop for study, office work, browsing and entertainment.",
        price: 54999,
        category: "Electronics",
        image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 7,
        title: "Coffee Mug",
        description:
            "Simple ceramic coffee mug suitable for home and office use.",
        price: 399,
        category: "Home",
        image:
            "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 8,
        title: "Casual T-Shirt",
        description:
            "Comfortable casual t-shirt made for everyday wear.",
        price: 699,
        category: "Fashion",
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    }
];


export function getProducts() {
    return products;
}


export function getProductById(id) {
    return products.find(
        product => product.id === Number(id)
    );
}


export function searchProducts(query) {

    const text = query
        .toLowerCase()
        .trim();

    if (!text) {
        return products;
    }

    return products.filter(product =>
        product.title.toLowerCase().includes(text) ||
        product.category.toLowerCase().includes(text) ||
        product.description.toLowerCase().includes(text)
    );
}
