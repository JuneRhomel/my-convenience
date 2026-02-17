import React from 'react'
import Image from 'next/image'

export interface ReceiptCardData {
    imageUrl?: string | null
    date: string
    typeExpenses: string
    companyName: string
    address: string
    tinNumber: string
    gross: number
    netOfVat: number
    inputTax: number
    wtax: number
    payment: number
}

interface ReceiptCardComponentProps {
    receipt: ReceiptCardData
    formatCurrency?: (value: number) => string
}

const defaultFormatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
}

function ReceiptCardComponent({
    receipt,
    formatCurrency = defaultFormatCurrency,
}: ReceiptCardComponentProps): React.ReactElement {
    const detailRows: { label: string; value: string }[] = [
        { label: 'Date', value: receipt.date },
        { label: 'Type Expenses', value: receipt.typeExpenses },
        { label: 'Company Name', value: receipt.companyName },
        { label: 'Address', value: receipt.address },
        { label: 'Tin Number', value: receipt.tinNumber },
        { label: 'Gross', value: formatCurrency(receipt.gross) },
        { label: 'Payment', value: formatCurrency(receipt.payment) },
    ]

    return (
        <article className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800">
            {receipt.imageUrl ? (
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-700">
                    <Image
                        src={receipt.imageUrl}
                        alt="Receipt"
                        fill
                        className="object-contain object-center"
                    />
                </div>
            ) : null}
            <div className="border-t border-zinc-200 p-4 dark:border-zinc-700">
                <dl className="grid gap-2 sm:grid-cols-1">
                    {detailRows.map((row) => (
                        <div
                            key={row.label}
                            className="flex flex-col gap-0.2 sm:flex-row sm:items-baseline sm:justify-between"
                        >
                            <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                {row.label}
                            </dt>
                            <dd className="wrap-break-word text-xs font-medium text-zinc-900 dark:text-zinc-100">
                                {row.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </article>
    )
}

export default ReceiptCardComponent
