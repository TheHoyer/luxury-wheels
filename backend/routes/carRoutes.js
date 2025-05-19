const express = require('express');
const router = express.Router();
const { checkAvailability } = require('../controllers/carController');

router.post('/check-availability', checkAvailability);

module.exports = router;