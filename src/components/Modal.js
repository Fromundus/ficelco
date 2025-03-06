import React from 'react'
import { IoClose } from 'react-icons/io5'


function Modal({title, onClose, loading, children }) {
    return (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start p-2 sm:p-8 md:p-8 lg:p-8 overflow-y-auto"
            // onClick={onClose}
        >
            <div
                className="bg-light-background dark:bg-dark-accent rounded-2xl shadow-xl max-w-lg w-full h-auto relative border border-light-line dark:border-dark-line"
                onClick={(e) => e.stopPropagation()}
            >   
                <div className='flex items-center justify-center w-full relative p-6 border-b border-light-line dark:border-dark-line'>
                    <span className='font-semibold text-lg'>{title}</span>
                    <button
                        className="absolute right-4 p-2 border border-light-line dark:border-dark-line hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg"
                        onClick={onClose}
                        disabled={loading}
                    >
                        <IoClose className="text-xl" />
                    </button>
                </div>
                <div className='p-6'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal