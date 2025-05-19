const db = require('../config/db');
const bcrypt = require('bcryptjs');

class Admin {
    static findByUsername(username) {
        const stmt = db.prepare('SELECT * FROM Admins WHERE username = ?');
        return stmt.get(username);
    }

    static verifyPassword(plainPassword, hashedPassword) {
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }
}

module.exports = Admin;