import type React from "react";

export interface RowTableComponentInterface {
    cells: React.ReactNode[];
}

export default function RowTableComponent({
    cells,
}: RowTableComponentInterface): React.ReactElement {
    const renderCells = (): React.ReactElement[] => {
        return cells.map((cell, index) => (
            <td
                key={index}
                className="px-4 py-2 text-sm text-zinc-700   whitespace-nowrap"
            >
                {cell}
            </td>
        ));
    };

    return <tr className="border-b last:border-b-0 hover:bg-zinc-50">{renderCells()}</tr>;
}

