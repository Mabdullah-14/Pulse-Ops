import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PublicRoutes = () => {
    const { user, loading } = useAuth(); 

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-stone-50">
                <p className="text-sm text-stone-500 animate-pulse">Loading...</p>
            </div>
        );
    }
    

    return !user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoutes;