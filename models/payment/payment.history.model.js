const mongoose = require('mongoose');
const Schema = mongoose.Schema

const paymentHistorySchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    level: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
        enum: ['vodafoneCash', 'instaPay'],
    },
    paid_from: {
        type: String,
        required: true
    },
    paid_to: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Paid", "Rejected", "Under Review"],
        default: 'Under Review'
    }
},
    { timestamps: true }

)

// Create Payment Model
const PaymentHistory = mongoose.model('Payment History', paymentHistorySchema);

module.exports = PaymentHistory;