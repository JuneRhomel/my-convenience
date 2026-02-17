"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import errorApiMapper from "./mapper/error_api_mapper";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiRequestOptions {
    method: HttpMethod;
    url: string;
    body?: Record<string, unknown> | FormData;
}

/**
 * Create and send an Axios request per request context.
 * Automatically attaches access_token from cookies if available.
 */
export async function apiRequest({
    method,
    url,
    body,
}: ApiRequestOptions) {
    const cookieStore = await cookies();
    try {
        if (url === "/auth/login" || url === "/auth/google") {
            return await handleLoginResponse({ method, url, body });
        }

        const token = cookieStore.get("access_token")?.value;

        if (!token) {
            redirect("/login");
            return;
        }
        const response = await axios({
            method,
            url: `${API_BASE_URL}${url}`,
            data: body,
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status === 401) {
            redirect("/login");
            return;
        }

        return response.data;
    } catch (error) {
        const errorResponse = errorApiMapper(error as AxiosError);
        if (errorResponse.error === "jwt expired") {
            cookieStore.delete("access_token");
            cookieStore.delete("refresh_token");
            redirect("/login");
        }
        return errorResponse;
    }
}
async function handleLoginResponse({ method, url, body }: ApiRequestOptions) {
    const cookieStore = await cookies();

    try {
        const response = await axios({
            method,
            url: `${API_BASE_URL}${url}`,
            data: body,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });


        const { accessToken, refreshToken } = response.data;
        cookieStore.set("access_token", accessToken);
        cookieStore.set("refresh_token", refreshToken);
        return { success: true, data: response.data };
    } catch (error) {
        return errorApiMapper(error as AxiosError);
    }
}

export async function fetchFileFromApi(url: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
        redirect("/login");
        return;
    }

    try {
        const response = await axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api"}${url}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: "arraybuffer", // server-safe binary data
        });

        return response.data;
    } catch (error) {
        const errorResponse = errorApiMapper(error as AxiosError);
        if (errorResponse.error === "jwt expired") {
            cookieStore.delete("access_token");
            cookieStore.delete("refresh_token");
            redirect("/login");
        }
        return errorResponse;
    }
}