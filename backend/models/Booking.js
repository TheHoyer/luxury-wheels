const db = require('../config/db');

class Booking {
    static create(data) {
        const { carId, customerName, customerEmail, customerPhone, startDate, endDate, totalPrice, status = 'pending' } = data;
        const stmt = db.prepare(`
      INSERT INTO Bookings (carId, customerName, customerEmail, customerPhone, startDate, endDate, totalPrice, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
        const info = stmt.run(carId, customerName, customerEmail, customerPhone, startDate, endDate, totalPrice, status);
        return info.lastInsertRowid; // Zwraca ID nowej rezerwacji
    }

    static findById(bookingId) {
        const stmt = db.prepare('SELECT * FROM Bookings WHERE bookingId = ?');
        return stmt.get(bookingId);
    }

    static findAll() {
        const stmt = db.prepare('SELECT b.*, ca.modelName FROM Bookings b JOIN CarsAvailability ca ON b.carId = ca.carId ORDER BY b.startDate DESC');
        return stmt.all();
    }

    static updateStatus(bookingId, status) {
        const stmt = db.prepare('UPDATE Bookings SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE bookingId = ?');
        const info = stmt.run(status, bookingId);
        return info.changes > 0;
    }

    static findOverlappingBookings(carId, startDate, endDate) {
        const stmt = db.prepare(`
      SELECT bookingId FROM Bookings
      WHERE carId = ? 
      AND status = 'confirmed'
      AND (
        (startDate < ? AND endDate > ?) OR -- Rezerwacja obejmuje cały okres
        (startDate >= ? AND startDate < ?) OR -- Rezerwacja zaczyna się w okresie
        (endDate > ? AND endDate <= ?) -- Rezerwacja kończy się w okresie
      )
    `);
        // Uwaga: SQLite przechowuje DATETIME jako TEXT lub REAL lub INTEGER. Porównania powinny działać poprawnie,
        // jeśli daty są w formacie ISO 8601 (YYYY-MM-DD HH:MM:SS), który jest sortowalny jako tekst.
        return stmt.all(carId, endDate, startDate, startDate, endDate, startDate, endDate);
    }
}

module.exports = Booking;