import type React from "react";
import HeaderTableComponent from "./header_table.component";
import RowTableComponent from "./row_table.component";

export interface TableComponentInterface {
    headerList: string[];
    rows: React.ReactNode[][];
    isLoading: boolean
    isError: boolean
}

export default function TableComponent({
    headerList,
    rows,
    isLoading,
    isError
}: TableComponentInterface): React.ReactElement {
    if (isLoading) {
        return (
            <div className="rounded-lg border border-zinc-200 bg-white px-4 py-6 text-sm text-zinc-500 shadow-sm">
                Loading data…
            </div>
        );
    }
    if (isError) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700 shadow-sm">
                Something went wrong while loading data. Please try again.
            </div>
        );
    }
    const renderRows = (): React.ReactElement[] => {
        return rows.map((cells, index) => (
            <RowTableComponent key={index} cells={cells} />
        ));
    };



    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
                <HeaderTableComponent headerList={headerList} />
                <tbody>{renderRows()}</tbody>
            </table>
        </div>
    );
}