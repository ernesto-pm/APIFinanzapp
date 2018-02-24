const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const Category = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        type: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
);


module.exports = mongoose.model('Category', Category);