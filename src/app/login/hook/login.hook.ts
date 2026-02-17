"use client";

import { apiRequest } from "@/shared/fetch";
import { SubmitHandler, useForm } from "react-hook-form";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CredentialResponse } from "@react-oauth/google";

interface LoginFormState {
    email: string;
    password: string;
}

export function useSubmitLogin() {
    const router = useRouter();
    const [LoginError, setLoginError] = useState<string | null>(null);


    const handleSubmit: SubmitHandler<LoginFormState> = async (data) => {
        const response = await apiRequest({
            url: "/auth/login",
            method: "POST",
            body: {
                email: data.email,
                password: data.password,
            },
        });

        if (response.success) {
            router.push("/home");
            return;
        }

        setLoginError(response.error);
    };

    const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
        if (!credentialResponse.credential) {
            setLoginError("No credential received");
        }

        const response = await apiRequest({
            url: "/auth/google",
            method: "POST",
            body: {
                data: credentialResponse.credential
            },
        });

        if (response.success) {
            router.push("/home");
            return;
        }

        setLoginError(response.error);
        return;
    };

    const handleGoogleError = () => {
        setLoginError("Error")
    }


    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormState>({
        defaultValues: {
            email: "",
            password: "",
        } as LoginFormState,
    });



    return { handleSubmit, LoginError, handleGoogleLogin, isSubmitting, register, errors, handleFormSubmit, handleGoogleError };

}
