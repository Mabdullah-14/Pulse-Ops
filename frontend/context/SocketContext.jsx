import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { getAccessToken } from "../src/services/api";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useAuth();
    const token = getAccessToken();

    useEffect(() => {
        if (!user?.id || !token) return;

        const baseUrl = (import.meta.env.VITE_BACKEND_URL || "http://localhost:5000");

        const newSocket = io(baseUrl, {
            transports: ["websocket"], 
            auth: { token },
            withCredentials: true,
        });

        newSocket.on("connect", () => {
            console.log("✅ Socket connected:", newSocket.id);
        });

        newSocket.on("connect_error", (err) => {
            console.error(" Socket connection error:", err.message);
        });

        newSocket.on("socket_error", (err) => {
            console.error(" Server socket error:", err);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
            setSocket(null);
        };
    }, [user?.id, token]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
