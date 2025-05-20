import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken');
    const location = useLocation();

    if (!token) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    // W przyszłości można dodać weryfikację ważności tokenu po stronie klienta lub
    // przy każdym żądaniu do chronionego API backend będzie to weryfikował.
    // Na razie proste sprawdzenie istnienia tokenu wystarczy.

    return children;
};

export default ProtectedRoute;