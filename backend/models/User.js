/**
 * User Model
 */

// Dependencies
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secrets: { jwtSecret } } = require('../config');

// User Schema
const userSchema = new Schema({
    name: {
        first: {
            type: String,
            required: true,
        },
        middle: String,
        last: {
            type: String,
            required: true,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: String,
    password: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
    },
    avatar: String,
    role: {
        type: String,
        enum: ['Admin', 'AICTE Admin', 'Committee Head', 'Committee Member']
    },
    committee: {
        type: String,
    },
    meta: {
        lastLogin: {
            type: Date,
            default: Date.now(),
        },
        verification: {
            isVerified: {
                type: Boolean,
                default: false,
            },
            verifiedAt: Date,
        }
    }
}, {
    timestamps: true,
});

userSchema.virtual('authToken').get(function(){
    return jwt.sign({_id: this._id.toString()}, jwtSecret, {expiresIn: '1d'});
});

userSchema.virtual('fullName').get(function(){
    return `${this.name.first}${this.name.middle ? ` ${this.name.middle} ` : ' '}${this.name.last}`
})

// Schema Methods and Statics

// Hash User Password
userSchema.methods.generateHashedPassword = async function () {
    const SALT = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, SALT);
};

// Create a default avatar
userSchema.methods.generateDefaultAvatar = async function () {
    const userInitials = this.name.first[0] + this.name.last[0];
    this.avatar = `https://avatars.dicebear.com/api/initials/${userInitials}.svg`;
};

// Authenticate a given password with the users password
userSchema.methods.authenticatePassword = async function (password) {
    const isUserPassword = await bcrypt.compare(password, this.password);
    return isUserPassword;
}

// Sanitize and Return a user
userSchema.methods.sanitizeAndReturnUser = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

// Schema Hooks
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        await this.generateHashedPassword();
    };
    if (this.isNew) {
        await this.generateDefaultAvatar();
    }
    next();
});

// User Model
const User = model('User', userSchema);

// Exporting User Model
module.exports = User;