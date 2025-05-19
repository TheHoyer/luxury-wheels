const CarAvailability = require('../models/CarAvailability');
const Booking = require('../models/Booking');

const checkAvailability = (req, res) => {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Please provide startDate and endDate.' });
    }

    // Prosta walidacja formatu daty (można rozbudować np. o bibliotekę `date-fns` or `moment`)
    if (isNaN(new Date(startDate).getTime()) || isNaN(new Date(endDate).getTime())) {
        return res.status(400).json({ message: 'Invalid date format. Please use ISO 8601 format.' });
    }

    if (new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({ message: 'endDate must be after startDate.' });
    }

    try {
        const allCars = CarAvailability.getAll();
        const availableCars = [];

        for (const car of allCars) {
            if (car.isManuallyDisabled) {
                continue; // Pomiń ręcznie wyłączone auta
            }
            const overlappingBookings = Booking.findOverlappingBookings(car.carId, startDate, endDate);
            if (overlappingBookings.length === 0) {
                availableCars.push({ carId: car.carId, modelName: car.modelName });
            }
        }
        res.json({ availableCars });
    } catch (error) {
        console.error('Error checking car availability:', error);
        res.status(500).json({ message: 'Server error while checking availability.' });
    }
};

module.exports = {
    checkAvailability,
};