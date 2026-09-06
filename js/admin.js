```javascript
const AUTH_API =
    "https://shopease-backend-h35v.onrender.com/api/auth/login";

export function renderAdminLogin() {
    return `
        <section class="admin-login-page">
            <div class="admin-login-card">

                <div class="admin-login-icon">
                    🔐
                </div>

                <h1>Admin Login</h1>

                <p>
                    Sign in to manage your ShopEase store.
                </p>

                <form id="adminLoginForm">

                    <div class="form-group">
                        <label for="adminEmail">
                            Email
                        </label>

                        <input
                            type="email"
                            id="adminEmail"
                            placeholder="Enter admin email"
                            autocomplete="email"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="adminPassword">
                            Password
                        </label>

                        <input
                            type="password"
                            id="adminPassword"
                            placeholder="Enter admin password"
                            autocomplete="current-password"
                            required
                        >
                    </div>

                    <button
                        type="submit"
                        class="admin-login-btn"
                    >
                        Login
                    </button>

                    <div id="loginMessage"></div>

                </form>

            </div>
        </section>
    `;
}

export function setupAdminLogin() {
    const form = document.getElementById("adminLoginForm");

    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document
            .getElementById("adminEmail")
            .value
            .trim();

        const password = document
            .getElementById("adminPassword")
            .value;

        const message =
            document.getElementById("loginMessage");

        const button =
            form.querySelector("button");

        button.disabled = true;
        button.textContent = "Logging in...";

        message.textContent = "";
        message.className = "";

        try {
            const response = await fetch(AUTH_API, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            sessionStorage.setItem(
                "shopease_admin_token",
                data.token
            );

            sessionStorage.setItem(
                "shopease_admin",
                JSON.stringify(data.admin)
            );

            window.location.hash =
                "#/admin/dashboard";

        } catch (error) {
            console.error(
                "Admin login error:",
                error
            );

            message.textContent =
                error.message ||
                "Unable to login.";

            message.className =
                "login-error";

            button.disabled = false;
            button.textContent = "Login";
        }
    });
}
```
