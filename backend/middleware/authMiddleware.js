const jwt = require('jsonwebtoken');

const protectAdmin = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Można by tu dołączyć zdekodowanego użytkownika do req, jeśli potrzebne w controllerach
            // req.admin = Admin.findById(decoded.id); // wymagałoby to dodania id do tokenu i metody findById
            req.adminId = decoded.id; // Zakładając, że token zawiera 'id' admina
            next();
        } catch (error) {
            console.error('Token verification failed:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protectAdmin };