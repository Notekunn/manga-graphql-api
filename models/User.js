const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: emailRegex,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: String,
    permission: {
        type: String,
        enum: [
            'admin',
            'moderator',
            'translator',
            'member'
        ],
        default: 'member'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
UserSchema.methods.isAuthority = function (permission) {
    const permissionLevel = {
        admin: 0,
        moderator: 1,
        translator: 2,
        member: 3
    }
    const tLevel = permissionLevel[this.permission], needLevel = permissionLevel[permission];
    if (!tLevel || !needLevel) return false;
    return tLevel <= needLevel;
}
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', UserSchema)