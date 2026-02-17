"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import type { Socket } from "socket.io-client";
import { createSocketConnection } from "../socket";

interface SocketContextValue {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextValue | null>(null);

export interface SocketProviderProps {
    children: ReactNode;
    /** Optional token from server (e.g. from cookies). Pass from a server component. */
    token?: string | null;
}

/**
 * Provides a single Socket.IO connection to the tree.
 * Create the socket on the client when mounted; disconnect on unmount.
 */
export function SocketProvider({ children, token }: SocketProviderProps) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = createSocketConnection(token);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSocket(socketInstance);

        const onConnect = () => setIsConnected(true);
        const onDisconnect = () => setIsConnected(false);

        socketInstance.on("connect", onConnect);
        socketInstance.on("disconnect", onDisconnect);

        if (socketInstance.connected) {
            setIsConnected(true);
        }

        return () => {
            socketInstance.off("connect", onConnect);
            socketInstance.off("disconnect", onDisconnect);
            socketInstance.disconnect();
            setSocket(null);
            setIsConnected(false);
        };
    }, [token]);

    const value = useMemo<SocketContextValue>(
        () => ({ socket, isConnected }),
        [socket, isConnected]
    );

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
}

/**
 * Returns the current Socket instance and connection status.
 * Must be used within SocketProvider.
 */
export function useSocket(): SocketContextValue {
    const context = useContext(SocketContext);
    if (context === null) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
}
