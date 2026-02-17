"use client";

import React, { useRef, useCallback, useState, useEffect } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface InputImgeComponentProps {
    labelName?: string;
    error?: string;
    onChange?: (file: File | null) => void;
    id?: string;
    accept?: string;
    disabled?: boolean;
    register?: UseFormRegisterReturn;
}

const MOBILE_BREAKPOINT_PX = 768;

function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined'
            ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`).matches
            : false
    );
    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`);
        const listener = () => setIsMobile(media.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, []);
    return isMobile;
}

function InputImgeComponent({
    labelName = '',
    error = "",
    onChange,
    id = 'input-imge',
    accept = 'image/*',
    disabled = false,
    register,
}: InputImgeComponentProps): React.ReactElement {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const isMobile = useIsMobile();

    const clearPreview = useCallback(() => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    }, [previewUrl]);

    React.useEffect(() => {
        return () => {
            clearPreview();
        };
    }, [clearPreview]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        clearPreview();
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            onChange?.(file);
        } else {
            onChange?.(null);
        }
        if (!register) {
            event.target.value = '';
        }
    };

    const handleRemove = () => {
        clearPreview();
        onChange?.(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const triggerInput = useCallback((useCamera: boolean) => {
        if (disabled || !inputRef.current) return;
        const input = inputRef.current;
        if (useCamera) {
            input.setAttribute('capture', 'environment');
        } else {
            input.removeAttribute('capture');
        }
        input.click();
    }, [disabled]);

    const handleClick = () => {
        if (disabled) return;
        triggerInput(false);
    };

    return (
        <div className="flex flex-col gap-1">
            {labelName ? (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                    {labelName}
                </label>
            ) : null}
            <input
                ref={(element) => {
                    inputRef.current = element;
                    if (register && typeof register.ref === 'function') {
                        register.ref(element);
                    }
                }}
                id={id}
                type="file"
                accept={accept}
                disabled={disabled}
                name={register?.name}
                onChange={(event) => {
                    if (register) {
                        register.onChange(event);
                    }
                    handleChange(event);
                }}
                onBlur={(event) => {
                    if (register) {
                        register.onBlur(event);
                    }
                }}
                className="sr-only"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
            />
            <div
                role="button"
                tabIndex={disabled ? -1 : 0}
                onClick={() => !isMobile && handleClick()}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (!isMobile) handleClick();
                    }
                }}
                className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 transition-colors hover:border-zinc-400 hover:bg-zinc-100 focus-visible:outline focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
                aria-label={labelName || 'Choose image'}
            >
                {previewUrl ? (
                    <div className="relative w-full flex-1 overflow-hidden rounded-md">
                        {/* eslint-disable-next-line @next/next/no-img-element -- preview uses blob URL from createObjectURL */}
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-full max-h-[240px] w-full object-contain"
                        />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemove();
                            }}
                            className="absolute right-2 top-2 rounded-md bg-zinc-900/70 px-2 py-1 text-xs font-medium text-white hover:bg-zinc-900 disabled:opacity-50   dark:hover:bg-zinc-100"
                        >
                            Remove
                        </button>
                    </div>
                ) : isMobile ? (
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={(e) => {
                                e.stopPropagation();
                                triggerInput(true);
                            }}
                            className="flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 active:bg-zinc-100 disabled:opacity-50"
                        >
                            <span aria-hidden>📷</span>
                            Camera
                        </button>
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={(e) => {
                                e.stopPropagation();
                                triggerInput(false);
                            }}
                            className="flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 active:bg-zinc-100 disabled:opacity-50"
                        >
                            <span aria-hidden>🖼️</span>
                            Upload
                        </button>
                    </div>
                ) : (
                    <>
                        <span className="text-4xl text-zinc-400 ">
                            📷
                        </span>
                        <span className="text-sm text-zinc-500 ">
                            Click to upload image
                        </span>
                    </>
                )}
            </div>
            {error ? (
                <p
                    id={`${id}-error`}
                    className="text-xs text-red-600 dark:text-red-400"
                    role="alert"
                >
                    {error}
                </p>
            ) : null}
        </div>
    );
}

export default InputImgeComponent;
