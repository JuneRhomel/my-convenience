import { ReceiptItem } from "@/model/receipt.model";
import { apiRequest } from "@/shared/fetch";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useReceiptHook from "./receipt.hook";

export interface ReceiptFormState {
    image?: File[] | null;
    date: string;
    typeExpenses: string;
    companyName: string;
    address: string;
    tinNumber: string;
    gross: number;
}

const ADD_DEFAULT_VALUES: ReceiptFormState = {
    image: null,
    date: "",
    typeExpenses: "",
    companyName: "",
    address: "",
    tinNumber: "",
    gross: 0,
};

function formatDateForInput(dateString: string): string {
    if (!dateString) return "";
    return dateString.slice(0, 10);
}

function receiptToDefaultValues(receipt: ReceiptItem): ReceiptFormState {
    return {
        image: null,
        date: formatDateForInput(receipt.date),
        typeExpenses: receipt.typeExpenses ?? "",
        companyName: receipt.companyName ?? "",
        address: receipt.address ?? "",
        tinNumber: receipt.tinNumber ?? "",
        gross: receipt.gross ?? 0,
    };
}

export default function useHomeHook() {
    const { refetch } = useReceiptHook();
    const [ModelOpen, SetModelOpen] = useState(false);
    const [AddReceiptError, setAddReceiptError] = useState<string | null>(null);
    const [deleteIsLoading, setdeleteIsLoading] = useState(false);
    const [editingReceipt, setEditingReceipt] = useState<ReceiptItem | null>(null);

    const handleCloseModal = (): void => {
        SetModelOpen(false);
        setEditingReceipt(null);
        reset(ADD_DEFAULT_VALUES);
    };

    const handleOpenModal = (receipt?: ReceiptItem | null): void => {
        if (receipt) {
            setEditingReceipt(receipt);
            reset(receiptToDefaultValues(receipt));
        } else {
            setEditingReceipt(null);
            reset(ADD_DEFAULT_VALUES);
        }
        SetModelOpen(true);
    };

    const buildFormData = (data: ReceiptFormState): FormData => {
        const formData = new FormData();
        if (data.image?.length) {
            formData.append("file", data.image[0]);
        }
        formData.append("date", data.date);
        formData.append("typeExpenses", data.typeExpenses);
        formData.append("companyName", data.companyName);
        formData.append("address", data.address);
        formData.append("tinNumber", data.tinNumber);
        formData.append("gross", String(data.gross));
        return formData;
    };

    const handleSubmit: SubmitHandler<ReceiptFormState> = async (data) => {
        const formData = buildFormData(data);
        const isEdit = editingReceipt !== null;
        const url = isEdit ? `/receipts/${editingReceipt.id}` : "/receipts";
        const method = isEdit ? "PUT" : "POST";
        const response = await apiRequest({ url, method, body: formData });
        if (!response.error) {
            SetModelOpen(false);
            setAddReceiptError(null);
            setEditingReceipt(null);
            reset(ADD_DEFAULT_VALUES);
        } else {
            setAddReceiptError(response?.error ?? null);
        }
        refetch();
    };

    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ReceiptFormState>({
        defaultValues: ADD_DEFAULT_VALUES,
    });

    const onFormSubmit = handleFormSubmit(handleSubmit, (validationErrors) => {
        console.log("Validation failed:", validationErrors);
    });

    const handleDelete = (id: number) => async (): Promise<void> => {
        setdeleteIsLoading(true)
        await apiRequest({
            url: `/receipts/${id}`,
            method: "DELETE",
        });
        refetch()
        setdeleteIsLoading(false)
        return
    }


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
        handleDelete,
        deleteIsLoading,
        editingReceipt,
    };
}