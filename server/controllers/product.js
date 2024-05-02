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
