"use client";

import Link from 'next/link';
import { usePathname } from "next/navigation";
import React, { useState, useCallback, useEffect } from 'react';

export interface SidebarLink {
    href: string;
    label: string;
    activeLink: string[];
}

export interface SidebarComponentInterface {
    sidebarLink: SidebarLinkInterfce;
}

export interface SidebarLinkInterfce {
    href: string;
    label: string;
    activeLink: string[];
}

const SIDEBAR_LINKS: SidebarLink[] = [
    { href: "/home", label: "Receipt Collection", activeLink: ["/home"] },
] as const;

function MenuIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    );
}

function CloseIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}

export default function SidebarComponent({ handleSignOut }: {
    handleSignOut: () => void;
}) {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const activeLink = SIDEBAR_LINKS.find((link) =>
        link.activeLink.includes(pathname)
    );
    const linkClassNames = activeLink
        ? "bg-zinc-100 text-zinc-900"
        : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900";
    const openMobileMenu = useCallback(() => setIsMobileOpen(true), []);
    const closeMobileMenu = useCallback(() => setIsMobileOpen(false), []);
    useEffect(() => {
        if (!isMobileOpen) return;
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeMobileMenu();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isMobileOpen, closeMobileMenu]);

    const sidebarContent = (
        <>
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 px-4">
                <Link
                    href="/home"
                    className="text-lg font-semibold text-zinc-900"
                    onClick={closeMobileMenu}
                >
                    App
                </Link>
                <button
                    type="button"
                    onClick={closeMobileMenu}
                    className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 md:hidden"
                    aria-label="Close menu"
                >
                    <CloseIcon className="h-5 w-5" />
                </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 p-3">
                {SIDEBAR_LINKS.map((link) => (
                    <Link
                        key={link.href + link.label}
                        href={link.href}
                        onClick={closeMobileMenu}
                        className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${linkClassNames}`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
            <div className="border-t border-zinc-200 p-3">
                <button
                    type="button"
                    onClick={() => {
                        closeMobileMenu();
                        handleSignOut();
                    }}
                    className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                >
                    Sign out
                </button>
            </div>
        </>
    );

    return (
        <>
            <button
                type="button"
                onClick={openMobileMenu}
                className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 md:hidden"
                aria-label="Open menu"
            >
                <MenuIcon className="h-5 w-5" />
            </button>
            {isMobileOpen && (
                <div
                    role="presentation"
                    className="fixed inset-0 z-40 bg-zinc-900/50 md:hidden"
                    onClick={closeMobileMenu}
                />
            )}
            <aside
                className={`
                    flex w-56 shrink-0 flex-col border-r border-zinc-200 bg-white
                    fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-out
                    md:relative md:translate-x-0
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
            >
                {sidebarContent}
            </aside>
        </>
    );
}
