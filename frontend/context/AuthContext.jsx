import { useContext, createContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { verifyUser } from "../src/services/auth";
import { setAccessToken } from "../src/services/api";
import { useLogoutUser } from "../src/hooks/mutations/auth/useLogout";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: verifyUser,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    });

    const { mutateAsync: logoutMutation } = useLogoutUser();

    // Extract user: ensure null when logged out or unauthenticated
    const user = data?.user || (data?.id ? data : null);

    const checkLoginStatus = (authResponse) => {
        const u = authResponse?.user ?? authResponse;
        if (u) {
            queryClient.setQueryData(["profile"], { success: true, user: u });
        }
    };

    const setUser = (u) =>
        queryClient.setQueryData(
            ["profile"],
            u ? { success: true, user: u } : null
        );

    const handleLogout = async () => {
        setAccessToken(null);

        queryClient.setQueryData(["profile"], null);
        queryClient.clear();

        try {
            await logoutMutation();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading: isLoading,
                checkLoginStatus,
                logout: handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
