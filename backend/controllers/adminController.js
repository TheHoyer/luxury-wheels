const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const loginAdmin = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide username and password' });
    }

    try {
        const admin = Admin.findByUsername(username);

        if (admin && Admin.verifyPassword(password, admin.passwordHash)) {
            const token = jwt.sign({ id: admin.adminId, username: admin.username }, process.env.JWT_SECRET, {
                expiresIn: '1d', // Token ważny 1 dzień
            });
            res.json({
                message: 'Login successful',
                token,
                admin: {
                    id: admin.adminId,
                    username: admin.username,
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// Dummy endpoint do testowania ochrony
const getAdminProfile = (req, res) => {
    // Tutaj można by pobrać pełne dane admina, jeśli byłyby potrzebne
    // req.adminId jest dostępne z middleware
    res.json({ message: "Welcome to admin profile", adminId: req.adminId });
};


module.exports = {
    loginAdmin,
    getAdminProfile,
};