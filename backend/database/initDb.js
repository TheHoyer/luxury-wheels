const db = require('../config/db');
const bcrypt = require('bcryptjs');

function initDatabase() {
    try {
        console.log('Initializing database schema...');

        db.exec(`
      CREATE TABLE IF NOT EXISTS Admins (
        adminId INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        passwordHash TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS CarsAvailability (
        carId INTEGER PRIMARY KEY,
        modelName TEXT NOT NULL,
        isManuallyDisabled BOOLEAN DEFAULT 0, -- 0 for false, 1 for true
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS Bookings (
        bookingId INTEGER PRIMARY KEY AUTOINCREMENT,
        carId INTEGER NOT NULL,
        customerName TEXT NOT NULL,
        customerEmail TEXT NOT NULL,
        customerPhone TEXT NOT NULL,
        startDate DATETIME NOT NULL,
        endDate DATETIME NOT NULL,
        totalPrice REAL NOT NULL,
        status TEXT NOT NULL CHECK(status IN ('pending', 'confirmed', 'rejected', 'completed', 'cancelled_by_user', 'cancelled_by_admin')),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (carId) REFERENCES CarsAvailability (carId)
      );

      CREATE TRIGGER IF NOT EXISTS bookings_updated_at
      AFTER UPDATE ON Bookings
      FOR EACH ROW
      BEGIN
          UPDATE Bookings SET updatedAt = CURRENT_TIMESTAMP WHERE bookingId = OLD.bookingId;
      END;
    `);

        console.log('Database schema initialized.');

        // Add default admin if not exists
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword';

        const existingAdmin = db.prepare('SELECT * FROM Admins WHERE username = ?').get(adminUsername);

        if (!existingAdmin) {
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(adminPassword, salt);
            db.prepare('INSERT INTO Admins (username, passwordHash) VALUES (?, ?)')
                .run(adminUsername, passwordHash);
            console.log(`Default admin user '${adminUsername}' created.`);
        } else {
            console.log(`Admin user '${adminUsername}' already exists.`);
        }

    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        db.close();
        console.log('Database connection closed.');
    }
}

initDatabase();