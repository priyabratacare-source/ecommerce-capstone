```javascript
export function getRoute() {
    const hash =
        window.location.hash || "#/";

    const path =
        hash.replace(/^#/, "");

    if (
        path === "" ||
        path === "/"
    ) {
        return {
            page: "home"
        };
    }

    if (path === "/products") {
        return {
            page: "products"
        };
    }

    if (path === "/cart") {
        return {
            page: "cart"
        };
    }

    if (path === "/admin/login") {
        return {
            page: "admin-login"
        };
    }

    if (path === "/admin/dashboard") {
        return {
            page: "admin-dashboard"
        };
    }

    if (path.startsWith("/product/")) {
        const id =
            path.split("/")[2];

        return {
            page: "product",
            id
        };
    }

    return {
        page: "home"
    };
}

export function navigate(path) {
    window.location.hash = path;
}
```
