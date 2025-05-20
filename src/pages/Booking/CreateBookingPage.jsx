import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import allCarsData from '../../data/cars';
import { calculateTotalPrice } from '../../utils/pricingUtils'; // POPRAWIONY IMPORT
import styles from './CreateBookingPage.module.css';
import { toast } from 'react-toastify';
import { FaCar, FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaMoneyBillWave } from 'react-icons/fa';

const bookingSchema = z.object({
    customerName: z.string().min(3, { message: "Imię i nazwisko musi mieć co najmniej 3 znaki." }),
    customerEmail: z.string().email({ message: "Podaj poprawny adres e-mail." }),
    customerPhone: z.string().regex(/^\+?[0-9\s-]{7,15}$/, { message: "Podaj poprawny numer telefonu." }),
});

function CreateBookingPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedCar, setSelectedCar] = useState(null);
    const [bookingDates, setBookingDates] = useState(null);
    const [calculatedPriceInfo, setCalculatedPriceInfo] = useState({ price: 0, days: 0, perDayRate: 0, error: null });
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(bookingSchema),
    });

    useEffect(() => {
        if (!location.state || !location.state.selectedCarId || !location.state.dates) {
            toast.error("Brak danych do rezerwacji. Proszę wybrać auto i daty.");
            navigate('/booking/select-dates');
            return;
        }

        const { selectedCarId, dates } = location.state;
        const carDetail = allCarsData.find(car => car.id === parseInt(selectedCarId));

        if (!carDetail) {
            toast.error("Nie znaleziono wybranego samochodu.");
            navigate('/booking/available-cars', { state: { availableCarIds: [], dates: dates } });
            return;
        }

        setSelectedCar(carDetail);
        setBookingDates(dates);

        const priceInfo = calculateTotalPrice(selectedCarId, dates.startDate, dates.endDate);
        setCalculatedPriceInfo(priceInfo);
        if (priceInfo.error) {
            toast.error(priceInfo.error);
        }

    }, [location.state, navigate]);

    const onSubmit = async (formData) => {
        if (!selectedCar || !bookingDates || calculatedPriceInfo.error || calculatedPriceInfo.price <= 0) {
            toast.error("Wystąpił błąd z danymi rezerwacji lub ceną. Spróbuj ponownie.");
            return;
        }
        setIsLoading(true);
        try {
            const bookingPayload = {
                carId: selectedCar.id,
                customerName: formData.customerName,
                customerEmail: formData.customerEmail,
                customerPhone: formData.customerPhone,
                startDate: bookingDates.startDate,
                endDate: bookingDates.endDate,
                totalPrice: calculatedPriceInfo.price,
            };

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingPayload),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Nie udało się złożyć rezerwacji.');
            }

            toast.success('Rezerwacja została złożona! Oczekuj na potwierdzenie.');
            navigate('/');

        } catch (error) {
            console.error("Błąd składania rezerwacji:", error);
            toast.error(error.message || "Wystąpił błąd serwera. Spróbuj ponownie.");
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (isoDateString) => {
        if (!isoDateString) return '';
        const date = new Date(isoDateString);
        return date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    if (!selectedCar || !bookingDates) {
        return <div className={`container ${styles.pageContainer} ${styles.loadingState}`}>Ładowanie danych rezerwacji...</div>;
    }

    return (
        <div className={`container ${styles.pageContainer}`}>
            <div className={styles.breadcrumb}>
                <Link to="/booking/select-dates">Wybór Dat</Link> >
                <Link
                    to="/booking/available-cars"
                    state={location.state}
                >
                    Wybór Auta
                </Link> >
                <span>Formularz</span>
            </div>
            <h1 className={styles.pageTitle}>Potwierdź Rezerwację</h1>

            <div className={styles.bookingSummary}>
                <div className={styles.summarySection}>
                    <h2 className={styles.summaryTitle}><FaCar /> Wybrany Samochód</h2>
                    <p className={styles.summaryText}><strong>{selectedCar.make} {selectedCar.model}</strong></p>
                    <img src={selectedCar.imageUrl} alt={`${selectedCar.make} ${selectedCar.model}`} className={styles.carImage}/>
                </div>
                <div className={styles.summarySection}>
                    <h2 className={styles.summaryTitle}><FaCalendarAlt /> Okres Wynajmu</h2>
                    <p className={styles.summaryText}>Od: <strong>{formatDate(bookingDates.startDate)}</strong></p>
                    <p className={styles.summaryText}>Do: <strong>{formatDate(bookingDates.endDate)}</strong></p>
                    <p className={styles.summaryText}>Liczba dni: <strong>{calculatedPriceInfo.days}</strong></p>
                </div>
                <div className={styles.summarySection}>
                    <h2 className={styles.summaryTitle}><FaMoneyBillWave /> Szacowany Koszt</h2>
                    {calculatedPriceInfo.error ? (
                        <p className={`${styles.summaryText} ${styles.priceError}`}>{calculatedPriceInfo.error}</p>
                    ) : (
                        <>
                            <p className={styles.summaryText}>Cena za dobę: <strong>{calculatedPriceInfo.perDayRate ? calculatedPriceInfo.perDayRate.toLocaleString('pl-PL') : 'N/A'} zł</strong></p>
                            <p className={styles.totalPrice}>Całkowity koszt: <strong>{calculatedPriceInfo.price.toLocaleString('pl-PL')} zł</strong></p>
                            <p className={styles.vatInfo}>(Cena zawiera VAT 23%)</p>
                        </>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.bookingForm}>
                <h2 className={styles.formSectionTitle}>Dane Kontaktowe</h2>
                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <label htmlFor="customerName"><FaUser /> Imię i Nazwisko</label>
                        <input type="text" id="customerName" {...register("customerName")} className={errors.customerName ? styles.inputError : ''} />
                        {errors.customerName && <p className={styles.errorMessage}>{errors.customerName.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="customerEmail"><FaEnvelope /> Adres E-mail</label>
                        <input type="email" id="customerEmail" {...register("customerEmail")} className={errors.customerEmail ? styles.inputError : ''} />
                        {errors.customerEmail && <p className={styles.errorMessage}>{errors.customerEmail.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="customerPhone"><FaPhone /> Numer Telefonu</label>
                        <input type="tel" id="customerPhone" {...register("customerPhone")} className={errors.customerPhone ? styles.inputError : ''} />
                        {errors.customerPhone && <p className={styles.errorMessage}>{errors.customerPhone.message}</p>}
                    </div>
                </div>

                <button type="submit" className={styles.submitButton} disabled={isLoading || !!calculatedPriceInfo.error || calculatedPriceInfo.price <= 0}>
                    {isLoading ? <span className={styles.spinner}></span> : 'Złóż Rezerwację'}
                </button>
            </form>
        </div>
    );
}

export default CreateBookingPage;