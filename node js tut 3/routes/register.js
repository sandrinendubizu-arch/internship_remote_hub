const express = require('express');
const router = express.Router();
const path = require('path');
const registerController = require('../controllers/registercontroller');

// GET route - Serve registration HTML file
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/register.html'));
});

// POST route - Handle registration
router.post('/', registerController.handleNewUser);

module.exports = router;