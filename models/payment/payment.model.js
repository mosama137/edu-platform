const mongoose = require('mongoose');
const Schema = mongoose.Schema
// Define Payment Schema
const paymentSchema = new Schema({
    level: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
        unique: true // Assuming each level has a unique payment configuration
    },
    amount: {
        type: Number,
        required: true
    },
    vodafoneCash: {
        type: String,

    },
    instaPay: {
        type: String,

    }

});

// Create Payment Model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;