import React from 'react'
import Input from './Input'
import { IoClose } from 'react-icons/io5'
import { FaImage, FaPaperclip } from 'react-icons/fa6'

function FileInput({ id, loading, label, accept, multiple, handleFileChange, removeFile, errors, type }) {
    console.log(type);

    return (
        <div className='p-2 border border-light-line dark:border-dark-line rounded-lg mt-2'>
            <label htmlFor={id} className='rounded-lg h-[100px] flex items-center justify-center bg-light-line dark:bg-dark-line flex-col gap-2 relative'>
                <button className='absolute top-0 right-0 p-2 text-xl' onClick={removeFile} disabled={loading}><IoClose /></button>
                {type === "image" && <FaImage className='text-2xl' />}
                {type === "pdf" && <FaPaperclip className='text-2xl' />}
                <span className='font-semibold'>{label}</span>
            </label>

            <Input
                id={id}
                className='hidden'
                type="file" 
                accept={accept}
                multiple={multiple}
                onChange={handleFileChange}
                disabled={loading}
                errors={errors}
            />
        </div>
    )
}

export default FileInput