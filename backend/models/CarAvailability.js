const db = require('../config/db');

class CarAvailability {
    static getAll() {
        const stmt = db.prepare('SELECT carId, modelName, isManuallyDisabled FROM CarsAvailability');
        return stmt.all();
    }

    static findById(carId) {
        const stmt = db.prepare('SELECT carId, modelName, isManuallyDisabled FROM CarsAvailability WHERE carId = ?');
        return stmt.get(carId);
    }

    // Można dodać metody do ręcznego wyłączania/włączania auta, jeśli potrzebne
    // static setManualAvailability(carId, isDisabled) {
    //   const stmt = db.prepare('UPDATE CarsAvailability SET isManuallyDisabled = ? WHERE carId = ?');
    //   return stmt.run(isDisabled ? 1 : 0, carId);
    // }
}

module.exports = CarAvailability;