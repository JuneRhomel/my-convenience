const MONTH_MIN = 1;
const MONTH_MAX = 12;

export function formatMonthNumberToText(monthNumber: number): string {
    if (monthNumber < MONTH_MIN || monthNumber > MONTH_MAX) {
        return "";
    }
    const date = new Date(2000, monthNumber - 1, 1);
    return date.toLocaleString("en-US", { month: "long" });
}

export default function formatDateToLong(dateString: string): string {
    const parsedDate = new Date(dateString);

    const year = parsedDate.getFullYear();
    const month = parsedDate.toLocaleString("en-US", { month: "long" });
    const day = parsedDate.getDate();

    return `${month} ${day} ${year}`;
}
