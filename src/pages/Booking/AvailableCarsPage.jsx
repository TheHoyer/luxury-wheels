import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import CarCard from '../../components/CarCard/CarCard';
import allCarsData from '../../data/cars';
import styles from './AvailableCarsPage.module.css';
import { FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';

function AvailableCarsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [availableCarsDetails, setAvailableCarsDetails] = useState([]);
    const [selectedDates, setSelectedDates] = useState(null);

    useEffect(() => {
        if (!location.state || !location.state.availableCarIds || !location.state.dates) {
            navigate('/booking/select-dates');
            return;
        }

        const { availableCarIds, dates } = location.state;
        setSelectedDates(dates);

        const carDetails = allCarsData.filter(car =>
            availableCarIds.includes(car.id)
        );
        setAvailableCarsDetails(carDetails);

    }, [location.state, navigate]);

    const handleCarSelect = (carId) => {
        navigate('/booking/create', {
            state: {
                selectedCarId: carId,
                dates: selectedDates
            }
        });
    };

    const formatDate = (isoDateString) => {
        if (!isoDateString) return '';
        const date = new Date(isoDateString);
        return date.toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!selectedDates) {
        return (
            <div className={`container ${styles.pageContainer} ${styles.loadingContainer}`}>
                <p>Ładowanie danych...</p>
            </div>
        );
    }

    return (
        <div className={`container ${styles.pageContainer}`}>
            <Link to="/booking/select-dates" className={styles.backLink}>
                <FaArrowLeft /> Zmień Daty
            </Link>
            <h1 className={styles.pageTitle}>Wybierz Samochód</h1>
            {selectedDates && (
                <div className={styles.selectedDatesInfo}>
                    <FaCalendarAlt className={styles.calendarIcon} />
                    <span>
            Dostępne dla okresu: <strong>{formatDate(selectedDates.startDate)}</strong> - <strong>{formatDate(selectedDates.endDate)}</strong>
          </span>
                </div>
            )}

            {availableCarsDetails.length > 0 ? (
                <div className={styles.carsGrid}>
                    {availableCarsDetails.map(car => {
                        let pricePerDay;
                        if (car.pricing.hasMultipleOptions) {
                            pricePerDay = car.pricing.options?.withDeposit?.tiers?.[0]?.price;
                        } else {
                            pricePerDay = car.pricing?.tiers?.[0]?.price;
                        }
                        if (pricePerDay === undefined) pricePerDay = 0;

                        return (
                            <div key={car.id} className={styles.carCardWrapper} onClick={() => handleCarSelect(car.id)}>
                                <CarCard
                                    id={car.id}
                                    make={car.make}
                                    model={car.model}
                                    imageUrl={car.imageUrl}
                                    pricePerDay={pricePerDay}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className={styles.noCarsMessage}>
                    <p>Przepraszamy, brak dostępnych samochodów w wybranym terminie.</p>
                    <p>Spróbuj wybrać inny okres.</p>
                </div>
            )}
        </div>
    );
}

export default AvailableCarsPage;