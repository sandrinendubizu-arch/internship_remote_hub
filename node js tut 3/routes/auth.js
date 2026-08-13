const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

router.post('/', (req, res, next) => {
    console.log('auth route');
    next();
}, authController.handleLogin);

module.exports = router;