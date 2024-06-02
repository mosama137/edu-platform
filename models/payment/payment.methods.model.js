const mongoose = require('mongoose');
const Schema = mongoose.Schema
// Define Payment Schema
const paymentMethodsSchema = new Schema({
    name: {
        type: String,
        unique: true, // Ensure uniqueness for the name field
        required: true,
        lowercase: true
    },
    account: {
        type: String,
        required: true
    }

});

// Create Payment Model
const PaymentMethods = mongoose.model('Payment Methods', paymentMethodsSchema);

module.exports = PaymentMethods;