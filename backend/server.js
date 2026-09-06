import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import { connectDB } from "./config/db.js";
import Admin from "./models/Admin.js";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();


const app = express();


app.use(
    cors({
        origin:
            process.env.FRONTEND_URL
    })
);


app.use(express.json());


app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message:
            "ShopEase API is running"
    });

});


app.use(
    "/api/products",
    productRoutes
);


app.use(
    "/api/auth",
    authRoutes
);


app.use((req, res) => {

    res.status(404).json({
        message:
            "API route not found"
    });

});


const PORT =
    process.env.PORT || 5000;


async function startServer() {

    try {

        await connectDB();


        const existingAdmin =
            await Admin.findOne({
                email:
                    process.env.ADMIN_EMAIL
            });


        if (!existingAdmin) {

            const hashedPassword =
                await bcrypt.hash(
                    process.env.ADMIN_PASSWORD,
                    12
                );


            await Admin.create({
                name:
                    process.env.ADMIN_NAME ||
                    "ShopEase Administrator",

                email:
                    process.env.ADMIN_EMAIL,

                password:
                    hashedPassword,

                role: "admin"
            });


            console.log(
                "Initial admin account created"
            );

        } else {

            console.log(
                "Admin account already exists"
            );
        }


        app.listen(
            PORT,
            () => {

                console.log(
                    `ShopEase API running on port ${PORT}`
                );

            }
        );

    } catch (error) {

        console.error(
            "Server startup failed:",
            error
        );

        process.exit(1);
    }
}


startServer();
