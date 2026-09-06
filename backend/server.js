import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import productRoutes
    from "./routes/productRoutes.js";


/* ================================
   ENVIRONMENT
================================ */

dotenv.config();


/* ================================
   EXPRESS APP
================================ */

const app = express();


/* ================================
   DATABASE
================================ */

connectDB();


/* ================================
   MIDDLEWARE
================================ */

app.use(
    cors({
        origin:
            process.env.FRONTEND_URL ||
            "*"
    })
);

app.use(
    express.json()
);


/* ================================
   HEALTH CHECK
================================ */

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message:
            "ShopEase API is running"
    });

});


/* ================================
   PRODUCT API
================================ */

app.use(
    "/api/products",
    productRoutes
);


/* ================================
   404
================================ */

app.use((req, res) => {

    res.status(404).json({
        message:
            "API route not found"
    });

});


/* ================================
   SERVER
================================ */

const PORT =
    process.env.PORT || 5000;


app.listen(
    PORT,
    () => {

        console.log(
            `ShopEase API running on port ${PORT}`
        );

    }
);
