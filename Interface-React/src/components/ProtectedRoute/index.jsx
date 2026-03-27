import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
    const userData = localStorage.getItem('burguer:userData');

    if (!userData) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}