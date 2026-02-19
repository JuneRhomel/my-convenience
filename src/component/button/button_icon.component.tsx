import React from "react";
import { Bars } from "react-loader-spinner";

interface ButtonIconComponentInterface {
    icon: React.ReactNode;
    isLoading?: boolean;
    isDisabled?: boolean;
    onClick?: () => void;
    type?: "button" | "reset" | "submit";
    buttonType?: "primary" | "secondary" | "tertiary" | "error" | "warning";
    ariaLabel: string;
}

type ButtonType = "primary" | "secondary" | "tertiary" | "error" | "warning";

const BUTTON_TYPE_STYLES: Record<ButtonType, string> = {
    primary:
        "bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-500",
    secondary:
        "border-2 border-zinc-900 bg-white text-zinc-900 hover:bg-zinc-100 focus-visible:ring-zinc-500",
    tertiary:
        "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 focus-visible:ring-zinc-400",
    error:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
    warning:
        "bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-400",
};

/**
 * Icon-only button with loading state and type variants.
 * Use ariaLabel for accessibility (no visible text).
 */
export default function ButtonIconComponent({
    icon,
    isLoading = false,
    isDisabled = false,
    onClick,
    type = "button",
    buttonType = "primary",
    ariaLabel,
}: ButtonIconComponentInterface): React.ReactElement {
    const renderContent = (): React.ReactNode => {
        const colorLoading =
            buttonType === "secondary" ? "black" : "currentColor";
        if (isLoading) {
            return (
                <Bars
                    height="20"
                    width="20"
                    color={colorLoading}
                    ariaLabel="bars-loading"
                    visible={true}
                    wrapperClass=""
                />
            );
        }
        return icon;
    };

    const baseClassName =
        "grid place-items-center rounded-lg p-1.5 font-medium transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2  disabled:opacity-50 [&_svg]:size-5";
    const typeClassName = BUTTON_TYPE_STYLES[buttonType];

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            aria-label={ariaLabel}
            className={`${baseClassName} ${typeClassName}`}
        >
            {renderContent()}
        </button>
    );
}
