const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const Transaction = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        category : {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true
        },
        day: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        concept : {
            type: String,
            required: false
        },
        is_expenditure : {
            type: Boolean,
            required: true
        }
    }, {
        timestamps: true
    }
);


module.exports = mongoose.model('Transaction', Transaction);