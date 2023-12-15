"use client";

import { ToastContainer, toast } from "react-toastify";

interface ToastProviderProps {
    children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
    return (
        <>
            {children}
            <ToastContainer position={toast.POSITION.TOP_RIGHT} theme="dark" />
        </>
    );
}
