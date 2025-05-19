const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "2525"),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    // secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
});

const sendBookingStatusEmail = async (booking) => {
    // Placeholder - pełna implementacja później
    console.log(`Simulating email send for booking ${booking.bookingId} to ${booking.customerEmail} with status ${booking.status}`);
    // const carDetails = await CarData.findById(booking.carId); // Potrzebowalibyśmy danych auta z carsData.js
    // const mailOptions = {
    //   from: process.env.EMAIL_FROM,
    //   to: booking.customerEmail,
    //   subject: `Your Luxury Wheels Booking Status: ${booking.status.toUpperCase()}`,
    //   html: `<p>Dear ${booking.customerName},</p>
    //          <p>The status of your booking for ${carDetails.modelName} from ${booking.startDate} to ${booking.endDate} has been updated to: <strong>${booking.status.toUpperCase()}</strong>.</p>
    //          <p>Thank you for choosing Luxury Wheels.</p>`,
    // };
    // await transporter.sendMail(mailOptions);
    return Promise.resolve();
};

module.exports = {
    sendBookingStatusEmail,
};