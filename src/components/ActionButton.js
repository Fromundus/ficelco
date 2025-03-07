import React from 'react'
import ButtonLoader from './ButtonLoader'

function ActionButton({ label, processLabel, loading, disabled, onClick, className }) {
    return (
        <button
            className={`h-[44px] p-2 rounded-lg w-full flex items-center justify-center font-semibold gap-2 ${disabled ? "bg-light-accent text-dark-line cursor-not-allowed" : `${className}`}`}
            onClick={onClick}
            disabled={disabled}
        >
            {loading ? processLabel : label}
            {loading && <ButtonLoader />}
        </button> 
    )
}

export default ActionButton