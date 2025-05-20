import React, { useEffect, useState, useCallback } from 'react';
import styles from './AdminDashboardPage.module.css';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaCarCrash, FaUserClock, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const getStatusIconAndStyle = (status) => {
    switch (status) {
        case 'pending': return { icon: <FaHourglassHalf />, style: styles.statusPending, label: 'Oczekująca' };
        case 'confirmed': return { icon: <FaCheckCircle />, style: styles.statusConfirmed, label: 'Potwierdzona' };
        case 'rejected': return { icon: <FaTimesCircle />, style: styles.statusRejected, label: 'Odrzucona' };
        case 'completed': return { icon: <FaCheckCircle />, style: styles.statusCompleted, label: 'Zakończona' };
        case 'cancelled_by_admin': return { icon: <FaCarCrash />, style: styles.statusCancelledAdmin, label: 'Anul. (Admin)' };
        case 'cancelled_by_user': return { icon: <FaUserClock />, style: styles.statusCancelledUser, label: 'Anul. (Klient)' };
        default: return { icon: null, style: '', label: status };
    }
};

function AdminDashboardPage() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingBookingId, setEditingBookingId] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const navigate = useNavigate();

    const fetchBookings = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem('adminToken');
        if (!token) {
            toast.error("Brak autoryzacji. Proszę się zalogować.");
            navigate('/admin/login');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings/admin`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('adminToken');
                    toast.error("Sesja wygasła lub token jest nieprawidłowy. Proszę zalogować się ponownie.");
                    navigate('/admin/login');
                    return;
                }
                const errData = await response.json();
                throw new Error(errData.message || `HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setBookings(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (err) {
            console.error("Błąd pobierania rezerwacji:", err);
            setError(err.message);
            toast.error(`Nie udało się pobrać rezerwacji: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const handleUpdateStatus = async (bookingId, statusToUpdate) => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            toast.error("Brak autoryzacji.");
            navigate('/admin/login');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings/admin/${bookingId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status: statusToUpdate }),
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Nie udało się zaktualizować statusu.');
            }
            toast.success(`Status rezerwacji #${bookingId} zmieniony na ${statusToUpdate}.`);
            setEditingBookingId(null); // Zamknij tryb edycji
            fetchBookings(); // Odśwież listę
        } catch (err) {
            console.error("Błąd aktualizacji statusu:", err);
            toast.error(`Błąd: ${err.message}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        toast.info("Wylogowano pomyślnie.");
        navigate('/admin/login');
    };

    const formatDate = (isoDateString) => {
        if (!isoDateString) return 'N/A';
        return new Date(isoDateString).toLocaleString('pl-PL', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit'
        });
    };

    if (isLoading) {
        return <div className={styles.loading}>Ładowanie danych...</div>;
    }

    if (error) {
        return <div className={styles.error}>Wystąpił błąd: {error}</div>;
    }

    const availableStatuses = ['pending', 'confirmed', 'rejected', 'completed', 'cancelled_by_admin'];

    return (
        <div className={`container ${styles.adminDashboardPageContainer}`}>
            <div className={styles.headerActions}>
                <h1 className={styles.pageTitle}>Panel Zarządzania Rezerwacjami</h1>
                <button onClick={handleLogout} className={styles.logoutButton}><FaSignOutAlt /> Wyloguj</button>
            </div>

            {bookings.length === 0 ? (
                <p className={styles.noBookings}>Aktualnie brak rezerwacji.</p>
            ) : (
                <div className={styles.tableResponsive}>
                    <table className={styles.bookingsTable}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Samochód</th>
                            <th>Klient</th>
                            <th>Email</th>
                            <th>Telefon</th>
                            <th>Od</th>
                            <th>Do</th>
                            <th>Cena (PLN)</th>
                            <th>Status</th>
                            <th>Utworzono</th>
                            <th>Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookings.map(booking => {
                            const statusInfo = getStatusIconAndStyle(booking.status);
                            return (
                                <tr key={booking.bookingId}>
                                    <td>#{booking.bookingId}</td>
                                    <td>{booking.modelName || `ID: ${booking.carId}`}</td>
                                    <td>{booking.customerName}</td>
                                    <td>{booking.customerEmail}</td>
                                    <td>{booking.customerPhone}</td>
                                    <td>{formatDate(booking.startDate)}</td>
                                    <td>{formatDate(booking.endDate)}</td>
                                    <td>{booking.totalPrice.toLocaleString('pl-PL')}</td>
                                    <td>
                                            <span className={`${styles.statusBadge} ${statusInfo.style}`}>
                                                {statusInfo.icon} {statusInfo.label}
                                            </span>
                                    </td>
                                    <td>{formatDate(booking.createdAt)}</td>
                                    <td className={styles.actionsCell}>
                                        {editingBookingId === booking.bookingId ? (
                                            <div className={styles.editStatusForm}>
                                                <select
                                                    value={newStatus}
                                                    onChange={(e) => setNewStatus(e.target.value)}
                                                    className={styles.statusSelect}
                                                >
                                                    {availableStatuses.map(s => (
                                                        <option key={s} value={s}>{getStatusIconAndStyle(s).label}</option>
                                                    ))}
                                                </select>
                                                <button
                                                    onClick={() => handleUpdateStatus(booking.bookingId, newStatus)}
                                                    className={`${styles.actionButton} ${styles.saveButton}`}
                                                    disabled={!newStatus || newStatus === booking.status}
                                                >
                                                    Zapisz
                                                </button>
                                                <button
                                                    onClick={() => setEditingBookingId(null)}
                                                    className={`${styles.actionButton} ${styles.cancelButton}`}
                                                >
                                                    Anuluj
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setEditingBookingId(booking.bookingId);
                                                    setNewStatus(booking.status);
                                                }}
                                                className={`${styles.actionButton} ${styles.editButton}`}
                                                title="Zmień status"
                                            >
                                                <FaEdit /> Zmień Status
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminDashboardPage;