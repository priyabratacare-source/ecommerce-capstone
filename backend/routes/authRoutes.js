import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();


router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({
                message:
                    "Email and password are required"
            });
        }


        const admin =
            await Admin.findOne({
                email: email.toLowerCase()
            });


        if (!admin) {

            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }


        const passwordMatch =
            await bcrypt.compare(
                password,
                admin.password
            );


        if (!passwordMatch) {

            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }


        const token =
            jwt.sign(
                {
                    id: admin._id.toString(),
                    email: admin.email,
                    role: admin.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                }
            );


        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        res.status(500).json({
            message: "Server error during login"
        });
    }
});


export default router;
