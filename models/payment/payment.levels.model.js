const mongoose = require('mongoose');
const Schema = mongoose.Schema
// Define Payment Schema
const paymentLevelsSchema = new Schema({
    level: {
        type: Number,
        unique: true, // Ensure uniqueness for the level field
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

// Create Payment Model
const PaymentLevels = mongoose.model('Payment Level', paymentLevelsSchema);

module.exports = PaymentLevels;