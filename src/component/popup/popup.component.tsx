import React, { useEffect, useCallback } from 'react';

export interface PopupComponentProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

/**
 * Simple popup/modal component with backdrop and optional title.
 * Closes on backdrop click and Escape key.
 */
function PopupComponent({
    isOpen,
    onClose,
    title,
    children,
}: PopupComponentProps): React.ReactElement | null {
    const handleEscape = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        if (!isOpen) return;
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleEscape]);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'popup-title' : undefined}
        >
            <div
                className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
                onClick={handleBackdropClick}
                aria-hidden="true"
            />
            <div className="relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xl ">
                {title ? (
                    <div className="border-b border-zinc-200 px-4 py-3 ">
                        <h2
                            id="popup-title"
                            className="text-lg font-semibold text-zinc-900 "
                        >
                            {title}
                        </h2>
                    </div>
                ) : null}
                <div className="max-h-[calc(90vh-4rem)] overflow-y-auto p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default PopupComponent;
