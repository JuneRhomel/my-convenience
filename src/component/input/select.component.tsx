import React, { type SelectHTMLAttributes } from "react";

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectComponentProps
    extends SelectHTMLAttributes<HTMLSelectElement> {
    labelName?: string;
    error?: string;
    options: SelectOption[];
    defaultValue?: string; // optional default value
}

export default function SelectComponent({
    labelName = "",
    error,
    options,
    id,
    defaultValue,
    ...props
}: SelectComponentProps): React.ReactElement {
    const selectId: string | undefined = id ?? props.name;

    const renderLabel = (): React.ReactElement | null => {
        if (!labelName) return null;
        return (
            <label htmlFor={selectId} className="text-sm font-medium text-zinc-700">
                {labelName}
            </label>
        );
    };

    const renderError = (): React.ReactElement | null => {
        if (!error) return null;
        return (
            <p className="text-xs text-red-600" role="alert">
                {error}
            </p>
        );
    };

    const renderOptions = (): React.ReactElement[] => {
        return options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ));
    };

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-2">
                {renderLabel()}
                <select
                    id={selectId}
                    aria-invalid={Boolean(error)}
                    defaultValue={defaultValue} // use defaultValue here
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 aria-invalid:border-red-500 aria-invalid:focus:ring-red-200"
                    {...props}
                >
                    {renderOptions()}
                </select>
            </div>
            {renderError()}
        </div>
    );
}
