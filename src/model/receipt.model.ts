export interface ReceiptItem {
    id: number;
    date: string;
    typeExpenses: string;
    companyName: string;
    address: string;
    tinNumber: string;
    image: string | null;
    gross: number;
    netOfVat: number;
    inputTax: number;
    wtax: number;
    payment: number;
}