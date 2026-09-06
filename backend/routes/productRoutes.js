import express from "express";
import Product from "../models/Product.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", async (req, res) => {

    try {

        const products =
            await Product.find()
                .sort({
                    createdAt: -1
                });

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message:
                "Failed to load products"
        });
    }
});


router.get("/:id", async (req, res) => {

    try {

        const product =
            await Product.findById(
                req.params.id
            );

        if (!product) {

            return res.status(404).json({
                message:
                    "Product not found"
            });
        }

        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({
            message:
                "Failed to load product"
        });
    }
});


router.post(
    "/",
    protect,
    async (req, res) => {

        try {

            const product =
                await Product.create(
                    req.body
                );

            res.status(201).json(product);

        } catch (error) {

            res.status(400).json({
                message:
                    "Failed to create product",
                error:
                    error.message
            });
        }
    }
);


router.put(
    "/:id",
    protect,
    async (req, res) => {

        try {

            const product =
                await Product.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                        runValidators: true
                    }
                );

            if (!product) {

                return res.status(404).json({
                    message:
                        "Product not found"
                });
            }

            res.status(200).json(product);

        } catch (error) {

            res.status(400).json({
                message:
                    "Failed to update product",
                error:
                    error.message
            });
        }
    }
);


router.delete(
    "/:id",
    protect,
    async (req, res) => {

        try {

            const product =
                await Product.findByIdAndDelete(
                    req.params.id
                );

            if (!product) {

                return res.status(404).json({
                    message:
                        "Product not found"
                });
            }

            res.status(200).json({
                message:
                    "Product deleted successfully"
            });

        } catch (error) {

            res.status(500).json({
                message:
                    "Failed to delete product"
            });
        }
    }
);


export default router;
