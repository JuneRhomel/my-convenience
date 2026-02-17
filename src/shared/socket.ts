import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:4000";

/**
 * Creates a Socket.IO client connection to the server.
 * Call only on the client (e.g. inside a component or provider).
 * @param token - Optional access token for auth
 * @returns Socket instance
 */
export function createSocketConnection(token?: string | null): Socket {
    const socket = io(SOCKET_URL, {
        auth: token ? { token } : undefined,
        autoConnect: true,
    });
    return socket;
}
