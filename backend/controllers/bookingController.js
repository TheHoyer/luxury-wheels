const Booking = require('../models/Booking');
const CarAvailability = require('../models/CarAvailability');
const { sendBookingStatusEmail } = require('../utils/emailService'); // Przygotowanie do wysyłki maili

const createBooking = (req, res) => {
    const { carId, customerName, customerEmail, customerPhone, startDate, endDate, totalPrice } = req.body;

    if (!carId || !customerName || !customerEmail || !customerPhone || !startDate || !endDate || totalPrice === undefined) {
        return res.status(400).json({ message: 'All fields are required, including totalPrice.' });
    }

    if (isNaN(new Date(startDate).getTime()) || isNaN(new Date(endDate).getTime())) {
        return res.status(400).json({ message: 'Invalid date format for startDate or endDate.' });
    }

    if (new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({ message: 'endDate must be after startDate.' });
    }

    if (parseFloat(totalPrice) < 0) {
        return res.status(400).json({ message: 'totalPrice cannot be negative.' });
    }

    try {
        const carExists = CarAvailability.findById(carId);
        if (!carExists || carExists.isManuallyDisabled) {
            return res.status(404).json({ message: 'Car not found or is currently unavailable.' });
        }

        // Serwerowe ponowne sprawdzenie dostępności
        const overlappingBookings = Booking.findOverlappingBookings(carId, startDate, endDate);
        if (overlappingBookings.length > 0) {
            return res.status(409).json({ message: 'Sorry, this car is no longer available for the selected dates.' });
        }

        const bookingData = {
            carId: parseInt(carId),
            customerName,
            customerEmail,
            customerPhone,
            startDate,
            endDate,
            totalPrice: parseFloat(totalPrice),
            status: 'pending',
        };

        const newBookingId = Booking.create(bookingData);
        const newBooking = Booking.findById(newBookingId);

        res.status(201).json({ message: 'Booking request received and is pending confirmation.', booking: newBooking });

    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Server error while creating booking.' });
    }
};

const getAllBookingsAdmin = (req, res) => {
    try {
        const bookings = Booking.findAll();
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching all bookings for admin:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateBookingStatusAdmin = async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!status || !['confirmed', 'rejected', 'completed', 'cancelled_by_admin'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status provided.' });
    }

    try {
        const booking = Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        // Jeśli potwierdzamy, a auto stało się w międzyczasie niedostępne przez inną potwierdzoną rezerwację,
        // to admin powinien to zobaczyć i podjąć decyzję. Tutaj uproszczenie - zakładamy, że admin wie co robi.
        // Dla bardziej zaawansowanego systemu, można by tu dodać ponowną weryfikację.

        const updated = Booking.updateStatus(bookingId, status);
        if (updated) {
            const updatedBooking = Booking.findById(bookingId);

            // Wysłanie emaila - zaimplementujemy w utils/emailService.js później
                if (status === 'confirmed' || status === 'rejected') {
                  try {
                    await sendBookingStatusEmail(updatedBooking);
                  } catch (emailError) {
                    console.error(`Failed to send status email for booking ${bookingId}:`, emailError);
                    // Nie blokujemy odpowiedzi, ale logujemy błąd
                  }
                }

            res.json({ message: `Booking status updated to ${status}.`, booking: updatedBooking });
        } else {
            res.status(500).json({ message: 'Failed to update booking status.' });
        }
    } catch (error) {
        console.error(`Error updating booking ${bookingId} status:`, error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    createBooking,
    getAllBookingsAdmin,
    updateBookingStatusAdmin,
};