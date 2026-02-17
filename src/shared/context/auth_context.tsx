"use client";

import {
    createContext,
    useContext,
    useMemo,
    type ReactNode,
    type ReactElement,
} from "react";

interface AuthContextValue {
    token: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export interface AuthProviderProps {
    children: ReactNode;
    token: string | null;
}

export function AuthProvider({
    children,
    token,
}: AuthProviderProps): ReactElement {
    const value: AuthContextValue = useMemo(
        () => ({
            token,
        }),
        [token]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

