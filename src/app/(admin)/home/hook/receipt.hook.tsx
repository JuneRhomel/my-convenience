import { SelectOption } from "@/component/input/select.component";
import { ReceiptItem } from "@/model/receipt.model";
import { apiRequest, fetchFileFromApi } from "@/shared/fetch";
import { formatMonthNumberToText } from "@/shared/format_date_text.shered";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useState } from "react";

export default function useReceiptHook() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const monthParam = searchParams.get("month");
    const yearParam = searchParams.get("year");
    const now = new Date();
    const month = monthParam !== null ? Number(monthParam) : now.getMonth() + 1;
    const year = yearParam !== null ? Number(yearParam) : now.getFullYear();
    const [exportIsLoading, setexportIsLoading] = useState(false)

    const getReceiptList = async (): Promise<ReceiptItem[]> => {
        const data: ReceiptItem[] = await apiRequest({
            url: `/receipts?month=${month}&year=${year}`,
            method: "GET",
        });
        return data;
    };

    const generateExcel = async (): Promise<void> => {
        setexportIsLoading(true)
        const fileData = await fetchFileFromApi(`/receipts/export?month=${month}&year=${year}`); // call your server action
        if (!fileData) return;

        const nameMonth = formatMonthNumberToText(month)

        const blob = new Blob([fileData]);
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${nameMonth}-20-${year}.xlsx`; // choose file name
        link.click();
        window.URL.revokeObjectURL(link.href);
        setexportIsLoading(false)

    };



    const {
        data: receiptList,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["receipts", month, year],
        queryFn: getReceiptList,
    });

    const totalPayment: number = (receiptList ?? []).reduce(
        (sum: number, item: ReceiptItem) => sum + Number(item.payment),
        0
    );

    const header = [
        "Date",
        "Type",
        "Company",
        "Address",
        "TIN",
        "Gross",
        "Net of VAT",
        "Input Tax",
        "WTax",
        "Payment",
        "Image",
        "action",
    ];

    const monthOptions: SelectOption[] = Array.from({ length: 12 }, (_, index) => {
        const monthNumber = index + 1;
        return {
            value: String(monthNumber),
            label: new Date(0, index).toLocaleString("en-US", { month: "long" }),
            selected: monthNumber === month,
        };
    });

    const currentYear = new Date().getFullYear();

    const yearOptions: SelectOption[] = Array.from(
        { length: currentYear - 2025 },
        (_, index) => {
            const optionYear = currentYear - index;
            return {
                value: String(optionYear),
                label: String(optionYear),
                selected: optionYear === year,
            };
        }
    );

    const handleMonthChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        const newMonth: number = Number(event.target.value);
        if (!Number.isInteger(newMonth) || newMonth < 1 || newMonth > 12) {
            return;
        }
        const params = new URLSearchParams(searchParams.toString());
        params.set("month", String(newMonth));
        params.set("year", String(year));
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleYearChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        const newYear: number = Number(event.target.value);
        if (!Number.isInteger(newYear)) {
            return;
        }
        const params = new URLSearchParams(searchParams.toString());
        params.set("month", String(month));
        params.set("year", String(newYear));
        router.push(`${pathname}?${params.toString()}`);
    };


    return {
        receiptList,
        isLoading,
        isError,
        refetch,
        header,
        monthOptions,
        yearOptions,
        totalPayment,
        handleMonthChange,
        handleYearChange,
        generateExcel,
        month,
        year,
        exportIsLoading,
    };
}