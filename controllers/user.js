const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET_KEY } = process.env;
const SALT = 10;
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
exports.users = async function ({ filter = {} }, req) {
    return await User.find({ ...filter })
        .select(['-password', '-__v'])
        .sort({ userName: 1 })
        .exec();
}
exports.user = async function ({ filter = {} }) {
    const u = await User
        .findOne({ ...filter })
        .select('-password -__v')
        .exec();
    if (!u) {
        throw new Error('Không tìm thấy người dùng');
    }
    return u;
}
exports.me = async function (args, req) {
    if (!req.user) throw new Error('Bạn chưa đăng nhập');
    return req.user;
}
exports.register = async function ({ userInput = {} }) {
    const { name, userName, password, email } = userInput;
    const user = new User();
    user.name = name;
    user.userName = userName;
    user.password = bcrypt.hashSync(password, SALT);
    user.email = email;
    await user.save();
    return user;
}
exports.deleteUser = async function (args, req) {
    if (!req.isAuthority) throw new Error("Bạn chưa đăng nhập")
    if (!req.user.isAuthority('moderator')) throw new Error("Bạn phải có quyền moderator");
    let id = args._id;
    const result = await User.deleteOne({ _id: id, permission: { $in: ['member'] } });
    const { n } = result;
    return { success: true, rowsDeleted: n };
}

exports.login = async function ({ userInput = {} }) {
    const { userName, password } = userInput;
    const user = await User.findOne({ $or: [{ email: userName }, { userName: userName }] });
    if (!user || !user.comparePassword(password)) throw new Error("Tài khoản hoặc mật khẩu không đúng")
    const token = jwt.sign({ email: user.email, _id: user._id, permission: user.permission }, SECRET_KEY, { expiresIn: '7d' });
    const dateExpiration = new Date().addDays(7);
    return {
        userId: user._id,
        token,
        tokenExpiration: dateExpiration,
    };
}