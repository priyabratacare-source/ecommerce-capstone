export function getRoute() {
    const hash =
        window.location.hash || "#/";

    const route =
        hash.replace(/^#/, "");

    const parts =
        route.split("/").filter(Boolean);

    if (parts.length === 0) {
        return {
            page: "home"
        };
    }

    if (parts[0] === "products") {
        return {
            page: "products"
        };
    }

    if (parts[0] === "product" && parts[1]) {
        return {
            page: "product",
            id: parts[1]
        };
    }

    if (parts[0] === "cart") {
        return {
            page: "cart"
        };
    }

    return {
        page: "404"
    };
}


export function navigate(path) {
    window.location.hash = path;
}


export function startRouter(callback) {
    window.addEventListener(
        "hashchange",
        callback
    );

    callback();
}
