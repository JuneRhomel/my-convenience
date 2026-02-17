import type React from "react";

export interface HeaderTableComponentInterface {
    headerList: string[];
}

export default function HeaderTableComponent({
    headerList,
}: HeaderTableComponentInterface): React.ReactElement {
    const renderHeaderList = (): React.ReactElement[] => {
        return headerList.map((label) => (
            <th
                key={label}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500"
            >
                {label}
            </th>
        ));
    };

    return (
        <thead className="bg-zinc-50">
            <tr>{renderHeaderList()}</tr>
        </thead>
    );
}