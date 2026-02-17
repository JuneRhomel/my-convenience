import React from 'react'
import { Bars } from 'react-loader-spinner'

interface ButtonComponentInterface {
    isLoading?: boolean
    isDisabled?: boolean
    onClick?: () => void
    label: string
    type?: "button" | "reset" | "submit",
    buttonType?: "primary" | "secondary" | "tertiary"
}

type ButtonType = 'primary' | 'secondary' | 'tertiary'

const BUTTON_TYPE_STYLES: Record<ButtonType, string> = {
    primary:
        'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-500',
    secondary:
        'border-2 black bg-white text-zinc-900 hover:bg-zinc-100 focus-visible:ring-zinc-500  ',
    tertiary:
        'bg-zinc-200 text-zinc-900 hover:bg-zinc-300 focus-visible:ring-zinc-400 ',
}

export default function ButtonComponent({
    isLoading = false,
    onClick,
    label,
    isDisabled = false,
    type = "button",
    buttonType = 'primary',
}: ButtonComponentInterface) {

    const renderLabel = () => {
        const colorLoading = buttonType === "secondary" ? "black" : "currentColor"
        if (isLoading) {
            return <Bars
                height="20"
                width="20"
                color={colorLoading}
                ariaLabel="bars-loading"
                visible={true}
                wrapperClass=''
            />
        }
        return label
    }

    const baseClassName =
        'grid place-items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
    const typeClassName = BUTTON_TYPE_STYLES[buttonType]

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`${baseClassName} ${typeClassName}`}
        >
            {renderLabel()}
        </button>
    )
}
