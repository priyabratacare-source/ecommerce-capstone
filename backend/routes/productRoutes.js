import express from "express";
import Product from "../models/Product.js";

const router = express.Router();


/* ================================
   GET ALL PRODUCTS
================================ */

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


/* ================================
   GET SINGLE PRODUCT
================================ */

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


/* ================================
   CREATE PRODUCT
================================ */

router.post("/", async (req, res) => {

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

});


/* ================================
   UPDATE PRODUCT
================================ */

router.put("/:id", async (req, res) => {

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

});


/* ================================
   DELETE PRODUCT
================================ */

router.delete("/:id", async (req, res) => {

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

});


export default router;
