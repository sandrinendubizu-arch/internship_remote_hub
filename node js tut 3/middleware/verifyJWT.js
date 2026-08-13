const jwt = require('jsonwebtoken');
require('dotenv').config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'dev-access-secret';

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const token = tokenFromHeader || req.headers['x-access-token'] || req.headers['access-token'] || req.body?.token || req.query?.token;

    if (!token) {
        req.user = 'anonymous';
        return next();
    }

    console.log('authHeader', authHeader);
    jwt.verify(
        token,
        accessTokenSecret,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Forbidden
            req.user = decoded.username;
            next();
        }
    );
};

module.exports = verifyJWT;
