const usersDB = {
    users: require('../data/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');

const jwt= require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'dev-access-secret';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'dev-refresh-secret';

const handleLogin = async (req, res) => {
    console.log(req.body);
    console.log(req.headers);

    const { user, pwd, username, password } = req.body ||{};
    const loginUser = user || username;
    const loginPwd = pwd || password;

    if (!loginUser || !loginPwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = usersDB.users.find(person => person.username === loginUser);
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(loginPwd, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            accessTokenSecret,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            refreshTokenSecret,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ 'success': `User ${loginUser} is logged in!`, 'accessToken': accessToken, 'refreshToken': refreshToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };