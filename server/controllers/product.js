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

exports.readProduct = (req, res) => {
    Product.findOne({ _id: req.params.id })
        .then((product) => res.status(200).json({ product }))
        .catch((error) => res.status(400).json({ error }));
};

exports.updateProduct = (req, res) => {
    Product.updateOne(
        { _id: req.params.id },
        {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
        },
        { runValidators: true }
    )
        .then(() => res.status(200).json({ message: 'Produit modifié' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Produit supprimé' }))
        .catch((error) => res.status(400).json({ error }));
};
