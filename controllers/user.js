const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET_KEY } = process.env;
const SALT = 10;
exports.getAll = async function () {
    const users = await User.find({}).select(['-password', '-__v']).sort({ createdAt: 1 }).exec();
    return users;
}
exports.get = async function (args) {
    const user = await User.findById(args._id).select('-password -__v').exec();
    if (!user) {
        throw new Error('Không tìm thấy người dùng');
    }
    return user;
}
exports.create = async function (args) {

    const { name, userName, password, email } = args;
    const user = new User();
    user.name = name;
    user.userName = userName;
    user.password = bcrypt.hashSync(password, SALT);
    user.email = email;
    await user.save();
    return user;
}
exports.delete = async function (args) {
    let id = args._id;
    const result = await User.remove({ _id: id });
    return result;
}

exports.signIn = async function (args) {
    const { email, password } = args;
    const user = await User.findOne({ $or: [{ email: email }, { userName: email }] });
    if (!user || !user.comparePassword(password)) throw new Error("Tài khoản hoặc mật khẩu không đúng")
    return res.json({
        token: jwt.sign({ email: user.email, _id: user._id }, SECRET_KEY, { expiresIn: '7ds' })
    });

}