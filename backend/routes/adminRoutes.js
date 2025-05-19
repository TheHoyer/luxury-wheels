const express = require('express');
const router = express.Router();
const { loginAdmin, getAdminProfile } = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/profile', protectAdmin, getAdminProfile); // Przykładowa chroniona ścieżka

module.exports = router;