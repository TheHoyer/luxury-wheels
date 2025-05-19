const express = require('express');
const router = express.Router();
const { createBooking, getAllBookingsAdmin, updateBookingStatusAdmin } = require('../controllers/bookingController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Publiczna - tworzenie nowej rezerwacji przez klienta
router.post('/', createBooking);

// Admin - pobieranie wszystkich rezerwacji
router.get('/admin', protectAdmin, getAllBookingsAdmin);

// Admin - aktualizacja statusu rezerwacji
router.put('/admin/:bookingId/status', protectAdmin, updateBookingStatusAdmin);

module.exports = router;