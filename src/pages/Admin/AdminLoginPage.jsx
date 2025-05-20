import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styles from './AdminLoginPage.module.css';
import { toast } from 'react-toastify';
import { FaUserShield, FaLock } from 'react-icons/fa';

const loginSchema = z.object({
    username: z.string().min(1, { message: "Nazwa użytkownika jest wymagana." }),
    password: z.string().min(1, { message: "Hasło jest wymagane." }),
});

function AdminLoginPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Błąd logowania.');
            }

            if (responseData.token) {
                localStorage.setItem('adminToken', responseData.token);
                toast.success('Zalogowano pomyślnie!');
                navigate('/admin/dashboard');
            } else {
                throw new Error('Brak tokenu w odpowiedzi.');
            }

        } catch (error) {
            console.error("Błąd logowania admina:", error);
            toast.error(error.message || 'Nie udało się zalogować. Sprawdź dane.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.adminLoginPageContainer}>
            <div className={styles.loginBox}>
                <FaUserShield className={styles.loginIconHeader} />
                <h1 className={styles.pageTitle}>Panel Administratora</h1>
                <p className={styles.pageSubtitle}>Zaloguj się, aby zarządzać systemem.</p>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username"><FaUserShield /> Nazwa użytkownika</label>
                        <input
                            type="text"
                            id="username"
                            {...register("username")}
                            className={errors.username ? styles.inputError : ''}
                            autoComplete="username"
                        />
                        {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password"><FaLock /> Hasło</label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
                            className={errors.password ? styles.inputError : ''}
                            autoComplete="current-password"
                        />
                        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
                    </div>
                    <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? <span className={styles.spinner}></span> : 'Zaloguj się'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLoginPage;