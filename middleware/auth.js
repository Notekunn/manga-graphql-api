const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
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
        const { _id, email, permission } = decodedToken;
        if (!_id) throw new Error();
        req.isAuthority = true;
        req.user = { _id, email, permission };
        next();
    } catch (error) {
        req.isAuthority = false;
        return next();
    }
}