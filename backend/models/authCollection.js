const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'NAME FIELD CANNOT BE LEFT BLANK.'],
        minlength: [5, 'YOUR NAME SHOULD CONTAIN AT LEAST 5 CHARACTERS.']
    },
    email: {
        type: String,
        required: [true, 'EMAIL FIELD CANNOT BE LEFT BLANK.'],
        unique: true,
        validate: [validator.isEmail, 'YOUR EMAIL IS NOT VALID.']
    },
    password: {
        type: String,
        required: [true, 'PASSWORD FIELD CANNOT BE LEFT BLANK.'],
        minlength: [5, 'ENSURE YOUR PASSWORD HAS A MINIMUM LENGTH OF 5 CHARACTERS.'],
        select: false
    },
    role: {
        type: String,
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema);