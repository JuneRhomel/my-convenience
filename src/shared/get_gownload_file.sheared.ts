
"use server"


import axios from "axios";
import { cookies } from "next/headers";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export async function getDownloadFile(url: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;



    const response = await axios.get(`${API_BASE_URL}${url}`, {
        responseType: "blob", // IMPORTANT
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    return { blob, response }



}
