import React from 'react'

function Input({ id, className, type, name, placeholder, onChange, disabled, value, accept, multiple, errors, classNameParent }) {
    return (
        <div className={`flex flex-col gap-2 ${classNameParent}`}>
            <input
                id={id}
                name={name}
                type={type}
                className={`bg-light-background dark:bg-dark-accent focus:ring-0 placeholder:text-light-hover dark:placeholder:text-dark-hover text-sm rounded-lg h-11 border-light-line dark:border-dark-line ${className}`}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                value={value}

                accept={accept}
                multiple={multiple}
            />
            {errors && <span className='text-red-500'>{errors}</span>}
        </div>
    )
}

export default Input