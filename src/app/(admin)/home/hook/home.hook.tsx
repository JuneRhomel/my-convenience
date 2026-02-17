
import { apiRequest } from "@/shared/fetch";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useReceiptHook from "./receipt.hook";

export interface ReceiptFormState {
    image?: File[] | null;
    date: Date | null;
    typeExpenses: string;
    companyName: string;
    address: string;
    tinNumber: string;
    gross: number
}

export default function useHomeHook() {
    const { refetch } = useReceiptHook()
    const [ModelOpen, SetModelOpen] = useState(false)
    const [AddReceiptError, setAddReceiptError] = useState<string | null>(null);


    const handleCloseModal = () => {
        SetModelOpen(false)
    }

    const handleOpenModal = () => {
        SetModelOpen(true)
    }


    const handleSubmit: SubmitHandler<ReceiptFormState> = async (data) => {
        const formData = new FormData();
        if (data.image) {
            if (data.image) {
                formData.append("file", data.image[0]);
            }
            formData.append("date", String(data.date));
            formData.append("typeExpenses", data.typeExpenses);
            formData.append("companyName", data.companyName);
            formData.append("address", data.address);
            formData.append("tinNumber", data.tinNumber);
            formData.append("gross", String(data.gross));


            const response = await apiRequest({
                url: "/receipts",
                method: "POST",
                body: formData,
            });

            if (!response.error) {
                SetModelOpen(false)
                setAddReceiptError("")
            }
            setAddReceiptError(response?.error ?? null);
            refetch()
        };

    }

    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ReceiptFormState>({
        defaultValues: {
            image: null,
            date: null,
            typeExpenses: "",
            companyName: "",
            address: "",
            tinNumber: "",
            gross: 0
        },
    });

    const onFormSubmit = handleFormSubmit(handleSubmit, (validationErrors) => {
        console.log("Validation failed:", validationErrors);
    });

    return {
        ModelOpen,
        AddReceiptError,
        handleCloseModal,
        handleOpenModal,
        register,
        handleFormSubmit: onFormSubmit,
        errors,
        isSubmitting,
        handleSubmit,
    }
}