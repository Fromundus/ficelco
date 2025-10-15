import React from 'react'

const GuestPage = ({ children, className, childrenMaxWidth, title }: { children: React.ReactNode, className?: string, childrenMaxWidth?: string; title?: string }) => {
    return (
        <div className={`min-h-screen py-12 ${className}`}>
            <div className={`${childrenMaxWidth ? childrenMaxWidth : "max-w-7xl"} mx-auto px-4 sm:px-6 lg:px-8 w-full`}>
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
                </div>
                <div className='mb-16'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default GuestPage
