const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const crypto    = require('crypto');

const User = new Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        hash: {
            type: String
        },
        salt: {
            type: String
        }
    }, {
        timestamps: true
    }
);

User.methods.setPassword = function(password){
    if(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    }
};

User.methods.validPassword = function(password){
    let hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
    return this.hash === hash;
};

module.exports = mongoose.model('User', User);