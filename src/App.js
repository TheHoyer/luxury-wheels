// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import FleetPage from './pages/FleetPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ContactPage from './pages/ContactPage';
import CarDetailPage from './pages/CarDetailPage';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SelectDatesPage from './pages/Booking/SelectDatesPage';
import AvailableCarsPage from './pages/Booking/AvailableCarsPage';
import CreateBookingPage from './pages/Booking/CreateBookingPage';
import AdminLoginPage from './pages/Admin/AdminLoginPage';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; // Zaktualizowany import


function App() {
    return (
        <Router>
            <ScrollToTop />
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/fleet" element={<FleetPage />} />
                    <Route path="/fleet/:carId" element={<CarDetailPage />} />
                    <Route path="/how-it-works" element={<HowItWorksPage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    <Route path="/booking/select-dates" element={<SelectDatesPage />} />
                    <Route path="/booking/available-cars" element={<AvailableCarsPage />} />
                    <Route path="/booking/create" element={<CreateBookingPage />} />

                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute>
                                <AdminDashboardPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
            <Footer />
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </Router>
    );
}
export default App;