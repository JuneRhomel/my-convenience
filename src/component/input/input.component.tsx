import React, { InputHTMLAttributes } from "react";

type InputComponentProps = {
    labelName?: string;
    error?: string
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputComponent({
    labelName = "",
    error,
    ...props
}: InputComponentProps) {

    const renderLabel = () => {
        if (labelName) {
            return (
                <label
                    htmlFor={props.id}
                    className="text-sm font-medium text-zinc-700"
                >
                    {labelName}
                </label>
            )
        }
        return ""
    }

    const rederError = () => {
        if (error) {
            <p className=" text-red-600 text-xs" role="alert">
                {error}
            </p>
        }
        return ""
    }

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-2">
                {renderLabel()}
                <input
                    {...props}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 aria-invalid:border-red-500 aria-invalid:focus:ring-red-200"
                />
            </div>
            {rederError()}
        </div>
    );
}
