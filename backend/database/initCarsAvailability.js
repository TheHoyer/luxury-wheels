const db = require('../config/db');
const CARS_DATA = require('../data/carsData'); // Zaimportuj dane z backend/data/carsData.js

function populateCarsAvailability() {
    if (!CARS_DATA || CARS_DATA.length === 0) {
        console.error('No car data found in backend/data/carsData.js');
        return;
    }

    console.log('Populating CarsAvailability table...');
    const insertStmt = db.prepare('INSERT OR IGNORE INTO CarsAvailability (carId, modelName) VALUES (?, ?)');

    let count = 0;
    for (const car of CARS_DATA) {
        if (car.id && car.model) {
            try {
                const info = insertStmt.run(car.id, `${car.make} ${car.model}`);
                if (info.changes > 0) {
                    count++;
                }
            } catch (error) {
                console.error(`Error inserting car ${car.id} (${car.model}):`, error.message);
            }
        } else {
            console.warn('Skipping car due to missing id or model:', car);
        }
    }

    if (count > 0) {
        console.log(`${count} new cars added to CarsAvailability table.`);
    } else {
        console.log('No new cars were added to CarsAvailability. Table might be up to date.');
    }
    console.log('CarsAvailability table population attempt finished.');
}

// Uruchom skrypt bezpośrednio, aby wypełnić tabelę
if (require.main === module) {
    try {
        populateCarsAvailability();
    } catch (error) {
        console.error('Failed to populate CarsAvailability table:', error);
    } finally {
        if (db && db.open) {
            db.close();
            console.log('Database connection closed after populating CarsAvailability.');
        }
    }
}

module.exports = populateCarsAvailability;