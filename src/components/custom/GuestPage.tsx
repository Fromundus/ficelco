import React from 'react'

const GuestPage = ({ children, className, childrenMaxWidth }: { children: React.ReactNode, className?: string, childrenMaxWidth?: string }) => {
    return (
        <div className={`min-h-screen py-12 ${className}`}>
            <div className={`${childrenMaxWidth ? childrenMaxWidth : "max-w-7xl"} mx-auto px-4 sm:px-6 lg:px-8 w-full`}>
                {children}
            </div>
        </div>
    )
}

export default GuestPage
