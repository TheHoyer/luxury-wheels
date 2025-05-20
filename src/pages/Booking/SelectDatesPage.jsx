import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './SelectDatesPage.module.css';
import { toast } from 'react-toastify';

registerLocale('pl', pl);

function SelectDatesPage() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleAvailabilityCheck = async (event) => {
        event.preventDefault();
        if (!startDate || !endDate) {
            toast.error('Proszę wybrać datę początkową i końcową.');
            return;
        }
        if (startDate >= endDate) {
            toast.error('Data końcowa musi być późniejsza niż data początkowa.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cars/check-availability`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString()
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Błąd serwera przy sprawdzaniu dostępności.');
            }

            if (data.availableCars && data.availableCars.length > 0) {
                navigate('/booking/available-cars', {
                    state: {
                        availableCarIds: data.availableCars.map(car => car.carId),
                        dates: { startDate: startDate.toISOString(), endDate: endDate.toISOString() }
                    }
                });
            } else {
                toast.info('Brak dostępnych samochodów w wybranym terminie.');
            }
        } catch (error) {
            console.error('Błąd sprawdzania dostępności:', error);
            toast.error(error.message || 'Nie udało się sprawdzić dostępności. Spróbuj ponownie.');
        } finally {
            setIsLoading(false);
        }
    };

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);


    return (
        <div className={`container ${styles.selectDatesPageContainer}`}>
            <h1 className={styles.pageTitle}>Wybierz Daty Rezerwacji</h1>
            <p className={styles.pageSubtitle}>
                Wybierz preferowany okres wynajmu, aby sprawdzić, które z naszych luksusowych pojazdów są dostępne.
            </p>
            <form onSubmit={handleAvailabilityCheck} className={styles.dateForm}>
                <div className={styles.datePickerGroup}>
                    <div className={styles.datePickerWrapper}>
                        <label htmlFor="startDate" className={styles.dateLabel}>Data Odbioru</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            minDate={today}
                            dateFormat="dd/MM/yyyy HH:mm"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={60}
                            timeCaption="Godzina"
                            locale="pl"
                            placeholderText="Wybierz datę i godzinę"
                            className={styles.datePickerInput}
                            id="startDate"
                            autoComplete="off"
                        />
                    </div>
                    <div className={styles.datePickerWrapper}>
                        <label htmlFor="endDate" className={styles.dateLabel}>Data Zwrotu</label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate || tomorrow}
                            dateFormat="dd/MM/yyyy HH:mm"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={60}
                            timeCaption="Godzina"
                            locale="pl"
                            placeholderText="Wybierz datę i godzinę"
                            className={styles.datePickerInput}
                            id="endDate"
                            filterTime={(time) => {
                                if (startDate && endDate && startDate.toDateString() === endDate.toDateString()) {
                                    return new Date(time).getTime() > new Date(startDate).getTime();
                                }
                                return true;
                            }}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                    {isLoading ? <span className={styles.spinner}></span> : 'Sprawdź Dostępność'}
                </button>
            </form>
        </div>
    );
}

export default SelectDatesPage;