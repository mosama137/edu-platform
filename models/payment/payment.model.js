const mongoose = require('mongoose');
const Schema = mongoose.Schema
// Define Payment Schema
const paymentSchema = new Schema({
    levels: [{
        level: {
            type: Number,
            enum: [1, 2, 3, 4],
            required: true,
            unique: true
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    methods: [{
        name: { type: String },
        account: { type: String }
    }]
});

// Create Payment Model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;