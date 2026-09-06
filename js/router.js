export function getRoute() {

    const hash =
        window.location.hash || "#/";

    return hash.substring(1) || "/";

}


export function startRouter(callback) {

    window.addEventListener(
        "hashchange",
        callback
    );

    callback();

}
