const mongoose = require('mongoose');

const productSchema = mongoose.schema({
    name: { type: String, required: true },
    name: { type: Number, required: true },
    name: { type: Number, required: true },
});

module.exports = mongoose.model('Product', productSchema);
