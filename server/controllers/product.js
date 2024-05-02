const Product = require('../models/Product');

exports.createProduct = (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
    });

    product
        .save()
        .then(() => res.status(201).json({ message: 'Produit créé' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.readProducts = (req, res) => {
    Product.find()
        .then((products) => res.status(200).json({ products: products }))
        .catch((error) => res.status(400).json({ error }));
};
