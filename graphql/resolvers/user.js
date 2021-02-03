const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET_KEY } = process.env;
const SALT = 10;
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
const userResolver = {
    RootQuery: {
        me: (parent, args, context, info) => {
            if (!context.user) throw new Error('Bạn chưa đăng nhập');
            return context.user;
        },
        users: (parent, args, context, info) => {
            const { filter = {} } = args;
            return User.find({ ...filter })
                .select(['-password', '-__v'])
                .sort({ userName: 1 })
                .exec();
        },
        user: async (parent, args, context, info) => {
            const { filter = {} } = args;
            const u = await User
                .findOne({ ...filter })
                .select('-password -__v')
                .exec();
            if (!u) {
                throw new Error('Không tìm thấy người dùng');
            }
            return u;
        }
    },
    RootMutation: {
        login: async (parent, args, context, info) => {
            const { userInput: { userName, password } } = args;
            const user = await User.findOne({ $or: [{ email: userName }, { userName: userName }] });
            if (!user || !user.comparePassword(password)) throw new Error("Tài khoản hoặc mật khẩu không đúng")
            const token = jwt.sign({ email: user.email, _id: user._id, permission: user.permission }, SECRET_KEY, { expiresIn: '7d' });
            const dateExpiration = new Date().addDays(7);
            return {
                userId: user._id,
                token,
                tokenExpiration: dateExpiration,
            };
        },
        register: async (parent, args, context, info) => {
            const { userInput: { name, userName, password, email } } = args;
            const user = new User();
            user.name = name;
            user.userName = userName;
            user.password = bcrypt.hashSync(password, SALT);
            user.email = email;
            await user.save();
            return user;
        },
        updateUser: async (parent, args, context, info) => {
            const { userInput = {}, _id } = args;
            if (!context.isAuthority) throw new Error("Bạn chưa đăng nhập");
            const me = context.user, user = await User.findById(_id);
            if (!user) throw new Error("Tài khoản này không tồn tại");
            if (!me.isAuthority(user.permission) && user._id != me._id)
                throw new Error("Bạn không có quyền chỉnh sửa tài khoản này");
            if (userInput.permission && !me.isAuthority(userInput.permission)) throw new Error("Bạn không đủ khả năng cấp quyền này!");
            const result = await User.findByIdAndUpdate(_id, { ...userInput }, { new: true });
            return result;
        },
        deleteUser: async (parent, args, context, info) => {
            if (!context.isAuthority) throw new Error("Bạn chưa đăng nhập")
            if (!context.user.isAuthority('moderator')) throw new Error("Bạn phải có quyền moderator");
            let id = args._id;
            const result = await User.deleteOne({ _id: id, permission: { $in: ['member'] } });
            const { n } = result;
            return { success: true, rowsDeleted: n };
        }

    }
}
module.exports = userResolver;