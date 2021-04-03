const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
})

userSchema.methods.passwordEncoding = password => {
    return bcrypt.hashSync(password.password);;
};

userSchema.methods.comparePassword = async (password, encoded) => {
    return bcrypt.compareSync(password, encoded);
}

const User = mongoose.model('User', userSchema);
module.exports = { User }