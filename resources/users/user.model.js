var mongoose = require('mongoose');
var userSchema = new mongoose.Schema(
    {
        name: {
            type: String
            // required: [true, 'Name is the required field ']
        },
        username: {
            type: String,
            required: [true, 'Username is the required field '],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'email is the required field '],
            unique: true,
            lowercase: true,
            trim: true
        },
        dateOfBirth: {
            type: Date
        },
        gender: {
            type: String,
            uppercase: true
        },
        password: {
            type: String,
            required: [true, 'Password is the required field ']
        },
        avatar: {
            type: String
        },
        stripeID: {
            type: String
        },
        // cart: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'course'
        // },
        // wishlist: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'course'
        // },
        coursesBought: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'course'
            }
        ]
    },
    { timestamps: true }
);
var User = mongoose.model('user', userSchema);
module.exports = User;
