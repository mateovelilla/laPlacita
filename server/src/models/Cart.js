const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    userId: {
        type: String
    },
    productId: {
        type: String
    },
    qty: {
        type: Number
    }
})
module.exports = Cart = mongoose.model('carts', CartSchema);