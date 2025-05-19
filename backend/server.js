require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const path = require('path'); // Niepotrzebne jeśli nie serwujemy statycznych plików z backendu
const db = require('./config/db');

const adminRoutes = require('./routes/adminRoutes');
const carRoutes = require('./routes/carRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

app.use(cors()); // Możesz skonfigurować bardziej restrykcyjnie: app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', adminRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something broke on the server!', error: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});