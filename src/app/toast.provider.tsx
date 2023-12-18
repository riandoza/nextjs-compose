"use client"

import React from "react"
import { toast, ToastContainer } from "react-toastify"

interface ToastProviderProps {
    children: React.ReactNode
}

export default function ToastProvider({ children }: ToastProviderProps) {
    return (
        <>
            {children}
            <ToastContainer position={toast.POSITION.TOP_RIGHT} theme="dark" />
        </>
    )
}
