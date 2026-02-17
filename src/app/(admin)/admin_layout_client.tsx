"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import signOut from "./action/sign_out";
import SidebarComponent from "@/component/sidebar/sidebar.component";
import { AuthProvider } from "@/shared/context/auth_context";


const queryClient = new QueryClient();

interface AdminLayoutClientProps {
    children: React.ReactNode;
    token?: string | null;
}

export default function AdminLayoutClient({
    children,
    token
}: AdminLayoutClientProps) {

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider token={token ?? null}>
                <div className="flex min-h-screen bg-zinc-50">
                    <SidebarComponent handleSignOut={handleSignOut} />
                    <main className="min-w-0 flex-1 p-6 pt-14 md:pt-6">{children}</main>
                </div>
            </AuthProvider>
        </QueryClientProvider>
    );
}
