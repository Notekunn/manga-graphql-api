const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuthority = false;
        return next();
    }
    const [, token] = authHeader.split(' ');
    if (!token || token == '') {
        req.isAuthority = false;
        return next();
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        if (!decodedToken) throw new Error();
        const { _id } = decodedToken;
        if (!_id) throw new Error();
        req.isAuthority = true;
        req.user = await User.findById(_id).exec();
        next();
    } catch (error) {
        req.isAuthority = false;
        return next();
    }
}