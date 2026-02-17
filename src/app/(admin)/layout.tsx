import { cookies } from "next/headers";
import AdminLayoutClient from "./admin_layout_client";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value ?? null;

    return <AdminLayoutClient token={token}>{children}</AdminLayoutClient>;
}
