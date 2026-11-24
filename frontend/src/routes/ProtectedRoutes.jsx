import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoutes = () => {
    const { user, loading } = useAuth(); // loading state nikal li

    // Jab tak background mein user verify ho raha hai, redirect na karein
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-stone-50">
                <p className="text-sm text-stone-500 animate-pulse">Loading session...</p>
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;