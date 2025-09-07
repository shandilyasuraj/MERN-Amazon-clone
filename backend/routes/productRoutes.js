const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            brand: req.body.brand,
            category: req.body.category,
            price: req.body.price,
            countInStock: req.body.countInStock,
            rating: req.body.rating || 0,
            numReviews: req.body.numReviews || 0
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;